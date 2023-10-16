const LECTURER_TABLE = {
    name: "Lecturer",
    columns: {
        idL:     "idL",
        firstName: "firstName",
        lastName:  "lastName",
        password:  "password"
    }
}
const STUDENT_TABLE = {
    name: "Student",
    columns: {
        idS:     "idS",
        firstName: "firstName",
        lastName:  "lastName",
        password:  "password"
    }
}

const STUDENT_LECTURER_TABLE = {
    name: "StudentLecturer",
    columns: {
        idS:     "idS",
        idL:     "idL"
    }
}
const EXAM_TABLE = {
    name: "Exam",
    columns: {
        name:     "name",
        id:     "id",
        examDate:"examDate",
        idL:"idL",
        startH:"startH",
        totalTime:"totalTime",
        randomQ:"randomQ",
        randomA:"randomA"

    }
}

const EXAM_STUDENT_TABLE={
    name: "ExamStudent",
    columns: {
        num:"num",
        idS:     "idS",
        id:     "id",
        grade:"grade"
    }
}

const QUESTION_TABLE={
    name: "Question",
    columns: {
        numQ:"numQ",
        question:     "question",
        questionImg:"questionImg",
        Lectanswer:     "Lectanswer",
        idL:"idL"
    }
}
const EXAM_QUESTION_TABLE={
    name: "ExamQuestions",
    columns: {
        numA:"numA",
        numQ:"numQ",
        num:"num",
        questionGrade:"QGrade",
        AI:"AI"
    }
}
module.exports = {
    LECTURER_TABLE,STUDENT_TABLE,STUDENT_LECTURER_TABLE,EXAM_TABLE,EXAM_STUDENT_TABLE,QUESTION_TABLE,EXAM_QUESTION_TABLE
}