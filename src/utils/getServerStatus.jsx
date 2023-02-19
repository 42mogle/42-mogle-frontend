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
		console.error(error);
		return (false);
	}
}

export default getServerStatus;
