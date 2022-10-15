questionsArray = [
    {
        question: "Helsingborg är Finlands huvudstad.",
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
        answer: ["Brasilien", "Kolombia"]
    },
    {
        question: "Vilket av dessa länder ligger i Afrika?",
        type: "oneAlternative",
        alternative: ["Saudiarabien", "Israel", "Libyen", "Sri Lanka"],
        answer: ["Libyen"]
    },
    {
        question: "Sofia är Bulgariens huvudstad.",
        type: "trueFalse",
        alternative: [],
        answer: [true]
    },
    {
        question: "Markera de tre befolkningsrikaste länderna.",
        type: "multipleAlternative",
        alternative: ["USA", "Kina", "Indonesien", "Indien"],
        answer: ["Kina", "Indien", "USA"]
    },
    {
        question: "Vilket av dessa storstadsområden har störst befolkning?",
        type: "oneAlternative",
        alternative: ["Beijing", "Bombay", "Mexico City", "Shanghai", "Delhi", "Jakarta", "Tokyo", "Seoul",],
        answer: ["Tokyo"]
    },
    {
        question: "Markera alla länder som inte gränsar till något hav.",
        type: "multipleAlternative",
        alternative: ["Ryssland", "Mongoliet", "Tjeckien", "Indien", "Österrike", "Afghanistan", "Tyskland"],
        answer: ["Tjeckien", "Mongoliet", "Österrike", "Afghanistan"]
    },
    {
        question: "Sydney är Australiens huvudstad.",
        type: "trueFalse",
        alternative: [],
        answer: [false]
    },
    {
        question: "Det finns 58 monarkier i världen.",
        type: "trueFalse",
        alternative: [],
        answer: [false]
    },
];

let startBtn = document.querySelector("#start-btn");
let content = document.querySelector("#content");
let answerArray = [];

startBtn.addEventListener("click", (event) => {
    answerArray = [];
    content.innerHTML = "";
    quizFunction(questionsArray);
});

let quizFunction = (arr) => {
    let questionDiv =document.createElement("div");
    questionDiv.class = "questions";
    content.append(questionDiv);
    // Ifall användaren gått igenom alla frågor....
    if (answerArray.length === arr.length) {
        let answerForUser = document.createElement("h2");
        answerForUser.innerText = "Du är klar!";
        questionDiv.append(answerForUser, document.createElement("br"));
        // Skapar resultat-knapp.
        let resultBtn = document.createElement("button");
        resultBtn.innerText = "Visa resultat!";
        // Funktionen för resultat-knapp.
        resultBtn.addEventListener ("click", (event) => {
            //Tar bort resultat-knapp och h2 "Du är klar!"-text och visar alla frågor och ifall användaren har rätt eller fel.
            event.target.remove();
            answerForUser.remove();
            let points = 0;
            answerArray.forEach((answer, index) => {
                if (answer === "Rätt!") {
                    points++;
                }
                let questionForUser = document.createElement("h3");
                questionForUser.innerText = arr[index].question;
                questionDiv.append(questionForUser, answer, document.createElement("br"));
            })
            let score = document.createElement("h2");
            score.innerHTML = ("" + points + "/" + arr.length + " möjliga poäng!")
            questionDiv.append(score);
        })
        questionDiv.append(resultBtn);
    }
    //...annars.
    else {
        let questionForUser = document.createElement("h2");
        questionForUser.innerText = arr[answerArray.length].question;
        questionDiv.append(questionForUser);

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
                altCheckbox.setAttribute("value", alt);
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
                    let allAnswers = [];
                    (document.querySelectorAll("[name='checkbox-btn']:checked")).forEach((obj) => {
                        allAnswers.push(obj.value);
                    });   
                    // Om man har klickat i lika många alternativ som det finns rätta svar (jämför längden) så fortsätter den rätta, annars...         
                    if (allAnswers.length === (arr[answerArray.length].answer).length) {
                        corrected = [];
                        // Jämför alla rätta alternativ med de man har klickat i, det spelar ingen roll vilken ordning de rätta svaren ligger i arrayan med frågor (därav mycket kod).
                        (arr[answerArray.length].answer).forEach((alt) => {
                            allAnswers.forEach((alt2) => {
                                if (alt === alt2) {
                                    corrected.push(alt2);
                                }
                            })
                        })
                        // Om vi har klickat i samma resultat som de rätta svaren var så ska vi nu får rätt på frågan (jämför längden), annars...
                        if (corrected.length === (arr[answerArray.length].answer).length) {
                            answerArray.push("Rätt!");
                        }
                        //...får vi fel
                        else {
                            answerArray.push("Fel!");
                        }
                    }
                    //...har du automatiskt fel.
                    else {
                        answerArray.push("Fel!");
                    };
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
    }
}
