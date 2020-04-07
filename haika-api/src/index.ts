import app from "./app"
import config from "./config/config"
import "reflect-metadata"
import { createConnection, getConnection } from "typeorm"

/**
 * Connect database
 */
createConnection(config.env)
    .then(connect => {
        // success log
        console.log("database connected!");
        // run app
        app.listen(config.port, () => {
            console.log(`App:${config.env} listening on ${config.port} port...`);
        });
    })
    .catch(err => {
        // fail log
        console.log(err);
        console.log("failed database connection");
    });

function eventHandler(options: any, exitCode: Object) {
    if (options.cleanup) {
        getConnection(config.env).close();
        console.log("closed db connection");
    }
    if (options.exit) process.exit(0);
}
// when closing app
process.on("exit", eventHandler.bind(null, { cleanup: true }));
// catches ctrl+c event
process.on("SIGINT", eventHandler.bind(null, { exit: true }));
// when nodemon restart
process.on("SIGUSR1", eventHandler.bind(null, { exit: true }));
process.on("SIGUSR2", eventHandler.bind(null, { exit: true }));
