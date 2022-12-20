import * as os from 'os'

export default function getRootDir() {
	return os.homedir().trim()
}