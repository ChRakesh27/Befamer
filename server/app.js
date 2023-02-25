const express = require('express');
const mysql = require('mysql2/promise');
var cors = require('cors');
const userRoutes = require('./routers/user');


// connect mysql database..
async function createServer() {
    try {
        var db = await mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'password',
            database: 'befarmer'
        });

        await db.ping()

        // express server
        const app = express();
        app.use(express.json());
        app.use(cors())

        // express routes
        userRoutes(app, db)

        // express server done
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log("started...http://localhost:3000");
        })

    } catch (error) {
        console.log("Error at createServer\n", error)

    }
}

createServer()