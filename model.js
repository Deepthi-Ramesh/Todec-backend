const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo",
});

connection.connect((err) => {
  if (err) console.log(err);
  else console.log("you are connected");
});

module.exports = {
  connection,
};
