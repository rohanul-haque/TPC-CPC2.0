import cors from "cors";
import "dotenv/config";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";

import ConnectDB from "./src/db/ConnectDB.js";
import AdminRouter from "./src/routes/AdminRouter.js";
import AdvisorRoute from "./src/routes/AdvisorRoute.js";
import BlogRoute from "./src/routes/BlogRoute.js";
import EventRoute from "./src/routes/EventRoute.js";
import ExTeamRoute from "./src/routes/ExTeamRoute.js";
import HomePageRoute from "./src/routes/HomePageRoute.js";
import ReviewRoute from "./src/routes/ReviewRoute.js";
import TeamRoute from "./src/routes/TeamRoute.js";
import UserRoute from "./src/routes/UserRoute.js";
import ConnectCloudinary from "./src/utils/Cloudinary.js";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});

app.use(helmet());
app.use(hpp());
app.use(limiter);
app.use(
  cors({
    origin: [
      "https://tpicpc.com",
      "https://www.tpicpc.com",
      "www.tpicpc.com",
      "http://localhost:5173",
      "http://localhost:5174",
      "https://tpi-cpc-official.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use("/api/v1/home-page", HomePageRoute);
app.use("/api/v1/admin", AdminRouter);
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/advisor", AdvisorRoute);
app.use("/api/v1/team", TeamRoute);
app.use("/api/v1/ex-team", ExTeamRoute);
app.use("/api/v1/event", EventRoute);
app.use("/api/v1/blog", BlogRoute);
app.use("/api/v1/review", ReviewRoute);
app.get("/", (req, res) => res.send("✅ API is running perfectly!"));

ConnectDB();
ConnectCloudinary();

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`🚀 Server is running on http://localhost:${port}`)
);
