const { connection } = require("./model");
const bcrypt = require("bcryptjs");

//register user

const registeruser = async (req, res) => {
  try {
    var user = req?.body?.User;
    console.log(user);
    var password = user.password;
    bcrypt.hash(password.toString(), 10, function (err, hash) {
      if (err) {
        throw err;
      } else {
        let query = `INSERT INTO user_table VALUES(default,'${user.name}','${user.email}','${hash}');`;

        connection.query(query, function (err, rows) {
          if (err) {
            console.log(err);
            if (res.status(500)) {
              return res.json({ message: err.sqlMessage });
            }
          }

          return res
            .status(200)
            .json({ data: [], message: "User created  successfully" });
        });
      }
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ data: [], message: "Internal Server Error" });
  }
};

//login user
const loginuser = async (req, res) => {
  try {
    var user = req.body.User;
    console.log(user.email);
    var query = `SELECT user_pk,password from user_table where email_id='${user.email}';`;

    connection.query(query, function (err, rows, fields) {
      if (err) console.log(err);
      else {
        if (rows.length > 0) {
          console.log(rows[0].password);
          console.log(user.password.toString());

          bcrypt.compare(
            user.password.toString(),
            rows[0].password,
            (err, result) => {
              if (err) {
                return res.status(500).json({ data: [], message: err });
              }
              if (result) {
                console.log("login successfull");
                return res.status(200).json({ data: rows });
              }
            }
          );
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};

//add new todo

const addNewtodo = async (req, res) => {
  try {
    var todo = req?.body?.todo;
    var id = parseInt(req?.params?.userid);
    if (todo.length > 255) {
      return res
        .status(400)
        .json({ data: [], message: "todo cannot be too long" });
    }
    var date = new Date();
    date =
      date.toISOString().split("T")[0] +
      " " +
      date.toTimeString().split(" ")[0];
    let query = `INSERT INTO todo_list VALUES(default,'${todo}','${id}','${date}','${date}',null,0);`;
    console.log(todo);
    connection.query(query, function (err, rows) {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ data: [], message: "Internal Server Error" });
      }

      console.log("inserted succesffultt");
      return res
        .status(200)
        .json({ data: [], message: "Todo created successfully" });
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ data: [], message: "Internal Server Error" });
  }
};

// get all todos

const displayAlltodos = async (req, res) => {
  try {
    var id = parseInt(req?.params?.userid);
    var query = `SELECT * from todo_list where user_fk='${id}' and deleted_on IS NULL order by created_on desc;`;
    connection.query(query, function (err, rows) {
      if (err) console.log(err);
      else {
        return res.status(200).json({ data: rows });
      }
    });
  } catch (e) {
    console.log(e);
  }
};

// complete todo

const completeTodo = async (req, res) => {
  try {
    var todoid = req?.body?.id;
    var id = parseInt(req?.params?.userid);
    console.log("Id : ", todoid);
    var date = new Date();
    var status = 1;
    date =
      date.toISOString().split("T")[0] +
      " " +
      date.toTimeString().split(" ")[0];
    let query = `UPDATE todo_list SET modified_on='${date}',is_completed=1 where todo_pk='${todoid}';`;
    connection.query(query, function (err, rows) {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ data: [], message: "Internal Server Error" });
      }

      return res
        .status(200)
        .json({ data: [], message: "Todo updated successfully" });
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ data: [], message: "Internal Server Error" });
  }
};

//deleteTodo

const deleteTodo = async (req, res) => {
  try {
    var todoid = req?.body?.id;
    var id = parseInt(req?.params?.userid);
    var date = new Date();
    date =
      date.toISOString().split("T")[0] +
      " " +
      date.toTimeString().split(" ")[0];
    let query = `UPDATE todo_list SET deleted_on='${date}' where todo_pk='${todoid}'`;
    connection.query(query, function (err, rows) {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ data: [], message: "Internal Server Error" });
      }

      return res
        .status(200)
        .json({ data: [], message: "Todo deleted successfully" });
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ data: [], message: "Internal Server Error" });
  }
};

module.exports = {
  registeruser,
  loginuser,
  displayAlltodos,
  completeTodo,
  addNewtodo,
  deleteTodo,
};
