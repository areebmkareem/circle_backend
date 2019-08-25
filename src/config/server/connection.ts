import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: 'src/config/environment/.env'})
const app = express()
const port = process.env.PORT || 8080

function server() {
    app.listen(port, () => {
        console.log(
            "  App is running at http://localhost:%d in %s mode",
            port,
            app.get("env")
        );
    });
}  

export default server;