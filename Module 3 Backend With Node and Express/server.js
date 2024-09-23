// Example of setting up Express
import express from "express";
import userRoutes from "./routes/users/index.js";

const app = express();
const port = 3001;

app.use("/users", userRoutes)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
