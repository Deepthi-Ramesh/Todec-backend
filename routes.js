const express = require("express");
const router = express.Router();

const todoController = require("./controllers");

router.get("/todos/:userid", todoController.displayAlltodos);
router.post("/addtodo/:userid", todoController.addNewtodo);
router.post("/deleteTodo/:userid", todoController.deleteTodo);
router.put("/completedTodo/:userid", todoController.completeTodo);
router.post("/register", todoController.registeruser);
router.post("/login", todoController.loginuser);

module.exports = router;
