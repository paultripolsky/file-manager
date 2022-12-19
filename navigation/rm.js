import * as fs from 'fs/promises'
import printCurrentDir from "../utils/printCurrentDir.js";
import path from "path";

export default async function rm(data) {
	if (data.length === 0) {
		process.stdin.write('Invalid input\n')
		await printCurrentDir(process.cwd())
	} else {
		let pathToFile = path.resolve(data)
		try {
			await fs.unlink(pathToFile)
			console.log('File deleted successfully')
			await printCurrentDir(process.cwd())
		} catch {
			console.log('Operation failed')
			await printCurrentDir(process.cwd())
		}
	}
}