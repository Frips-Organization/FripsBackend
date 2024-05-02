const jwt = require("jsonwebtoken");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const authenticationMiddleware = (req, res, next) => {
    const authorizationHeader = req.header("Authorization");
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
        // Extract the token from the Authorization header
        const token = authorizationHeader.split(' ')[1];

        try {
            // Decode the token to get its payload
            const verify = jwt.verify(token, "MyBadKeptSecret");
            req.principal = verify;
            next();

        } catch (error) {
            // Handle decoding errors
            console.error('Error decoding token:', error.message);

            res.header("Location", "/auth/login");
            res.status(401);
            res.send("Unauthorized");
        }
    } else {
        res.header("Location", "/auth/login");
        res.status(401);
        res.send("Unauthorized");
    }
}

module.exports = authenticationMiddleware;