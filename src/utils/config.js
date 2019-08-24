const path = require("path");

module.exports = {
    baseUrl: "/wec-depart-etl",
    pathYaml: "public/wec-depart-etl.yaml",
    pathApi: path.resolve(__dirname, "../api/api.js"),
    pathService: path.resolve(__dirname, "../api/service.js")
};
