const db = require('../config/db');



exports.getTask = (req, res) => {
    //const { title, project_id, description, target_date, status, priority, assigned_to } = req.body;

    db.query(
        'SELECT tasks.*,users.name ,tt.tag_name from \
        tasks LEFT JOIN users on users.id = tasks.assigned_to \
        LEFT JOIN task_tags tt ON tt.task_id = tasks.id',
        (err, result) => {
            if (err) return res.status(500).json({ message: err });
            res.status(201).json({ status: 200, message: 'Task Fetched successfully', data: result });
        }
    );
};

exports.createTask = (req, res) => {
    const { title, project_id, description, target_date, status, priority, assigned_to } = req.body;
    console.log(req.body)
    db.query(
        'INSERT INTO tasks (title, description, target_date,project_id,status,priority,assigned_to) VALUES (?, ?, ?,?,?,?,?)',
        [title, description, target_date, project_id, status, priority, assigned_to],
        (err, result) => {
            if (err) return res.status(500).json({ message: err });
            res.status(201).json({ status: 201, message: 'Task Created', taskId: result.insertId });
        }
    );
};

exports.updateTask = (req, res) => {
    const { title, project_id, description, target_date, status, priority, assigned_to, id, tags } = req.body;

    db.query(
        'UPDATE tasks SET title = ? , description= ?, target_date=?,project_id = ? , status= ?, priority=?,assigned_to=?  where id = ?',
        [title, description, target_date, project_id, status, priority, assigned_to, id, tags],
        (err, result) => {
            if (err) return res.status(500).json({ message: 'Database Error' });

            if (tags) {
                db.query("DELETE from task_tags where task_id = ?", [id], (err, res) => {
                    if (err) {

                    } else {
                        db.query(
                            'INSERT INTO task_tags (tag_name, task_id) VALUES (?, ?)',
                            [tags, id],
                            (err, result) => {
                                //if (err) return res.status(500).json({ message: 'Database Error' });
                                //res.status(201).json({ message: 'Task Tag Created', taskTagId: result.insertId });
                            }
                        );
                    }
                })
            }
            res.status(200).json({ message: 'Tasks updated', status: 200 });
        }
    );
};


exports.deleteTask = (req, res) => {
    const { id } = req.params.id;

    db.query(
        'DELETE from tasks where id = ?', [id],
        (err, result) => {
            if (err) return res.status(500).json({ message: 'Database Error' });
            res.status(200).json({ status: 200, message: 'Task Deleted' });
        }
    );
};

