const express = require("express");
const cors = require("cors");
const axios = require("axios");
var path = require("path");
const bodyParser = require("body-parser"); //parse request parameters
const mysql = require('mysql2');
const { stat } = require("fs");

const app = express(); // Create express app
const port = process.env.PORT || 8000; // Port to listen on

app.use(express.static(__dirname)); //specifies the root directory from which to serve static assets [images, CSS files and JavaScript files]
app.use(bodyParser.urlencoded({ extended: true })); //parsing bodies from URL. extended: true specifies that req.body object will contain values of any type instead of just strings.
app.use(bodyParser.json()); //for parsing json objects
app.listen(8180);
app.use(cors());

// Define object with db config data
const connection = mysql.createConnection({
    host: 'localhost', // MySQL server host
    user: 'root',
    password:'&Yassmine172',
    port:'3306',
    database:'exams',
  });
  
  // Establish the connection
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL');
  });
  
  // Perform database operations here
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS LECTURER (
    idL   varchar(9)  PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL  )
`;

connection.query(createTableQuery, (err, results) => {
  if (err) {
    console.error('Error creating table:', err);
    return;
  }
  console.log('Table created successfully');
});
const createTableQuery1 = `
CREATE TABLE IF NOT EXISTS Student (
  idS   varchar(9)  PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL  )
`;

connection.query(createTableQuery1, (err, results) => {
if (err) {
  console.error('Error creating table:', err);
  return;
}
console.log('Table Student created successfully');
});
const createTableQuery2 = `
CREATE TABLE IF NOT EXISTS StudentLecturer (
  SLList   INT AUTO_INCREMENT PRIMARY KEY,
  idS VARCHAR(255) NOT NULL,
  idL VARCHAR(255) NOT NULL )
`;

connection.query(createTableQuery2, (err, results) => {
if (err) {
  console.error('Error creating table:', err);
  return;
}
console.log('Table StudentLecturer created successfully');
});


//Register management
app.post("/Register",function(req,res){
  console.log(req.body);
  let status=req.body.Status
  if(status === 'Student'){
    status='Student';
    const selectQuery = 'SELECT * FROM student WHERE idS = ?';
    connection.query(selectQuery, [ req?.body?.id], (err, results) => {
      if (err) {
        console.error('Error retrieving student:', err);
        res.send({success:false,error:err,info:null})
      }
      if (results.length === 0) {
        //insert
        const studentData = {
          idS: req?.body?.id,
          firstName: req?.body?.firstName,
          lastName: req?.body?.lastName,
          password:req?.body?.password
        };
        const insertQuery = 'INSERT INTO Student (idS, firstName, lastName,password) VALUES (?, ?, ?,?)';

        const user=connection.query(insertQuery, [studentData.idS, studentData.firstName, studentData.lastName,studentData.password], (err, results) => {
          if (err) {
            console.error('Error inserting data:', err);
            res.send({success:false,error:err,info:null})
          }
          console.log('Data inserted successfully\n');
          const result = {
            idS: req?.body?.id,
              firstName: req?.body?.firstName,
              lastName: req?.body?.lastName,
              password:req?.body?.password,
            status:'Student'
          };
          res.send({success:true,error:null,info:{result}})
        });
            console.log("student table!!!!!!!!!!!!");
        
      } else {
        const student = results[0]; // Assuming the query returns a single student
        //send that he is already exists
        res.send({success:false,error:"already EXIST",info:{student}})
      }
    });

    

  }if(status === 'Lecturer'){
    status='Lecturer';
    const selectQuery = 'SELECT * FROM Lecturer WHERE idS = ?';
    connection.query(selectQuery, [ req?.body?.id], (err, results) => {
      if (err) {
        console.error('Error retrieving Lecturer:', err);
        res.send({success:false,error:err,info:null})
      }
      if (results.length === 0) {
        //insert
        const lecturerData = {
          idL: req?.body?.id,
          firstName: req?.body?.firstName,
          lastName: req?.body?.lastName,
          password:req?.body?.password
        };
        const insertQuery = 'INSERT INTO Lecturer (idL, firstName, lastName,password) VALUES (?, ?, ?,?)';

        const user=connection.query(insertQuery, [lecturerData.idL, lecturerData.firstName, lecturerData.lastName,lecturerData.password], (err, results) => {
          if (err) {
            console.error('Error inserting data:', err);
            res.send({success:false,error:err,info:null})
          }
          console.log('Data inserted successfully\n');
          const result = {
            idL: req?.body?.id,
              firstName: req?.body?.firstName,
              lastName: req?.body?.lastName,
              password:req?.body?.password,
            status:'Lecturer'
          };
          res.send({success:true,error:null,info:{result}})
        });
            console.log("Lecturer table!!!!!!!!!!!!");
        
      } else {
        const lecturer = results[0]; // Assuming the query returns a single lecturer
        //send that he is already exists
        res.send({success:false,error:"already EXIST",info:{lecturer}})
      }
    });

  }
})






app.listen(port, () => {
    console.log(
        `exam-management server listening on http://localhost:${port}`
    );
});