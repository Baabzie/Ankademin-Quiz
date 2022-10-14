questionsArray = [
    {
        question: "Stockholm är Finlands huvudstad.",
        type: "trueFalse",
        alternative: [],
        answer: [false]
    },
    {
        question: "Vilket land ligger inte i Europa?",
        type: "oneAlternative",
        alternative: ["Moldavien", "Israel", "Tjeckien", "Slovenien"],
        answer: ["Israel"]
    },
    {
        question: "Markera alla länder som ligger i Sydamerika.",
        type: "multipleAlternative",
        alternative: ["Kolombia", "Mexiko", "Brasilien", "Nicaragua"],
        answer: ["Kolombia", "Brasilien"]
    }
];

console.log (questionsArray);

let startBtn = document.querySelector("#start-btn");
let content = document.querySelector("#content");
let answerArray = [];

// True-function

let trueFunction = (event) => {
    if (questionsArray[answerArray.length].answer[0]){
        answerArray.push("Rätt!");
    } else {
        answerArray.push("Fel!");
    }
    content.innerHTML = "";
    quizFunction(questionsArray);
};

// False-function

let falseFunction = (event) => {
    if (!questionsArray[answerArray.length].answer[0]){
        answerArray.push("Rätt!");
    } else {
        answerArray.push("Fel!");
    }
    content.innerHTML = "";
    quizFunction(questionsArray);
};

let quizFunction = (arr) => {
    let questionDiv =document.createElement("div");
    questionDiv.class = "questions";
    let questionForUser = document.createElement("h2");
    questionForUser.innerText = arr[answerArray.length].question;
    questionDiv.append(questionForUser);
    content.append(questionDiv);
    // if (answerArray.length === arr.length)

    // Funktion för Sant/Falsk-frågor.
    if (arr[answerArray.length].type === "trueFalse") {
        let trueBtn = document.createElement("button");
        trueBtn.innerText = "Sant";
        trueBtn.addEventListener ("click", trueFunction);
        questionDiv.append(trueBtn)
        let falseBtn = document.createElement("button");
        falseBtn.innerText = "Falskt";
        falseBtn.addEventListener ("click", falseFunction);
        questionDiv.append(falseBtn)
    }
    // Funktion för radio-frågor.
    else if (arr[answerArray.length].type === "oneAlternative") {
        (arr[answerArray.length].alternative).forEach((alt) => {
            let altRadio = document.createElement("input");
            altRadio.setAttribute("type", "radio");
            altRadio.setAttribute("name", "radio-btn");
            if (alt === arr[answerArray.length].answer[0]) {
                altRadio.setAttribute("value", "Rätt!");
            }
            else {
                altRadio.setAttribute("value", "Fel!");
            };
            altRadio.id = alt;
            let altLabel = document.createElement("label");
            altLabel.setAttribute("for", alt);
            altLabel.innerHTML = alt + ":";
            questionDiv.append(altLabel, altRadio, document.createElement("br"));
        });
        let submitBtn = document.createElement("button");
        submitBtn.innerText = "Svara";
        submitBtn.addEventListener ("click", () => {
            let answer = document.querySelector("[name='radio-btn']:checked").value;
            answerArray.push(answer);
            content.innerHTML = "";
            quizFunction(arr);
        });
        questionDiv.append(document.createElement("br"), submitBtn);
    }
    console.log(answerArray);
};

startBtn.addEventListener("click", (event) => {
    answerArray = [];
    content.innerHTML = "";
    quizFunction(questionsArray);
});