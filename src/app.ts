import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { AuthRoutes } from "./app/modules/auth/auth.route";
import { FacilityRoutes } from "./app/modules/facility/facility.route";
import { BookingRoutes } from "./app/modules/booking/booking.route";
import { PaymentRoute } from "./app/modules/payment/payment.route";

const app: Application = express();

// Parser
app.use(express.json());

// Allow specific origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5000",
  "https://sport-booking-facility-fronted-cooz8jvuo.vercel.app",
  "https://sport-booking-facility-fronted.vercel.app",
  "https://sports-facility-booking-platform-rho.vercel.app",
];

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    console.log(`Request Origin: ${origin}`); // Log origin for debugging
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`Blocked by CORS: ${origin}`); // Log blocked origins for troubleshooting
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

// Use CORS middleware with configured options
app.use(cors(corsOptions));

// Preflight OPTIONS handling for all routes
app.options("*", cors(corsOptions));

app.use((req: Request, res: Response, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Application routes
app.use("/api/auth", AuthRoutes);
app.use("/api/facility", FacilityRoutes);
app.use("/api/", BookingRoutes);
app.use("/api/payment", PaymentRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

// Error handlers
app.use(globalErrorHandler);
app.use(notFound);

export default app;
