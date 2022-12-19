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

import printCurrentDir from "../utils/printCurrentDir.js";

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
			let pathToFile = formattedData.replace('cat', '').trim()
			await cat(pathToFile)
		}
		else if (formattedData.startsWith('cp')) {
			let paths = formattedData.replace('cp', '').slice(1)
			await cp(paths)
		}
		else if (formattedData.startsWith('mv')) {
			let paths = formattedData.replace('mv', '').slice(1)
			await mv(paths)
		}
		else if (formattedData.startsWith('rm')) {
			let path = formattedData.replace('rm', '').trim()
			await rm(path)
		}
		else if (formattedData.startsWith('os')) {
			let command = formattedData.replace('os', '').trim()
			await funcOs(command)
		}
		else if (formattedData.startsWith('hash')) {
			let path = formattedData.replace('hash', '').trim()
			await hash(path)
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