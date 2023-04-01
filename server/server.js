const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todosRouter = require('./routes/todos');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/todos', todosRouter);

// Database connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {  useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});