const db = require('../config/db');

exports.getProjects = (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
    console.log(req.query)
    db.query('SELECT * FROM projects ', (err, results) => {
        if (err) return res.status(500).json({ message: err });
        res.status(200).json({ data: results, status: 200 });
    });
};

exports.createProject = (req, res) => {

    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    const { name, description, target_date } = req.body;

    db.query(
        'INSERT INTO projects (name, description, target_date) VALUES (?, ?, ?)',
        [name, description, target_date],
        (err, result) => {
            if (err) return res.status(500).json({ message: 'Database Error' });
            res.status(201).json({ status: 201, message: 'Project Created', projectId: result.insertId });
        }
    );
};

exports.updateProject = (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    const { name, description, target_date, id } = req.body;

    db.query(
        'UPDATE projects SET name = ? , description= ?, target_date=?  where id = ?',
        [name, description, target_date, id],
        (err, result) => {
            if (err) return res.status(500).json({ message: 'Database Error' });
            res.status(201).json({ message: 'Project updated', status: 200 });
        }
    );
};


exports.deleteProject = (req, res) => {

    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    const id = req.params.id;
    db.query(
        'DELETE from projects where id = ?', [id],
        (err, result) => {
            if (err) return res.status(500).json({ message: 'Database Error' });
            res.status(201).json({ message: 'Project Deleted', status: 200 });
        }
    );
};

