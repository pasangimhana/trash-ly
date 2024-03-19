// Update Leaderboard
// Endpoint: /update_leaderboard
// Method: PUT
// Headers: Authorization: Bearer <JWT_TOKEN>
// Description: Updates the leaderboard based on user activity, such as uploading images of litter.

const connection = require("../config/database");
const verifyToken = require("../utils/verifyToken");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/Models");

// when the user sends a get request for the leaderboard. It will take the user table and map users and their points to the leaderboard. Then it will return the leaderboard to the user in JSON format.
function getLeaderboard(req, res) {
  if (!req.headers.authorization) {
    return res.status(401).json({ msg: "No authorization header sent" });
  }
  if (req.method === "GET") {
    const token = req.headers.authorization.split(" ")[1];

    verifyToken(token, (error, user_id) => {
      if (error) {
        return res.status(401).json({ msg: error });
      }

      connection.query(
        "SELECT * FROM User ORDER BY points DESC",
        (error, results) => {
          if (error) throw error;
          if (results.length === 0) {
            return res.status(404).json({ msg: "Leaderboard not found" });
          }
          res.json(results);
        }
      );
    });
  } else {
    return res.status(401).json({ msg: "Invalid method" });
  }
}

module.exports = { getLeaderboard };