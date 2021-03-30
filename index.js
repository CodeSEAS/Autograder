const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { autograde } = require('./autograde')
const { insertGrade, searchGrade } = require('./connectSQL')

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })
//
// GET method route
app.get('/:id', function (req, res) {
    let id = req.params.id;
    searchGrade(id, (details)=>{
        res.send(details);
    });
})

// POST method route
app.post('/submit', function (req, resp) {
    console.log(req.body);// your JSON
    let grade = autograde('assignment1.py', 'assert False')
    // let grade = autograde(req.body.assignment, req.body.assignmentName);
    insertGrade(grade,req.body.name, req.body.email, req.body.assignmentName)
    // resp.send(req.body);    // echo the result back
    // resp.sendStatus(200);
    resp.send('Congradulations! You have successfully submitted!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})