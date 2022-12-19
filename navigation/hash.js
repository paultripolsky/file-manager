import printCurrentDir from "../utils/printCurrentDir.js";
import path from "path";
import {createReadStream} from "fs";
import fs from "fs/promises";
import * as crypto from "crypto";

export default async function hash(data) {
	if (data.length === 0) {
		process.stdin.write('Invalid input\n')
		await printCurrentDir(process.cwd())
	}

	let pathToFile = path.resolve(data)
	console.log(pathToFile)

	try {
		await fs.access(pathToFile)
		await createHash()
	} catch (e) {
		console.log(e)
		console.log('Operation failed')
		await printCurrentDir(process.cwd())
	}

	async function createHash() {
		let fileContent = ''
		let stream = createReadStream(pathToFile)

		stream.on('data', (chunk) => {
			fileContent += chunk
		})

		stream.on('error', () => {
			console.log('Operation failed')
			printCurrentDir(process.cwd())
		})

		stream.on('end', () => {
			let hash = crypto.createHash('sha256').update(fileContent).digest('hex')
			console.log(hash)
			printCurrentDir(process.cwd())
		})
	}

}
