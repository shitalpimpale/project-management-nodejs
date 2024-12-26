const db = require('../config/db');


exports.getUser = (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    db.query('SELECT * FROM users where role= 2', (err, results) => {
        if (err) return res.status(500).json({ message: err });
        res.status(200).json({ data: results, status: 200 });
    });
};

