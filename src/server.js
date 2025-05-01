require("dotenv/config");
require("express-async-errors");
const express = require("express");
const app = express();
const routes = require("./routes");
const AppError = require("./utils/AppError");
const database = require("./database/sqlite");
const cors = require("cors");

const corsOptions = {
  origin: "https://filter-an7.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(routes);
database();

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
