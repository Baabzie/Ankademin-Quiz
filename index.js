questionsArray = [
    {
        question: "Stockholm är Finlands huvudstad.",
        type: "trueFalse",
        alternativ: [],
        answer: [false]
    },
    {
        question: "Kolombia ligger i Sydamerika.",
        type: "trueFalse",
        alternativ: [],
        answer: [true]
    },
    {
        question: "Istanbul är Turkiets huvudstad.",
        type: "trueFalse",
        alternativ: [],
        answer: [false]
    },
    {
        question: "Kina har störst befolkning i världen.",
        type: "trueFalse",
        alternativ: [],
        answer: [true]
    }
];

console.log (questionsArray);

let startBtn = document.querySelector("#start-btn");
let answerArray = [];

let trueFunction = (event) => {
    if (questionsArray[answerArray.length].answer[0]){
        answerArray.push("Rätt!");
    } else {
        answerArray.push("Fel!");
    }
    event.target.parentElement.remove();
    quizFunction(questionsArray);
};

let falseFunction = (event) => {
    if (!questionsArray[answerArray.length].answer[0]){
        answerArray.push("Rätt!");
    } else {
        answerArray.push("Fel!");
    }
    event.target.parentElement.remove();
    quizFunction(questionsArray);
};

let quizFunction = (arr) => {
    let questionDiv =document.createElement("div");
    questionDiv.class = "questions";
    let questionForUser = document.createElement("h2");
    questionForUser.innerText = arr[answerArray.length].question;
    questionDiv.append(questionForUser);
    document.querySelector("body").append(questionDiv);
    // if (answerArray.length === arr.length)
    if (arr[answerArray.length].type === "trueFalse") {
        let trueBtn = document.createElement("button");
        trueBtn.innerText = "Sant";
        trueBtn.addEventListener ("click", trueFunction);
        questionDiv.append(trueBtn)
        let falseBtn = document.createElement("button");
        falseBtn.innerText = "Falskt";
        falseBtn.addEventListener ("click", falseFunction);
        questionDiv.append(falseBtn)
    };
    console.log(answerArray);
};

startBtn.addEventListener("click", (event) => {
    answerArray = [];
    quizFunction(questionsArray);
});