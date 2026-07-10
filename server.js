import express from "express";
import "dotenv/config";
import { sequelize } from "./models/index.js";
import logger from "./middlewares/logger.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";
import refereeRoutes from "./routes/arbitre.routes.js";
import matchRoutes from "./routes/match.routes.js";
import assignmentRoutes from "./routes/affectation.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const PORT = process.env.PORT ?? 4000;
const app = express();

app.use(express.json());
app.use(logger);

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/referees', refereeRoutes);
app.use('/matches', matchRoutes);
app.use('/assignments', assignmentRoutes);

app.use(errorHandler);

const bootstrap = async () => {
  try {
    await sequelize.authenticate();
    console.log(' Connected to PostgreSQL!');
    await sequelize.sync({ alter: true });
    console.log(' Tables synced!');
    app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
  } catch (error) {
    console.log(error);
    console.log("DB Error Occurred");
  }
};

bootstrap();