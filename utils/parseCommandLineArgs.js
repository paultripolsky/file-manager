export default async function parseCommandLineArgs(data, functionName) {
	let formattedData = data.toString().replace(`${functionName}`, '').trim()
	let separator = ' '
	let sliceIndex = formattedData.indexOf(separator)

	let firstArg = ''
	let secondArg = ''

	if (sliceIndex === -1) {
		if (formattedData.trim().length === 0) {
			return []
		}
		return [formattedData]
	} else {
		firstArg = formattedData.slice(0, sliceIndex).trim()
		secondArg = formattedData.slice(sliceIndex).trim()
		return [firstArg, secondArg]
	}
}