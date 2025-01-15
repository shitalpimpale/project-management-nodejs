const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
// register user 
exports.register = (req, res) => {
    const { username, password, role } = req.body;
    let userRole = 0;

    const hashedPassword = bcrypt.hashSync(password, 10);
    if (role === 'admin') {
        userRole = 1;
    } else if (role === 'member') {
        userRole = 2;
    } else {
        return res.status(500).json({ message: 'send valid role' });
    }
    if(username === ''){
        return res.status(500).json({ message: 'send valid username' });
    }
    if(password === ''){
        return res.status(500).json({ message: 'send valid password' });
    }

    db.query('INSERT INTO users (email, password,role) VALUES (?, ?,?)', [username, hashedPassword, userRole], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: err });
        }
        res.status(201).json({ status: 201, message: 'User Registered' });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [username], (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ message: 'Invalid Credentials' });

        const user = results[0];
        const passwordMatch = bcrypt.compareSync(password, user.password);

        if (!passwordMatch) return res.status(401).json({ message: 'Invalid Credentials' });

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ status: 200, id: user.id, email: user.email, role: user.role, token: token });
    });
};
