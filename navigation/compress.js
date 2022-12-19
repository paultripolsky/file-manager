import printCurrentDir from "../utils/printCurrentDir.js";
import path from "path";
import fs from "fs/promises";
import {createReadStream, createWriteStream} from "fs";
import {createBrotliCompress} from "zlib";

export default async function compress(data) {
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
			await compressFunction()
		} catch {
			console.log('Operation failed')
			await printCurrentDir(process.cwd())
		}
	}

	async function compressFunction() {
		let fileName = path.parse(pathToFile).base;
		let readStream = createReadStream(pathToFile)
		let writeStream = createWriteStream(path.resolve(pathToDirectory, fileName + '.br'))

		let brotli = createBrotliCompress()

		readStream.pipe(brotli).pipe(writeStream)
	}
}