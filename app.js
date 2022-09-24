import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import db from "./src/config/database.js";
import swaggerUi from "swagger-ui-express"
import { routerBook } from "./src/routes/book.js"
import { routerMember } from "./src/routes/member.js"
import { routerTransaction } from "./src/routes/transaction.js"



dotenv.config();
const app = express();
import apiDocumentation from './docs.json'

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation))
app.use(express.json());
app.use(morgan("dev"));

try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.use('/book', routerBook)
app.use('/member', routerMember)
app.use('/transaction', routerTransaction)


const port = process.env.PORT

app.listen(port, ()=>{
    console.log(`your application running on port http://localhost:${port}`)
})
