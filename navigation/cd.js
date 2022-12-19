import printCurrentDir from "../utils/printCurrentDir.js";
import * as path from "path";
import * as fs from "fs/promises";

export default async function cd(data) {
	if (data.length === 0) {
	 process.stdin.write('Invalid input\n')
	}

	let pathToDirectory = path.resolve(data)

	try {
		await fs.access(pathToDirectory)
		await process.chdir(pathToDirectory)
		await printCurrentDir(process.cwd())
	} catch {
		console.log('Operation failed')
		await printCurrentDir(process.cwd())
	}
 }