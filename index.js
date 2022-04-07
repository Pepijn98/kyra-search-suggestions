const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const settings = require("./settings");
const auth = require("./auth");

const server = express();

server.enable("trust proxy");
server.disable("x-powered-by");

server.set("json spaces", 4);
server.set("env", settings.env);

server.use(cors({ origin: "*" }));
server.use(bodyParser.json());

server.use(auth);

server.get("/suggestions", async (req, res) => {
    const query = req.query.q;

    try {
        const response = await axios.get("https://google.com/complete/search?client=chrome&q=" + query);
        res.status(200).json({
            statusCode: 200,
            statusMessage: "OK",
            data: response.data[1]
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            statusMessage: "Internal Server Error",
            repos: error.message ? error.message : error.toString()
        });
    }
});

server.get("*", (_, res) => {
    res.status(404).json(Response({
        statusCode: 404,
        statusMessage: "Not Found",
        message: "The page you are looking for does not exist"
    }));
});

server.listen(settings.port, () => {
    console.log(`Listening on port ${settings.port}`);
});
