// ## Organize Cleanup Event
// Endpoint: /organize_event
// Method: POST
// Headers: Authorization: Bearer <JWT_TOKEN>
// Description: Enables organizers to create and schedule cleanup events in specific areas.

// ## Edit Cleanup Event
// Endpoint: /edit_event
// Method: PUT
// Headers: Authorization
// Description: Allows organizers to modify the details of a cleanup event, such as the date, time, and location.

// ## Delete Cleanup Event
// Endpoint: /delete_event/:event_id
// Method: DELETE
// Headers: Authorization
// Description: Enables organizers to cancel a scheduled cleanup event.

// ## Get Cleanup Events
// Endpoint: `/cleanup_events`
// Method: GET
// Headers: Authorization

// ## Get Cleanup Event Details
// Endpoint: `/cleanup_event/:event_id`
// Method: GET
// Headers: Authorization

const connection = require("../config/database");
const verifyToken = require("../utils/verifyToken");
const EventModel = require("../models/eventModel");
const jwt = require("jsonwebtoken");

function organizeEvent(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).json({ msg: "No authorization header sent" });
    }
    if (req.method === "POST") {
        const token = req.headers.authorization.split(" ")[1];

        verifyToken(token, (error, user_id) => {
            if (error) {
                return res.status(401).json({ msg: error });
            }

            const { event_id, location, date, time, organizer_id } = req.body;
            let event = new EventModel(event_id, location, date, time, organizer_id);

            // Token is valid, and user_id is extracted
            connection.query(
                "SELECT * FROM Event WHERE event_id = ?",
                [event_id],
                (error, results) => {
                    if (error) throw error;
                    if (results.length > 0) {
                        return res.status(409).json({ msg: "Event already exists" });
                    }

                    // create event with JSON data from request body
                    connection.query(
                        "INSERT INTO Event SET ?",
                        event,
                        (error, results) => {
                            if (error) throw error;
                            res.json({ msg: "Event created" });
                        }
                    );
                }
            );
        });
    } else {
        return res.status(401).json({ msg: "Invalid method" });
    }
}

function editEvent(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).json({ msg: "No authorization header sent" });
    }
    if (req.method === "PUT") {
        const token = req.headers.authorization.split(" ")[1];

        verifyToken(token, (error, user_id) => {
            if (error) {
                return res.status(401).json({ msg: error });
            }

            const { event_id, location, date, time, organizer_id } = req.body;
            let event = new EventModel(event_id, location, date, time, organizer_id);

            // Token is valid, and user_id is extracted
            connection.query(
                "SELECT * FROM Event WHERE event_id = ?",
                [event_id],
                (error, results) => {
                    if (error) throw error;
                    if (results.length === 0) {
                        return res.status(404).json({ msg: "Event not found" });
                    }

                    // update event with JSON data from request body
                    connection.query(
                        "UPDATE Event SET ? WHERE event_id = ?",
                        [event, event_id],
                        (error, results) => {
                            if (error) throw error;
                            res.json({ msg: "Event updated" });
                        }
                    );
                }
            );
        });
    } else {
        return res.status(401).json({ msg: "Invalid method" });
    }
}

function deleteEvent(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).json({ msg: "No authorization header sent" });
    }
    if (req.method === "DELETE") {
        const token = req.headers.authorization.split(" ")[1];

        verifyToken(token, (error, user_id) => {
            if (error) {
                return res.status(401).json({ msg: error });
            }

            const event_id = req.params.event_id;

            // Token is valid, and user_id is extracted
            connection.query(
                "DELETE FROM Event WHERE event_id = ?",
                [event_id],
                (error, results) => {
                    if (error) throw error;
                    res.json({ msg: "Event deleted" });
                }
            );
        });
    } else {
        return res.status(401).json({ msg: "Invalid method" });
    }
}

function getEvents(req, res) {
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
            connection.query("SELECT * FROM Event", (error, results) => {
                if (error) throw error;
                res.json(results);
            });
        });
    } else {
        return res.status(401).json({ msg: "Invalid method" });
    }
}

function getEventDetails(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).json({ msg: "No authorization header sent" });
    }
    if (req.method === "GET") {
        const token = req.headers.authorization.split(" ")[1];

        verifyToken(token, (error, user_id) => {
            if (error) {
                return res.status(401).json({ msg: error });
            }

            const event_id = req.params.event_id;

            // Token is valid, and user_id is extracted
            connection.query(
                "SELECT * FROM Event WHERE event_id = ?",
                [event_id],
                (error, results) => {
                    if (error) throw error;
                    if (results.length === 0) {
                        return res.status(404).json({ msg: "Event not found" });
                    }
                    res.json(results[0]);
                }
            );
        });
    } else {
        return res.status(401).json({ msg: "Invalid method" });
    }
}

module.exports = { organizeEvent, editEvent, deleteEvent, getEvents, getEventDetails };
