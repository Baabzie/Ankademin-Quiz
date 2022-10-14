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

let startBtn = document.querySelector("#start-btn");
let content = document.querySelector("#content");
let answerArray = [];

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
        // Skapar funktion till Sant-knappen.
        trueBtn.addEventListener ("click", () => {
            if (arr[answerArray.length].answer[0]){
                answerArray.push("Rätt!");
            } else {
                answerArray.push("Fel!");
            }
            content.innerHTML = "";
            quizFunction(arr);
        });
        questionDiv.append(trueBtn)
        let falseBtn = document.createElement("button");
        falseBtn.innerText = "Falskt";
        // Skapar funktion till Falskt-knappen.
        falseBtn.addEventListener ("click", () => {
            if (!arr[answerArray.length].answer[0]){
                answerArray.push("Rätt!");
            } else {
                answerArray.push("Fel!");
            }
            content.innerHTML = "";
            quizFunction(arr);
        });
        questionDiv.append(falseBtn)
    }
    // Funktion för radio-frågor.
    else if (arr[answerArray.length].type === "oneAlternative") {
        (arr[answerArray.length].alternative).forEach((alt) => {
            let altRadio = document.createElement("input");
            altRadio.setAttribute("type", "radio");
            altRadio.setAttribute("name", "radio-btn");
            // Avgör ifall värdet på radioknappen är Rätt...
            if (alt === arr[answerArray.length].answer[0]) {
                altRadio.setAttribute("value", "Rätt!");
            }
            //... eller Fel.
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
        // Skapar funktion för Svara-knappen.
        submitBtn.addEventListener ("click", () => {
            // Om du har klickat i en radio-knapp så ....
            if (document.querySelector("[name='radio-btn']:checked")) {
                let answer = document.querySelector("[name='radio-btn']:checked").value;
                answerArray.push(answer);
                content.innerHTML = "";
                quizFunction(arr);
            }
            // ...annars får du en "alert" om att göra detta.
            else {
                alert("Vänligen klicka i ett alternativ!");
            };
        });
        questionDiv.append(document.createElement("br"), submitBtn);
    }
    // Funktion för flersvarsfrågor.
    else if (arr[answerArray.length].type === "multipleAlternative") {
        (arr[answerArray.length].alternative).forEach((alt) => {
            let altCheckbox = document.createElement("input");
            altCheckbox.setAttribute("type", "checkbox");
            altCheckbox.setAttribute("name", "checkbox-btn");
            // Avgör ifall värdet på checkbox-knappen är Rätt...
            if ((arr[answerArray.length].answer).includes(alt)) {
                altCheckbox.setAttribute("value", "Rätt!");
            }
            //... eller Fel.
            else {
                altCheckbox.setAttribute("value", "Fel!");
            };
            altCheckbox.id = alt;
            let altLabel = document.createElement("label");
            altLabel.setAttribute("for", alt);
            altLabel.innerHTML = alt + ":";
            questionDiv.append(altLabel, altCheckbox, document.createElement("br"));
        });
        let submitBtn = document.createElement("button");
        submitBtn.innerText = "Svara";
        // Skapar funktion för Svara-knappen.
        submitBtn.addEventListener ("click", () => {
            // Om du har klickat i minst en checkbox-knapp så ....
            if (document.querySelector("[name='checkbox-btn']:checked")) {
                allAnswersFunction = () => {
                    let allAnswers = [];
                    (document.querySelectorAll("[name='checkbox-btn']:checked")).forEach((obj) => {
                        allAnswers.push(obj.value);
                    });
                    return allAnswers;
                };
                console.log(allAnswersFunction());
                answerArray.push(answer);
                content.innerHTML = "";
                quizFunction(arr);
            }
            // ...annars får du en "alert" om att göra detta.
            else {
                alert("Vänligen klicka i minst ett alternativ!");
            };
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