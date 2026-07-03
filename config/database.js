import { Sequelize } from "sequelize"

export const sequelize = new Sequelize(

    {
        host: process.env.DB_HOST??"localhost",
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        dialect: 'postgres',
        logging: false,
    }
);

export default sequelize;