import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
const app: Application = express();
const port = 3000;

// parser
app.use(express.json());
app.use(cors());


// application routes
app.use('/api/', router);

app.get("/", (req: Request, res: Response) => {
  var a = 10;
  res.send(a);
});

app.use(globalErrorHandler)
app.use(notFound)

export default app;
