const connection = require('../config/database');
const verifyToken = require('../utils/verifyToken');


const jwt = require('jsonwebtoken');
const {UserModel} = require("../models/Models");

function getUser(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).json({msg: 'No authorization header sent'});
    }
    if (req.method === 'GET') {
        const token = req.headers.authorization.split(' ')[1];

        verifyToken(token, (error, user_id) => {
            if (error) {
                return res.status(401).json({msg: error});
            }

            // Token is valid, and user_id is extracted
            connection.query('SELECT * FROM User WHERE userid = ?', [user_id], (error, results) => {
                if (error) throw error;
                if (results.length === 0) {
                    return res.status(404).json({msg: 'User not found'});
                }
                const {id, username, email, role, points} = results[0];
                const user = new UserModel(id, username, email, role, points);
                res.json(user);
            });
        });
    } else {
        return res.status(401).json({msg: 'Invalid method'});
    }
}

function createUser(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).json({msg: 'No authorization header sent'});
    }
    if (req.method === 'POST') {
        const token = req.headers.authorization.split(' ')[1];

        verifyToken(token, (error, user_id) => {
            if (error) {
                return res.status(401).json({msg: error});
            }
            const {username, email, role} = req.body;

            const user = new UserModel(user_id, username, email, role);

            // check if user exists
            connection.query('SELECT * FROM User WHERE userid = ?', [user_id], (error, results) => {
                if (error) throw error;
                if (results.length > 0) {
                    return res.status(400).json({msg: 'User already exists'});
                }

                // create user
                connection.query('INSERT INTO User SET ?', user, (error, results) => {
                    if (error) throw error;
                    res.json({msg: 'User created'});
                });
            });
        });
    }
}

function addPoints(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).json({msg: 'No authorization header sent'});
    }
    if (req.method === 'PUT') {
        const token = req.headers.authorization.split(' ')[1];

        verifyToken(token, (error, user_id) => {
            if (error) {
                return res.status(401).json({msg: error});
            }

            const {points} = req.body;

            // Token is valid, and user_id is extracted
            connection.query('UPDATE User SET points = points + ? WHERE userid = ?', [points, user_id], (error, results) => {
                if (error) {
                    return res.status(500).json({msg: 'Error adding points'});
                }
                res.json({msg: 'Points added'});
            });
        });
    } else {
        return res.status(401).json({msg: 'Invalid method'});
    }
}

function getPoints(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).json({msg: 'No authorization header sent'});
    }
    if (req.method === 'GET') {
        const token = req.headers.authorization.split(' ')[1];

        verifyToken(token, (error, user_id) => {
            if (error) {
                return res.status(401).json({msg: error});
            }

            // Token is valid, and user_id is extracted
            connection.query('SELECT points FROM User WHERE user_id = ?', [user_id], (error, results) => {
                if (error) {
                    return res.status(500).json({msg: 'Error getting points'});
                }
                res.json({points: results[0].points});
            });
        });
    } else {
        return res.status(401).json({msg: 'Invalid method'});
    }
}

module.exports = {getUser, createUser, addPoints, getPoints};
