import * as path from "path";
import printCurrentDir from "../utils/printCurrentDir.js";

export default async function up(currentDir) {
	let parsedPath = path.parse(currentDir)
	process.chdir(path.resolve(parsedPath.dir))
	printCurrentDir(process.cwd())
}