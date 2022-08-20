module.exports = {
    entry: ["./src/index.js"],
    output: {
	path: __dirname,
	publicPath: "/",
	filename: "bundle.js",
    },
    mode: "development",
    module: {
	rules: [
	    {
		exclude: /node_modules/,
		loader: "babel",
		query: {
		    presets: ["react", "env"],
		},
	    },
	],
    },
    resolve: {
	extensions: [".js", ".jsx"],
	modules: ["node_modules"],
    },
    resolveLoader: {
	moduleExtensions: ["-loader"],
    },
    devServer: {
	host: '0.0.0.0',
	port: process.env.ITTYURLI_HTTP_SERVER_PORTNO,
	historyApiFallback: true,
	contentBase: "./",
        headers: {
	    "Access-Control-Allow-Origin": "*",
	    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
	    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
	}
    },
};
