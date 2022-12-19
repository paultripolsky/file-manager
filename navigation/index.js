import readline from "node:readline/promises";

import up from './up.js'
import cd from "./cd.js";
import ls from "./ls.js";
import cat from "./cat.js";
import cp from "./cp.js";
import rm from "./rm.js";
import mv from "./mv.js";
import funcOs from "./os.js";
import hash from "./hash.js";
import decompress from "./decompress.js";
import compress from "./compress.js";

import printCurrentDir from "../utils/printCurrentDir.js";
import parseCommandLineArgs from "../utils/parseCommandLineArgs.js";

export default async function navigation() {
	let rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.on('line', async (data) => {
		let formattedData = data.toString().trim()
		if (formattedData === 'up') {
			await up(process.cwd())
		}
		else if (formattedData.startsWith('cd')) {
			let path = formattedData.replace('cd', '').trim()
			await cd(path)
		}
		else if (formattedData.startsWith('ls')) {
			await ls(process.cwd())
		}
		else if (formattedData.startsWith('cat')) {
			let args = await parseCommandLineArgs(formattedData, 'cat')
			await cat(args)
		}
		else if (formattedData.startsWith('cp')) {
			let paths = await parseCommandLineArgs(formattedData, 'cp')
			await cp(paths)
		}
		else if (formattedData.startsWith('mv')) {
			let paths = await parseCommandLineArgs(formattedData, 'mv')
			await mv(paths)
		}
		else if (formattedData.startsWith('rm')) {
			let args = await parseCommandLineArgs(formattedData, 'rm')
			await rm(args)
		}
		else if (formattedData.startsWith('os')) {
			let args = await parseCommandLineArgs(formattedData, 'os')
			await funcOs(args)
		}
		else if (formattedData.startsWith('hash')) {
			let args = await parseCommandLineArgs(formattedData, 'hash')
			await hash(args)
		}
		else if (formattedData.startsWith('decompress')) {
			let paths = await parseCommandLineArgs(formattedData, 'decompress')
			await decompress(paths)
		}
		else if (formattedData.startsWith('compress')) {
			let paths = await parseCommandLineArgs(formattedData, 'compress')
			await compress(paths)
		}
		else if (formattedData === '.exit') {
			process.exit()
		}
		else {
			console.log('Invalid input')
			printCurrentDir(process.cwd())
		}
	})

	rl.on('SIGINT', () => {
		process.exit()
	})
}