// ## Upload Image
// ## Save Image
// Endpoint: /saveImage
// Method: POST
// Headers: Authorization: Bearer <JWT_TOKEN>
// Description: User can send an analyzed image details to be added to the DB

// class ImageModel {
//     imageId;
//     userId;
//     category;
//     latitude;
//     longitude;
//     date;
// }

const connection = require("../config/database");
const verifyToken = require("../utils/verifyToken");
const jwt = require("jsonwebtoken");
const {ImageModel} = require("../models/Models");

function saveImage(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).json({msg: "No authorization header sent"});
    }
    if (req.method === "POST") {
        const token = req.headers.authorization.split(" ")[1];

        verifyToken(token, (error, user_id) => {
            if (error) {
                return res.status(401).json({msg: error});
            }
            // Token is valid, and user_id is extracted

            const {imageId, category, latitude, longitude, date} = req.body;

            const image = new ImageModel(imageId, user_id, category, latitude, longitude, date);

            const query = "INSERT INTO Image (image_id, userid, category, latitude, longitude, date) VALUES (?, ?, ?, ?, ?, ?)";
            const values = [image.imageId, image.userId, image.category, image.latitude, image.longitude, image.date];

            connection.query(query, values, (error, results, fields) => {
                if (error) {
                    return res.status(500).json({msg: error});
                }
                return res.status(201).json({msg: "Image data saved successfully"});
            });
        });
    } else {
        return res.status(401).json({msg: "Invalid method"});
    }
}

// get only the coordinates and category of images
function getImagesHeat(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).json({msg: "No authorization header sent"});
    }
    if (req.method === "GET") {
        const token = req.headers.authorization.split(" ")[1];

        verifyToken(token, (error, user_id) => {
            if (error) {
                return res.status(401).json({msg: error});
            }
            // Token is valid, and user_id is extracted

            const query = "SELECT latitude, longitude, category FROM Image WHERE userid = ?";
            const values = [user_id];

            connection.query(query, values, (error, results, fields) => {
                if (error) {
                    return res.status(500).json({msg: error});
                }
                return res.status(200).json(results);
            });
        });
    } else {
        return res.status(401).json({msg: "Invalid method"});
    }
}

module.exports = {saveImage, getImagesHeat};