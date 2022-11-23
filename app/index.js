import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import customerRouter from "./routes/customerRouter.js";
import carRouter from "./routes/carRouter.js";
import rentalRouter from "./routes/rentalRouter.js";

const app = express();
dotenv.config();
const port = process.env.NODE_DOCKER_PORT || 8080;

app.use(json());
app.use(
  urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/customers", customerRouter);
app.use("/cars", carRouter);
app.use("/rental", rentalRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});