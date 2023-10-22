const express = require("express");
const cors = require("cors");
const axios = require("axios");
var path = require("path");
const bodyParser = require("body-parser"); //parse request parameters
const mysql = require('mysql2');
const { result } = require("lodash");

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
  SLList   INT   PRIMARY KEY,
  idS VARCHAR(9) NOT NULL,
  idL VARCHAR(9) NOT NULL,
  FOREIGN KEY (idS) REFERENCES Student(idS) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (idL) REFERENCES LECTURER(idL) ON UPDATE CASCADE ON DELETE CASCADE
)
`;

connection.query(createTableQuery2, (err, results) => {
if (err) {
  console.error('Error creating table:', err);
  return;
}
console.log('Table StudentLecturer created successfully');
});
const createExamTable = `
    CREATE TABLE IF NOT EXISTS Exam (
      examId DECIMAL(5) PRIMARY KEY,
      name VARCHAR(255),
      examDate DATE,
      idL   varchar(9),
      startH TIME,
      totalTime INT,
      randomQ BOOLEAN,
      randomA BOOLEAN,
      FOREIGN KEY (idL) REFERENCES lecturer(idL) ON UPDATE CASCADE ON DELETE CASCADE
    )
  `;
  connection.query(createExamTable, (err) => {
    if (err) {
      console.error('Error creating Exam table:', err);
    } else {
      console.log('Exam table created');
    }
  });

  const createExamStudentTable = `
  CREATE TABLE IF NOT EXISTS ExamStudent (
    num INT   PRIMARY KEY,
    idS   varchar(9),
    examId DECIMAL(5),
    grade DECIMAL(5, 2),
    FOREIGN KEY (idS) REFERENCES student(idS) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (examId) REFERENCES Exam(examId) ON UPDATE CASCADE ON DELETE CASCADE
  )
