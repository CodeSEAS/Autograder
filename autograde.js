const fs = require('fs');
const {PythonShell} =require('python-shell');

function autograde(fileName, fileContent) {
    let grade = 0

    //create an empty file
    fs.open(fileName, 'w', function (err, file) {
        if (err) throw err;
        console.log('Saved!');
    });
    // append file content to the file
    fs.appendFile(fileName, fileContent, function (err) {
        if (err) throw err;
        console.log('Updated!');
    });
    //Here are the option object in which arguments can be passed for the python_test.js.
    // let options = {
    //     mode: 'text',
    //     pythonOptions: ['-u'], // get print results in real-time
    //     scriptPath: 'path/to/my/scripts', //If you are having python_test.py script in same folder, then it's optional.
    //     args: ['shubhamk314'] //An argument which can be accessed in the script using sys.argv[1]
    // };

    // 1. run
    // 2. assert

    PythonShell.run(fileName, null,function (err, result){
        if (err) {
            grade = 0;
        }
        // result is an array consisting of messages collected
        //during execution of script.
        console.log('result: ', result);
    });

    PythonShell.runString('print("sss")', null, function (err, results) {

        console.log(results);
    });

    return grade;
}

module.exports = {
    autograde
}

// function main() {
//     let grade = autograde('assignment1.py', 'assert False')
//     // return grade;
//     console.log("result is:" + grade);
// }
//
// if (require.main === module) {
//     main();
// }
