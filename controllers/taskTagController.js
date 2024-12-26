const db = require('../config/db');



exports.createTaskTag = (req, res) => {
    const { tag_name, task_id } = req.body;
    db.query(
        'INSERT INTO task_tags (tag_name, task_id) VALUES (?, ?, ?)',
        [tag_name, task_id],
        (err, result) => {
            if (err) return res.status(500).json({ message: 'Database Error' });
            res.status(201).json({ message: 'Task Tag Created', taskTagId: result.insertId });
        }
    );
};

// exports.updateTaskTag = (req, res) => {
//     const { tag_name, task_id, id } = req.body;

//     db.query(
//         'UPDATE task_tags SET tag_name = ? , task_id= ? where id = ?',
//         [tag_name, task_id, id],
//         (err, result) => {
//             if (err) return res.status(500).json({ message: 'Database Error' });
//             res.status(200).json({ message: 'Tasks tag updated' });
//         }
//     );
// };


// exports.deleteTaskTag = (req, res) => {
//     const { id } = req.params.id;

//     db.query(
//         'DELETE from task_tags where id = ?', [id],
//         [name, description, req.user.id],
//         (err, result) => {
//             if (err) return res.status(500).json({ message: 'Database Error' });
//             res.status(200).json({ message: 'Task tag Deleted' });
//         }
//     );
// };

