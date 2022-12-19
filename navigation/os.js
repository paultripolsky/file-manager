import * as os from 'os'
import printCurrentDir from "../utils/printCurrentDir.js";
import getRootDir from "../utils/getRootDir.js";

export default async function funcOs(data) {

	if (data === '--EOL') {
		console.log(os.EOL)
	}
	else if (data === '--cpus') {
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
	else if (data === '--homedir') {
		console.log(os.homedir())
		printCurrentDir(getRootDir())
	}
	else if (data === '--username') {
		console.log (os.userInfo().username);
		printCurrentDir(process.cwd())
	}
	else if (data === '--architecture') {
		console.log(os.arch())
		printCurrentDir(process.cwd())
	}
	else {
		console.log('Invalid input')
		printCurrentDir(process.cwd())
	}
}