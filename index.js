import greetings from "./greetings/index.js";
import bye from "./bye/index.js";
import navigation from "./navigation/index.js";

let app = async () => {
	await greetings()
	await navigation()
	await bye()
}

await app()

