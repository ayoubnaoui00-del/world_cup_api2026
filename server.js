import express from "express";
import "dotenv/config";
import { sequelize } from "./models/index.js";

const PORT = process.env.PORT ?? 3000;
const app = express();
app.use(express.json());

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