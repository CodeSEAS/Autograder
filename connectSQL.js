const mysql = require('mysql');

function getConnection() {
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: '3306',
        password: 'password',
        database: 'todoapp'
    });
    return connection;
}

function insertGrade(grade, username, email, assignmentName) {
    // let record = [grade, username, email, assignmentName];
    let connection = getConnection();
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        connection.query("INSERT INTO Students (Grade, Username, Email, AssignmentName) VALUES (?, ?, ?, ?)", [grade, username, email, assignmentName], function (err, data) {
            if (err) throw err;
            console.log('Successfully inserted into the db')
            connection.end();
        })
    });
}
function searchGrade(id, resp_callback) {
    let curId = id;
    let connection = getConnection();
    connection.connect()
    console.log("result0");

    connection.query("SELECT Username, Grade FROM Students WHERE Email = ?", [curId], function (err, results, data) {
        if (err) throw err
        console.log('Successfully searched from the db' + results);
        connection.end();
        console.log("result2");
        resp_callback(results);
    })
    console.log("result1");
}

module.exports = {
    insertGrade,
    searchGrade
}
