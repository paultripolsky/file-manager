import printCurrentDir from "../utils/printCurrentDir.js";
import path from "path";
import fs from "fs/promises";
import {createReadStream, createWriteStream} from "fs";
import { createBrotliDecompress } from 'zlib'

export default async function decompress(data) {
	let formattedData = data.split(' ')
	let pathToFile
	let pathToDirectory

	if (data.length === 0 || formattedData.length < 2) {
		process.stdin.write('Invalid input\n')
		await printCurrentDir(process.cwd())
	} else {
		try {
			pathToFile = path.resolve(formattedData[0])
			pathToDirectory = path.resolve(formattedData[1])

			await fs.access(pathToFile)
			await fs.access(pathToDirectory)
			await decompressFunction()
		} catch (e) {
			console.log('Operation failed')
			console.log(e)
			await printCurrentDir(process.cwd())
		}
	}

	async function decompressFunction() {
		let fileName = path.parse(pathToFile).base;
		let readStream = createReadStream(pathToFile)
		let writeStream = createWriteStream(path.resolve(pathToDirectory, fileName.replace('.br', '')))

		let brotli = createBrotliDecompress()

		readStream.pipe(brotli).pipe(writeStream)
	}
}