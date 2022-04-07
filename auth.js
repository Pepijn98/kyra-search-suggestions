const settings = require("./settings");

module.exports = (req, res, next) => {
    if (req.headers.authorization) {
        const token = Buffer.from(req.headers.authorization, "base64").toString();
        const [username, password] = token.split(":");
        if (username === settings.username && password === settings.password) {
            return next();
        }

        return res.status(401).json({
            statusCode: 401,
            statusMessage: "Unauthorized",
            message: "Invalid username or password"
        });
    }

    return res.status(401).json({
        statusCode: 401,
        statusMessage: "Unauthorized",
        message: "Missing authorization header"
    });
};
