import apiManager from "api/apiManager";
const HTTP_STATUS = require("http-status");

const getServerStatus = () => {
	return apiManager.get("/server-status")
		.then(response => {
			if (response === HTTP_STATUS.OK) {
				return true;
			}
			return false;
		})
		.catch(error => {
			console.error(error);
			return false;
		});
};

export default getServerStatus;
