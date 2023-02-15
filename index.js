const express = require('express');
const cors = require('cors');

const app = express();
require('dotenv').config();
require('./models/db')();

app.use(express.json());
app.use(
  cors({
    cors: '*',
  })
);

app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/user.routes');
const jobRoutes = require('./routes/job.routes');

const PORT = 4000;

app.use((req, res, next) => {
  console.log('method:  %s url: %s', req.method, req.url);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/user', userRoutes);
app.use('/api/job', jobRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
