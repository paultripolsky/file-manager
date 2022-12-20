import * as fs from 'fs/promises'
import printCurrentDir from "../utils/printCurrentDir.js";

export default async function ls(currentDirectory) {
	let filesList = await fs.readdir(currentDirectory, {withFileTypes: true})
	let files = {
		directories: [],
		files: []
	}

	filesList.forEach(file => {
		if (file.isFile()) {
			files['files'].push({
				Name: file.name,
				type: 'file'
			})
		} else {
			files['directories'].push({
				Name: file.name,
				type: 'directory'
			})
		}
	})

	console.table([...files.directories, ...files.files])
	printCurrentDir(process.cwd())
}