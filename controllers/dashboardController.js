const db = require('../config/db');

exports.dashboard = (req, res) => {
    const query = "SELECT * FROM projects WHERE target_date >= CURDATE()";
    db.query(query, (err, projects) => {
        if (err) return res.status(500).send("Error fetching projects");

        // Add logic to compute tasks and other metrics here
        res.status(200).json({ projects });
    });
};