// Get Educational Content
// Endpoint: /educational_content
// Method: GET
// Headers: Authorization: Bearer <JWT_TOKEN>
// Description: Retrieves educational materials about sustainability, waste management, and the consequences of littering.

const connection = require("../config/database");
const verifyToken = require("../utils/verifyToken");
const jwt = require("jsonwebtoken");
const EducationalContentModel = require("../models/educationalContentModel");

function getEducationalContent(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).json({ msg: "No authorization header sent" });
    }
    if (req.method === "GET") {
        const token = req.headers.authorization.split(" ")[1];

        verifyToken(token, (error, user_id) => {
            if (error) {
                return res.status(401).json({ msg: error });
            }

            // Token is valid, and user_id is extracted
            connection.query("SELECT * FROM EducationalContent", (error, results) => {
                if (error) throw error;
                if (results.length === 0) {
                    return res.status(404).json({ msg: "No educational content found" });
                }
                let educationalContent = new EducationalContentModel(
                    results[0].content_id,
                    results[0].title,
                    results[0].description,
                    results[0].url
                );
                res.json(educationalContent);
            });
        });
    } else {
        return res.status(401).json({ msg: "Invalid method" });
    }
}

module.exports = getEducationalContent;