const appName = "Server API";
const port = process.env.PORT || 8080;
(async () => {
	const createServer = require("./server");
	const server = await createServer();
	server.listen(port, () => console.log(`${appName} running on port ${port}!`));
})();
