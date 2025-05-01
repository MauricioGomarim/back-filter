require("dotenv/config");
require("express-async-errors");
const express = require("express");
const cors = require("cors");

const app = express();
const routes = require("./routes");
const AppError = require("./utils/AppError");
const database = require("./database/sqlite");

app.use(cors({
  origin: "https://filter-an7.vercel.app",
  credentials: true,
}));


app.use(express.json());


database();


app.use(routes);


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
