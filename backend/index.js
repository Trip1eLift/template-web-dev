import express, { response } from 'express';
import pg from 'pg';

const { Pool, Client } = pg;

const app = express();
const port = 8080;

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

const postgres_credentials = {
    user:     process.env.DB_USER || "postgres",
    host:     process.env.DB_HOST || "localhost",
    password: process.env.DB_PASS || "postgres",
    port:     process.env.DB_PORT || 5432,
};

app.get("/health", (request, response) => {
    console.log("Health check endpoint reached.");
    response.send("Healthy");
});

// Table should be created using create_tables.sql feeded by docker-compose
app.post("/init", (requst, response) => {
    // pg doc: https://node-postgres.com/features/pooling
    const pool = new Pool(postgres_credentials);

    pool.query("CREATE TABLE IF NOT EXISTS users(uid VARCHAR(256) PRIMARY KEY, name VARCHAR(32))", [], (err, result) => {
        if (err) {
            console.error(err);
            response.send(err);
        } else {
            console.log(result);
            console.log("Created table!");
            response.send(result);
        }
    });
});

app.options("/add", (request, response) => {
    response.set("Access-Control-Allow-Headers", "Content-Type");
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Methods", "OPTIONS,GET,POST");
    response.send("Allow!");
});

app.post("/add", (requst, response) => {
    response.set("Access-Control-Allow-Headers", "Content-Type");
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Methods", "OPTIONS,GET,POST");
    const pool = new Pool(postgres_credentials);

    console.log(requst.body);
    const uid = requst.body.uid;
    const name = requst.body.name;
    if (uid == null || name == null) {
        response.send("Invalid request body");
    }

    pool.query("INSERT INTO users (uid, name) VALUES($1, $2)", [uid, name], (err, result) => {
        if (err) {
            console.error(err);
            response.status(400);
            response.set('whatever', 'this')
            response.send(err);
        } else {
            console.log(result);
            console.log("Inserted data!");
            response.send(result);
        }
    });
});

app.options("/read", (request, response) => {
    response.set("Access-Control-Allow-Headers", "Content-Type");
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Methods", "OPTIONS,GET,POST");
    response.send("Allow!");
});

app.get("/read", (requst, response) => {
    response.set("Access-Control-Allow-Headers", "Content-Type");
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Methods", "OPTIONS,GET,POST");

    const pool = new Pool(postgres_credentials);
    const uid = requst.query.uid;

    pool.query("SELECT * FROM users WHERE uid=$1", [uid], (err, result) => {
        if (err || result.rows.length <= 0) {
            console.error(err);
            response.status(400);
            response.send(err);
        } else {
            console.log(result.rows);
            console.log("Get data!");
            response.send(result.rows[0]);
        }
    });
});

function errorLogger(request, response, next) {
    console.log("Unhandled request, path:", request.url);
}

app.use(errorLogger);

const server = app.listen(port, () => {
    console.log("Listening on port:", port);
})

async function terminate(signal) {
    console.log(`Received signal to termintate: ${signal}`);
    await server.close();
    process.exit();
}

process.on("SIGINT", terminate);
process.on("SIGTERM", terminate);