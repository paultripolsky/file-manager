import printCurrentDir from "../utils/printCurrentDir.js";
import path from "path";
import fs from "fs/promises";
import {createReadStream, createWriteStream} from "fs";
import { createBrotliDecompress } from 'zlib'

export default async function decompress(data) {
	let pathToFile
	let pathToDirectory

	if (data.length === 0 || data.length < 2) {
		process.stdin.write('Invalid input\n')
		await printCurrentDir(process.cwd())
	} else {
		try {
			pathToFile = path.resolve(data[0])
			pathToDirectory = path.resolve(data[1])

			await fs.access(pathToFile)
			await fs.access(pathToDirectory)
			await decompressFunction()
		} catch {
			console.log('Operation failed')
			await printCurrentDir(process.cwd())
		}
	}

	async function decompressFunction() {
		let fileName = path.parse(pathToFile).base;
		let readStream = createReadStream(pathToFile)
		let writeStream = createWriteStream(path.resolve(pathToDirectory, fileName.replace('.br', '')))

		let brotli = createBrotliDecompress()

		readStream.pipe(brotli).pipe(writeStream)
		console.log('Decompression was successful')
		await printCurrentDir(process.cwd())
	}
}