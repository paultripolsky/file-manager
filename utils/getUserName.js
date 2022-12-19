export default function getUserName() {
	let args = process.argv.slice(2)
	let userName = ''
	let argName = ''
	args.forEach(arg => {
		if (arg.startsWith('--username')) {
			userName = arg.replace('--username', '').slice(1)
			argName = arg
		}
	})
	if (!argName.includes('--username')) {
		throw new Error('Argument --username not found. Run the program with --username=<yourName> argument')
	}
	return userName
}