const connection = require("../config/database");
const verifyToken = require("../utils/verifyToken");
const jwt = require("jsonwebtoken");
const {EventModel} = require("../models/Models");

// Create event with the parts of the EventModel
// title;
// location;
// longitude;
// latitude;
// date;
// organizerId;
function createEvent(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).json({msg: "No authorization header sent"});
    }
    if (req.method === "POST") {
        const token = req.headers.authorization.split(" ")[1];

        verifyToken(token, (error, user_id) => {
            if (error) {
                return res.status(401).json({msg: error});
            }

            const {title, location, longitude, latitude, date} = req.body;
            let event = new EventModel(title, location, longitude, latitude, date, user_id);

            // Token is valid, and user_id is extracted
            connection.query("INSERT INTO Events SET ?", event, (error, results, fields) => {
                if (error) {
                    return res.status(500).json({msg: error});
                }
                return res.status(201).json({msg: "Event created"});
            });
        });
    } else {
        return res.status(401).json({msg: "Invalid method"});
    }
}


function editEvent(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).json({msg: "No authorization header sent"});
    }
    if (req.method === "PUT") {
        const token = req.headers.authorization.split(" ")[1];

        verifyToken(token, (error, user_id) => {
            if (error) {
                return res.status(401).json({msg: error});
            }

            const {event_id, location, date, time, organizer_id} = req.body;
            let event = new EventModel(event_id, location, date, time, organizer_id);

            // Token is valid, and user_id is extracted
            connection.query("SELECT * FROM Event WHERE event_id = ?", [event_id], (error, results) => {
                if (error) throw error;
                if (results.length === 0) {
                    return res.status(404).json({msg: "Event not found"});
                }

                // update event with JSON data from request body
                connection.query("UPDATE Event SET ? WHERE event_id = ?", [event, event_id], (error, results) => {
                    if (error) throw error;
                    res.json({msg: "Event updated"});
                });
            });
        });
    } else {
        return res.status(401).json({msg: "Invalid method"});
    }
}

function deleteEvent(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).json({msg: "No authorization header sent"});
    }
    if (req.method === "DELETE") {
        const token = req.headers.authorization.split(" ")[1];

        verifyToken(token, (error, user_id) => {
            if (error) {
                return res.status(401).json({msg: error});
            }

            const event_id = req.params.event_id;

            // Token is valid, and user_id is extracted
            connection.query("DELETE FROM Event WHERE event_id = ?", [event_id], (error, results) => {
                if (error) throw error;
                res.json({msg: "Event deleted"});
            });
        });
    } else {
        return res.status(401).json({msg: "Invalid method"});
    }
}

function getEvents(req, res) {
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
            connection.query("SELECT * FROM Event", (error, results) => {
                if (error) throw error;
                res.json(results);
            });
        });
    } else {
        return res.status(401).json({msg: "Invalid method"});
    }
}

function getEventDetails(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).json({msg: "No authorization header sent"});
    }
    if (req.method === "GET") {
        const token = req.headers.authorization.split(" ")[1];

        verifyToken(token, (error, user_id) => {
            if (error) {
                return res.status(401).json({msg: error});
            }

            const event_id = req.params.event_id;

            // Token is valid, and user_id is extracted
            connection.query("SELECT * FROM Event WHERE event_id = ?", [event_id], (error, results) => {
                if (error) throw error;
                if (results.length === 0) {
                    return res.status(404).json({msg: "Event not found"});
                }
                res.json(results[0]);
            });
        });
    } else {
        return res.status(401).json({msg: "Invalid method"});
    }
}

module.exports = {createEvent, editEvent, deleteEvent, getEvents, getEventDetails};
