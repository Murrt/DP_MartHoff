const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

app.listen(
    PORT,
    () => console.log('het leeft')
);

var fs = require('fs'); //require file system object

// Endpoint to Get a list of users
app.get('/getUsers', function(req, res){
if(req.query.ssn == null){
    fs.readFile(__dirname + "/" + "personeels_data.json", 'utf8', function(err, data){
        console.log(data);
        res.end(data); 
    });
}else{
    fs.readFile( __dirname + "/" + "personeels_data.json", 'utf8', function (err, data) {
        var users = JSON.parse( data );
        for (var i = 0; i < users.length; i++){
            if(users !== null){
                if (users[i].ssn == req.query.ssn){
                    console.log(users[i]);
                    res.end( JSON.stringify(users[i]));
                }
            }
        }
        if(i == users.length){
            res.end("not found");
        }
    });
}
    
});



// var user = {
//     "nieuwe_user":     {
//         "ssn": "312-62-1233",
//         "lastname": "Hoff",
//         "firstname": "Mart",
//         "hiredate": "12/6/2020",
//         "salary": "$22,500.00",
//         "gender": "M",
//         "performance": "Good",
//         "position": "CEO",
//         "location": "Emmen"
//       },
// } 

//The addUser endpoint
app.put('/addUser', function(req, res){

    const {body} = req;

    fs.readFile(__dirname + "/" + "personeels_data.json", 'utf8', function(err, data){
        data = JSON.parse(data);
        data.push(body);

        newData = JSON.stringify(data);

        fs.writeFile(__dirname + "/" + 'personeels_data.json', newData, err => {
            // error checking
            if(err) throw err;
            
            console.log("New user added");
        });   

        console.log(newData);
        res.end(JSON.stringify(newData));
    });
})

app.delete('/deleteUser', function (req, res) {
    // First retrieve existing users
    fs.readFile( __dirname + "/" + "personeels_data.json", 'utf8', function (err, data) {
      
       var users = JSON.parse(data);

       if(req.query.ssn == null){
        res.end("not found");
       }else{
            for (var i = 0; i < users.length; i++){
                if(users !== null){ 
                    if (users[i].ssn == req.query.ssn){
                        console.log(users[i]);
                        delete users[i];
                        console.log(users);
                        newData = JSON.stringify(users);
                        fs.writeFile(__dirname + "/" + 'personeels_data.json', newData, err => {
                            // error checking
                            if(err) throw err;
                            
                            console.log("User data deleted");
                        });   
        
                        res.end(JSON.stringify(users));
                    }
                } 
            }
            
       }
       
});

    });