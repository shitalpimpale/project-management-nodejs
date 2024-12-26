const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const UserRoutes = require('./routes/UserRoutes');

const authenticateToken = require('./middlewares/authMiddleware');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/projects', authenticateToken, projectRoutes);
app.use('/task', authenticateToken, taskRoutes);
app.use('/user', authenticateToken, UserRoutes);

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
