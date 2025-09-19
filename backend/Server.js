import cors from "cors";
import "dotenv/config";
import express from "express";

import ConnectDB from "./src/db/ConnectDB.js";
import AdminRouter from "./src/routes/AdminRouter.js";
import AdvisorRoute from "./src/routes/AdvisorRoute.js";
import EventRoute from "./src/routes/EventRoute.js";
import TeamRoute from "./src/routes/TeamRoute.js";
import UserRoute from "./src/routes/UserRoute.js";
import BlogRoute from "./src/routes/BlogRoute.js";
import ReviewRoute from "./src/routes/ReviewRoute.js";
import ConnectCloudinary from "./src/utils/Cloudinary.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", AdminRouter);
app.use("/user", UserRoute);
app.use("/advisor", AdvisorRoute);
app.use("/team", TeamRoute);
app.use("/event", EventRoute);
app.use("/blog", BlogRoute);
app.use("/review", ReviewRoute);
app.get("/", (req, res) => res.send("api is running!"));

ConnectDB();
ConnectCloudinary();

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
