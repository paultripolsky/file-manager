import getUserName from "../utils/getUserName.js";
import getRootDir from "../utils/getRootDir.js";
import * as readline from 'node:readline/promises';
import * as path from "path";

export default async function greetings() {

	process.env.user = getUserName()

	let rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	process.chdir(path.resolve(getRootDir()))

	if (process.env.user.length > 0) {
		rl.input.write(`Welcome to the File Manager, ${process.env.user}!\nYou are currently in ${process.cwd()}\n`)
	} else {
		process.env.user = await rl.question('Please enter your name\n')
		rl.output.write(`Welcome to the File Manager, ${process.env.user}!\nYou are currently in ${process.cwd()}\n`)
	}
	rl.close();
}