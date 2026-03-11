// This builds the server instance.
import express from "express";
import routes from "./routes/index.js";

export function startServer() {
    const app = express();

    app.use(express.json());

    app.use("/api/v1", routes);

    app.listen(3000, () => {
        console.log("API running on port 3000");
    });
}