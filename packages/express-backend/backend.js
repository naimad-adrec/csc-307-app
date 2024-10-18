import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userService from "./services/user-service.js"

dotenv.config();

const {MONGO_CONNECTION_STRING} = process.env;

mongoose.set("debug", true);
mongoose
    .connect(MONGO_CONNECTION_STRING)
    .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// GET
app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    userService.getUsers(name, job)
        .then((data) => {
            res.send({users_list: data});
        })
        .catch((err) => {
            res.status(500).send({error: err.message});
        });
});

app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    userService.findUserById(id)
        .then((data) => {
            res.send(data);
        })
        .catch((e) => res.status(404).send("Resource not found"))
});

// POST
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    userService.addUser(userToAdd)
        .then((data) => {res.status(201).send(data)})
        .catch((e) => res.status(404).send("Error"));
});

// DELETE
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    userService.deleteUserById(id)
        .then((data) => {
            if (data === null) {
                res.status(404).send("Resource not found");
            } else {
                res.status(204).send();
            }
        })
        .catch((err) => res.status(500).send({error: err.message}));
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});