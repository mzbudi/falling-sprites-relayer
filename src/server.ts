import * as dotenv from "dotenv";
dotenv.config({ debug: true });

import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ type: "application/json" }));

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
