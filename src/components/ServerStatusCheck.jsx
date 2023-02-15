import apiManager from "api/apiManager";
import { Outlet } from "react-router-dom";
const HTTP_STATUS = require("http-status");

const getServerStatus = async () => {
	try {
		const response = await apiManager.get("health-check");
		if (response === HTTP_STATUS.OK) {
			return (true);
		}
		return (false);
	} catch(error) {
		console.error(error);
		return (false);
	}
}

function ServerHealthCheck() {
	const isServerRunning = getServerStatus();
  return (
		<>
		{isServerRunning ? <Outlet /> : "Sorry."}


		</>
  );
}

export default ServerHealthCheck;
