import apiManager from "api/apiManager";
const HTTP_STATUS = require("http-status");

const getServerStatus = async () => {
	try {
		const response = await apiManager.get("/server-status");
		console.log("response: ", response);
		if (response.status === HTTP_STATUS.OK) {
			console.log("true");
			return (true);
		}
		console.log("false up");
		return (false);
	} catch(error) {
		console.log("false down");
		console.error(error);
		return (false);
	}
}

export default getServerStatus;