`;
connection.query(createExamStudentTable, (err) => {
  if (err) {
    console.error('Error creating ExamStudent table:', err);
  } else {
    console.log('ExamStudent table created');
  }
});
  const createQuestionTable = `
    CREATE TABLE IF NOT EXISTS QUESTION_TABLE (
      numQ INT   PRIMARY KEY,
      question TEXT,
      questionImg VARCHAR(255),
      Lectanswer TEXT,
      idL   varchar(9),
      FOREIGN KEY (idL) REFERENCES lecturer(idL) ON UPDATE CASCADE ON DELETE CASCADE

    )
  `;
  connection.query(createQuestionTable, (err) => {
    if (err) {
      console.error('Error creating Question table:', err);
    } else {
      console.log('Question table created');
    }
  });
  const createExamQuestionsTable = `
    CREATE TABLE IF NOT EXISTS EXAM_QUESTION_TABLE (
      numA INT   PRIMARY KEY,
      numQ INT,
      num INT,
      questionGrade DECIMAL(5, 2),
      AI BOOLEAN,
      FOREIGN KEY (numQ) REFERENCES QUESTION_TABLE(numQ) ON UPDATE CASCADE ON DELETE CASCADE,
      FOREIGN KEY (num) REFERENCES ExamStudent(num) ON UPDATE CASCADE ON DELETE CASCADE
    )
  `;
  connection.query(createExamQuestionsTable, (err) => {
    if (err) {
      console.error('Error creating ExamQuestions table:', err);
    } else {
      console.log('ExamQuestions table created');
    }
  });



/**
 * 
 * Register management
 * 
 * */
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

/**
 * 
 * log in
 * 
 * */
app.post("/SignIn", function (req, res) {
  console.log("Server");
  console.log(req.body);
  let status = "";
  let data = {};

  // Check if it's a student
  const selectQuery = 'SELECT * FROM Student WHERE idS = ? ';
  connection.query(selectQuery, [req?.body?.id], (err, results) => {
    if (err) {
      console.error('Error retrieving Student:', err);
      res.send({ success: false, error: err, info: null });
    } else if (results.length === 1) {
      status = "Student";
      const idS = results[0].idS;
      const firstName = results[0].firstName;
      const lastName = results[0].lastName;
      if (results[0].password === req?.body?.password) {
        data = {
          idS,
          firstName,
          lastName,
          status,
        };
        res.send({ success: true, error: null, info: data });
      } else {
        res.send({ success: false, error: "incorrect password", info: null });
      }
    } else {
      // If it's not a student, check if it's a lecturer
      const selectQuery1 = 'SELECT * FROM Lecturer WHERE idL = ? ';
      connection.query(selectQuery1, [req?.body?.id], (err, results) => {
        if (err) {
          console.error('Error retrieving Lecturer:', err);
          res.send({ success: false, error: err, info: null });
        } else if (results.length === 1) {
          status = "Lecturer";
          const idL = results[0].idL;
          const firstName = results[0].firstName;
          const lastName = results[0].lastName;
          if (results[0].password === req?.body?.password) {
            data = {
              idL,
              firstName,
              lastName,
              status,
            };
            res.send({ success: true, error: null, info: data });
          } else {
            res.send({ success: false, error: "incorrect password", info: null });
          }
        } else {
          // If it's neither student nor lecturer, return an error
          res.send({ success: false, error: "User not found", info: null });
        }
      });
    }
  });
});

/**
 * 
 * MainLecturer
 * 
 */
app.get('/MainLecturer',  function (req, res) {
  const idL=req.query.idL;
  let firstName='';
  let lastName='';
  console.log('server side ',idL);
  let LecturerData={
    idL,
    firstName,
    lastName
  }
  const selectQuery = 'SELECT * FROM Lecturer WHERE idL = ? ';
      connection.query(selectQuery, [idL], (err, results) => {
        if (err) {
          console.error('Error retrieving Lecturer:', err);
          res.send({ success: false, error: err, info: null });
        } else if (results.length === 1) {
          LecturerData.firstName=results[0].firstName;
          LecturerData.lastName=results[0].lastName;
          console.log(LecturerData)
          res.send({ success: true, error: null, info: {LecturerData} })
        }

      })
});

app.get('/Exams',  function (req, res) {
  const idL=req.query.idL;
  let name=''
  let examId=''
  let examDate=''
  let startH=''
  let totalTime=''
  let randomQ=''
  let randomA=''
  console.log('server side ',idL);
  let examsData={
    name,
    examId,
    idL,
    examDate,
    startH,
    totalTime,
    randomQ,
    randomA
  }
  const selectQuery = 'SELECT * FROM Exam WHERE idL = ? ';
      connection.query(selectQuery, [idL], (err, results) => {
        if (err) {
          console.error('Error retrieving Lecturer:', err);
          res.send({ success: false, error: err, info: null });
        } else if (results.length !== 0) {
          console.log(results[0])
          examsData.examId=results[0].examId;
          examsData.name=results[0].name;
          examsData.examDate=results[0].examDate;
          examsData.startH=results[0].startH;
          examsData.totalTime=results[0].totalTime;
          examsData.randomQ=results[0].randomQ;
          examsData.randomA=results[0].randomA;

          console.log(examsData)
          res.send({ success: true, error: null, info: results})
        }

      })
});
app.post('/CreateExam', async (req, res) => {
  try {
    // Get the max ID
    let newId = 1;
    const selectQuery = 'SELECT MAX(examId) AS maxId FROM exam';
    connection.query(selectQuery, (err, results) => {
      if (err) {
        console.error('Error retrieving Lecturer:', err);
        res.status(500).json({ success: false, error: err, info: null });
        return; // Exit early
      } else if (results[0] !== null) {
        const maxId = results[0].maxId;
        newId = maxId + 1;
      }

      // Insert new exam
      const ExamData = {
        examId: newId,
        name: req.body.name,
        idL: req.body.idL,
        examDate: req.body.examDate,
        startH: req.body.startH,
        totalTime: req.body.totalTime,
        randomQ: req.body.randomQ,
        randomA: req.body.randomA
      };

      const insertQuery = 'INSERT INTO exam (examId, name, examDate, idL, startH, totalTime, randomQ, randomA) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      connection.query(insertQuery, [ExamData.examId, ExamData.name, ExamData.examDate, ExamData.idL, ExamData.startH, ExamData.totalTime, ExamData.randomQ, ExamData.randomA], (err, insertResults) => {
        if (err) {
          console.error('Error inserting data:', err);
          res.status(500).json({ success: false, error: err, info: null });
        } else if(insertResults.affectedRows!==0){
          console.log('Data inserted successfully');
          console.log(ExamData, insertResults);
          res.send({ success: true, error: null, info: ExamData });
        }
      });

    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error, info: null });
  }
});
    
    

    


app.listen(port, () => {
    console.log(
        `exam-management server listening on http://localhost:${port}`
    );
});