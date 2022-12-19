import * as os from 'os'
import printCurrentDir from "../utils/printCurrentDir.js";
import getRootDir from "../utils/getRootDir.js";

export default async function funcOs(data) {

	if (data.length === 0 || data.length > 1) {
		process.stdin.write('Invalid input\n')
		await printCurrentDir(process.cwd())
		return false
	}

	if (data[0] === '--EOL') {
		console.log(os.EOL)
	}
	else if (data[0] === '--cpus') {
		let cpusInfo = os.cpus()
		let table = []
		cpusInfo.forEach(c => {
			table.push({
				'Model': c.model.trim(),
				'Speed': `${c.speed/1000} GHz`
			})
		})
		console.table(table)
		printCurrentDir(process.cwd())
	}
	else if (data[0] === '--homedir') {
		console.log(os.homedir())
		printCurrentDir(getRootDir())
	}
	else if (data[0] === '--username') {
		console.log (os.userInfo().username);
		printCurrentDir(process.cwd())
	}
	else if (data[0] === '--architecture') {
		console.log(os.arch())
		printCurrentDir(process.cwd())
	}
	else {
		console.log('Invalid input')
		printCurrentDir(process.cwd())
	}
}