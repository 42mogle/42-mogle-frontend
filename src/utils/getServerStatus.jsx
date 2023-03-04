import apiManager from "api/apiManager";
const HTTP_STATUS = require("http-status");

const getServerStatus = async () => {
	try {
		console.log("Try started\n");
		const response = await apiManager.get("/server-status");
		console.log("response : ", response);
		if (response.status === HTTP_STATUS.OK) {
			return (true);
		}
		return (false);
	} catch(error) {
	console.log(`
  ___                         ___ _               _
 / __| ___ _ ___ _____ _ _  / __| |___ ______ __| |
 \\__ \/ -_) '_\\ V / -_) '_| | (__| / _ (_-< -_) _\` |
 |___/\\___|_| \\_/\\___|_|    \\___|_\\___/__|___\\__,_|
`);
		console.log("We are closed See you next time\nWorking time : Mon ~ Fri 07AM to 08PM")
		return (false);
	}
}

export default getServerStatus;
