import path from "path";
import * as fs from "fs/promises";
import { createReadStream } from 'fs'
import printCurrentDir from "../utils/printCurrentDir.js";

export default async function cat(data) {
	if (data.length === 0 || data.length > 1) {
		process.stdin.write('Invalid input\n')
		printCurrentDir(process.cwd())
		return
	}

	let pathToFile = path.resolve(data[0])

	try {
		await fs.access(pathToFile)
		await createStream()
	} catch (e) {
		console.log('Operation failed')
		printCurrentDir(process.cwd())
	}

	async function createStream() {
		let stream = createReadStream(pathToFile)
		let fileContent = ''
		stream.on('data', chunk => {
			fileContent += chunk
		})

		stream.on('end', () => {
			process.stdout.write ( `${fileContent}` )
			printCurrentDir(process.cwd())
		})

		stream.on('error', () => {})
	}
}