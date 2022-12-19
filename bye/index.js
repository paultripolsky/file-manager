
export default async function bye() {

	process.on('exit',() =>  {
		process.env.user.length > 0
			? process.stdout.write(`\nThank you for using File Manager, ${process.env.user}, goodbye!\n`)
			: process.stdout.write(`\nThank you for using File Manager, <UnknownUser>, goodbye!\n`)
	})
}
