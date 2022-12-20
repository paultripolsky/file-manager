import printCurrentDir from "../utils/printCurrentDir.js";
import * as path from "path";
import fs from 'fs/promises'
import { createReadStream, createWriteStream } from "fs";

export default async function cp(data) {

	let pathToFile
	let pathToDirectory

	if (data.length === 0 || data.length < 2) {
		process.stdin.write('Invalid input\n')
		await printCurrentDir(process.cwd())
		return false
	} else {
		try {
			pathToFile = path.resolve(data[0])
			pathToDirectory = path.resolve(data[1])

			await fs.access(pathToFile)
			await fs.access(pathToDirectory)
			await createStreams()
		} catch {
			console.log('Operation failed')
			await printCurrentDir(process.cwd())
		}
	}

	async function createStreams() {
		let fileName = path.parse(pathToFile).base;
		let readStream = createReadStream(pathToFile)
		let writeStream = createWriteStream(path.resolve(pathToDirectory, fileName))

		readStream.on('data', (chunk) => {
			writeStream.write(chunk)
		})

		readStream.on('error', () => {
			console.log('Operation failed')
		})

		writeStream.on('error', () => {
			console.log('Operation failed')
		})

		readStream.on('end', () => {
			console.log('The file was copied successfully')
			printCurrentDir(process.cwd())
		})
	}
}