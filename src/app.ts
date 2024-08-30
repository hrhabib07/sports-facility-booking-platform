import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { AuthRoutes } from "./app/modules/auth/auth.route";
import { FacilityRoutes } from "./app/modules/facility/facility.route";
import { BookingRoutes } from "./app/modules/booking/booking.route";

const app: Application = express();

// Parser
app.use(express.json());

// Allow specific origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://sport-booking-facility-fronted-cooz8jvuo.vercel.app",
  "https://sport-booking-facility-fronted.vercel.app", // Add this if it’s the correct frontend URL
];

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`Blocked by CORS: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow credentials (cookies, tokens) to be sent with requests
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// Application routes
app.use("/api/auth", AuthRoutes);
app.use("/api/facility", FacilityRoutes);
app.use("/api/", BookingRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
