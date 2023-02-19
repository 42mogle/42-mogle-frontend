import apiManager from "api/apiManager";
const HTTP_STATUS = require("http-status");

const getServerStatus = async () => {
	try {
		const response = await apiManager.get("/server-status");
		if (response.status === HTTP_STATUS.OK) {
			return (true);
		}
		return (false);
	} catch(error) {
	console.log(`
	___                         ___ _               _
 / __| ___ _ ___ _____ _ _   / __| |___ ______ __| |
 \__ \/ -_) '_\ V / -_) '_| | (__| / _ (_-< -_) _\` |
 |___/\___|_|  \_/\___|_|    \___|_\___/__|___\__,_|
`);

		return (false);
	}
}

export default getServerStatus;
