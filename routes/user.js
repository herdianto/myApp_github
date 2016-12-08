var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
	var Connection = require('tedious').Connection;  
    var Request = require('tedious').Request;  
    var TYPES = require('tedious').TYPES; 
    var config = {  
        userName: 'Adm1n',  
        password: 'Acc3ntureDB!',  
        server: 'indo-dc.database.windows.net',  
        // If you are on Microsoft Azure, you need this:  
        options: {encrypt: true, database: 'shell-db', rowCollectionOnDone: true}  
    };  
    var connection = new Connection(config);  
    connection.on('connect', function(err) {    
        console.log("Connected");
        connection.execSql(
            new Request("Select * from users;", function(err) {  
                if (err) {  
                    console.log(err);
                }  
            })
            .on('doneInProc',function(rowCount, more, rows){
                console.log("12345"+JSON.stringify(rows)); // not empty
                res.send(JSON.stringify(rows));
            }) 
    );
    });  


    function executeStatement() {  
    var Request = require('tedious').Request;  
    var TYPES = require('tedious').TYPES;  
    var jsonArray = [];
    var rowObject = {}; 
    var a = 0;

        request = new Request("Select * from users;", function(err) {  
        if (err) {  
            console.log(err);
        }  
        });  
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                //console.log(column.value +"  "+column.name);
                rowObject[a] = column.value;
                a++;
              }  
            });  
            jsonArray.push(rowObject);
            console.log("bbb" + jsonArray);  
        }); 
        console.log("aaa" + jsonArray);
        connection.execSql(request);    
        return jsonArray;
    }

    connection.close;
});

module.exports = router;
