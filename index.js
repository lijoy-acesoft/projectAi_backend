require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const winston = require("./config/winston");
const sequelize = require("./config/database");
const config = require("./config/config");
const SuperAdmin = require("./routes/SuperAdminRoute");
const projectRoutes = require("./routes/projectRouter");
const projectTaskRouter = require("./routes/projectTaskRouter");
const errorController = require("./app/controllers/ErrorController");
const errorHandler = require("./app/middleware/ErrorHandler");

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100 
});
app.use(limiter);

// Request logging
app.use(morgan('combined', { stream: winston.stream }));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Routes
app.use('/', SuperAdmin);
app.use('/project', projectRoutes);
app.use('/projects/tasks', projectTaskRouter);

// 404 Error handling
app.use(errorController.pageNotFound);

// Global error handling
app.use(errorHandler);

// Start the server and handle database connection
const startServer = async () => {
  try {
    await sequelize.sync({ alter: false });
    app.listen(config.port, '0.0.0.0', () => {
      console.log(`App listening on port ${config.port}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    winston.error('Unable to start the server:', error);
  }
};

const shutdown = async () => {
  console.log('Shutting down server...');
  await sequelize.close();
  process.exit(0);
};

startServer();

module.exports = app;
