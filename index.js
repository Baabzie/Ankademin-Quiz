//En array dom innehåller objekt(Olika quiz), objektet i sig innehåller nyklar, ett namn (quizets namn), och ett quiz (en array som i sin tur innehåller objekt för varje fråga).
allQuiz = [
    {
        name: "Geografi Quiz",
        quiz:
        [
            {
                question: "Helsingborg är Finlands huvudstad.",
                type: "oneAlternative",
                alternative: ["Sant", "Falskt"],
                answer: ["Falskt"],
                correctString: "Helsingborg är en ort i Sverige. Helsingfors är Finlands huvudstad."
            },
            {
                question: "Vilket land ligger INTE i Europa?",
                type: "oneAlternative",
                alternative: ["Moldavien", "Israel", "Tjeckien", "Slovenien"],
                answer: ["Israel"],
                correctString: "Israel är det land som inte ligger i Europa."
            },
            {
                question: "Markera alla länder som ligger i Sydamerika.",
                type: "multipleAlternative",
                alternative: ["Kolombia", "Mexiko", "Brasilien", "Nicaragua"],
                answer: ["Brasilien", "Kolombia"],
                correctString: "Brasilien och Kolombia ligger i Sydamerika, Mexiko och Nicaragua ligger i Centralamerika som tillhär Nordamerika."
            },
            {
                question: "Vilket av dessa länder ligger i Afrika?",
                type: "oneAlternative",
                alternative: ["Saudiarabien", "Israel", "Libyen", "Sri Lanka"],
                answer: ["Libyen"],
                correctString: "Libyen ligger i Afrika."
            },
            {
                question: "Sofia är Bulgariens huvudstad.",
                type: "oneAlternative",
                alternative: ["Sant", "Falskt"],
                answer: ["Sant"],
                correctString: "Sofia är Bulgariens huvudstad."
            },
            {
                question: "Markera de tre befolkningsrikaste länderna.",
                type: "multipleAlternative",
                alternative: ["USA", "Kina", "Indonesien", "Indien"],
                answer: ["Kina", "Indien", "USA"],
                correctString: "Kina, Indien och USA är de tre befolkningsrikaste länderna."
            },
            {
                question: "Vilket av dessa storstadsområden har störst befolkning?",
                type: "oneAlternative",
                alternative: ["Beijing", "Bombay", "Mexico City", "Shanghai", "Delhi", "Jakarta", "Tokyo", "Seoul",],
                answer: ["Tokyo"],
                correctString: "Tokyos storstadsområde är det storstadsområde med störst befolkning i världen."
            },
            {
                question: "Markera alla länder som INTE gränsar till något hav.",
                type: "multipleAlternative",
                alternative: ["Ryssland", "Mongoliet", "Tjeckien", "Indien", "Österrike", "Afghanistan", "Tyskland"],
                answer: ["Tjeckien", "Mongoliet", "Österrike", "Afghanistan"],
                correctString: "Tjeckien, Mongoliet, Österrike och Afganistan gränsar inte till något hav. Ryssland, Indien och Tyskland gränsar alla till ett eller flera hav."
            },
            {
                question: "Sydney är Australiens huvudstad.",
                type: "oneAlternative",
                alternative: ["Sant", "Falskt"],
                answer: ["Falskt"],
                correctString: "Sydney är inte Australiens huvudstad. Australiens huvudstad är Canberra."
            },
            {
                question: "Det finns 58 monarkier i världen.",
                type: "oneAlternative",
                alternative: ["Sant", "Falskt"],
                answer: ["Falskt"],
                correctString: "Det finns inte 58 monarkier i världen utan 'bara' 29."
            },
        ]
    },
    {
        name: "Elektriker Quiz",
        quiz:
        [
            {
                question: "En nydragen neutralledare ska enligt svenska regler ha blå färg.",
                type: "oneAlternative",
                alternative: ["Sant", "Falskt"],
                answer: ["Sant"],
                correctString: "En nydragen neutralledare ska enligt svenska regler ha blå färg."
            },
            {
                question: "Vilken av följande strömstyrkor är INTE en standard på säkringar i Sverige?",
                type: "oneAlternative",
                alternative: ["10A", "14A", "16A"],
                answer: ["14A"],
                correctString: "Det finns ingen säkring i Sverige med strömstyrkan 14A."
            },
            {
                question: "Markera alla de färger på en ledare som du INTE under några som helst omständingheter får använda som en tändtråd.",
                type: "multipleAlternative",
                alternative: ["Brun", "Svart", "Grå", "Blå", "Gul/Grön"],
                answer: ["Gul/Grön"],
                correctString: "Du får aldrig använda en gul/grön ledare som en tändtråd. En blå ledare får bara vid vissa tillfällen användas som en tändtråd."
            }
        ]
    },
];

//Vår nattläge-knapp.
let darkModeBtn = document.querySelector("#dark-mode-btn");
//Ifall nattläge är på ett av.
let isDark = false;
//Vårt "Starta quizet"-knapp (från HTML)
let startBtn = document.querySelector("#start-btn");
//Vår div där vi skriver ut frågor och sedan svar.
let content = document.querySelector("#content");
//En array som kommer spara "Rätt!" eller "Fel!" beroede på användaren.
// Längden på denna kommer också förklara för vår huvudfunktion (som kör quizet) hur många frågor som redan är besvaradde och därmed vilken fråga den ska presentera (eller om användaren är klar).
let answerArray = [];
let createQuizBtn = document.querySelector("#create-quiz-btn")

// Skapar variabler för listan där man väljer vilket quiz man vill köra samt skapar listan.
let selectContent = document.querySelector("#select-content");
let quizList = document.createElement("select");
let quizListLabel = document.createElement("label");
quizListLabel.setAttribute("for", "option-quiz");
quizListLabel.innerText = "Välj quiz: "
quizList.id = "option-quiz";
selectContent.append(quizListLabel, quizList);

// Funktion som skapar alernativ i listan med de olika quizen. Om du lägger till ett nytt quiz i arrayen så kommer koden kunna skapa ett till alternativ i listan.
allQuiz.forEach((quizNum, index) => {
    let option = document.createElement("option");
    option.value = allQuiz.indexOf(quizNum);
    option.innerText = allQuiz[index].name;
    quizList.append(option);
});

//Funktion för nattläge.
darkModeBtn.addEventListener("click", () => {
    if (!isDark) {
        document.body.style.background = "dimgray";
        document.querySelector("*").style.color = "white";
        isDark = true;
    }
    else {
        document.body.style.background = "white";
        document.querySelector("*").style.color = "black";
        isDark = false;
    }
});

// Funktion för "starta quiz"-knappen. Använder det quizet du valt i listan.
startBtn.addEventListener("click", () => {
    let i = document.querySelector("#option-quiz").value;
    //Raderar alla dina svar ifall du klickar på knappen så man kan börja om eller köra annat quiz.
    answerArray = [];
    //Tar bort allt innehåll från vår div där vi visar både frågor och svar.
    content.innerHTML = "";
    //Kör "huvudfunktionen" (quizet) beroende på vilket du valt.
    quizFunction(allQuiz[i].quiz);
});



//Funktionen som kör själva quizet.
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
            questionDiv.innerHTML = "";
            let rightWrong = [];
            let yourAnswer = [];
            let points = 0;
            answerArray.forEach((answer, index) => {
                let yourAnswerWithSpace = []
                answer.forEach((ans) => {
                    yourAnswerWithSpace.push(" " + ans)
                })
                yourAnswer.push("Ditt svar: " + yourAnswerWithSpace)
                if (answer.length === (arr[index].answer).length) {
                    let corrected = [];
                    (arr[index].answer).forEach((alt) => {
                        answer.forEach((alt2) => {
                            if (alt === alt2) {
                                corrected.push(alt2);
                            }
                        })
                    })
                    if (corrected.length === (arr[index].answer).length) {
                        points++;
                        rightWrong.push("Rätt!");
                    }
                    else {
                        rightWrong.push("Fel! " + arr[index].correctString);
                    }
                }
                else {
                    rightWrong.push("Fel! " + arr[index].correctString);                   
                }
                let answerDiv = document.createElement("div");
                answerDiv.style.border = "solid";
                let questionForUser = document.createElement("h3");
                questionForUser.innerText = arr[index].question;
                questionDiv.append(answerDiv, document.createElement("br"));
                answerDiv.append(questionForUser, yourAnswer[index], document.createElement("br"), rightWrong[index], document.createElement("br"));
            })
            let score = document.createElement("h2");
            let grade = "";
            if (points/arr.length<0.5) {
                score.style.color = "red";
                grade = "Underkänt."
            }
            else if (points/arr.length<=0.75) {
                score.style.color = "orange";
                grade = "Godkänt."
            }
            else {
                score.style.color = "green";
                grade = "Mycket väl godkänt."
            }
            score.innerHTML = ("" + points + "/" + arr.length + " möjliga poäng! "+ grade)
            
            questionDiv.prepend(score);
        })
        questionDiv.append(resultBtn);
    }
    //...annars.
    else {
        let questionForUser = document.createElement("h2");
        questionForUser.innerText = arr[answerArray.length].question;
        questionDiv.append(questionForUser);
        
        (arr[answerArray.length].alternative).forEach((alt) => {
            let alternative = document.createElement("input");
            if (arr[answerArray.length].type === "oneAlternative") {
                alternative.setAttribute("type", "radio");
            }
            else {
                alternative.setAttribute("type", "checkbox");
            };
            alternative.setAttribute("name", "alternative-check");
            alternative.setAttribute("value", alt);
            alternative.id = alt;
            let altLabel = document.createElement("label");
            altLabel.setAttribute("for", alt);
            altLabel.innerHTML = alt + ":";
            questionDiv.append(altLabel, alternative, document.createElement("br"));
        });
        questionDiv.append(document.createElement("br"));
        if (answerArray.length !== 0){
            let previousBtn = document.createElement("button");
            previousBtn.innerText = "Tillbaka";
            previousBtn.addEventListener ("click", () => {
                answerArray.pop();
                content.innerHTML = "";
                quizFunction(arr);
            })
            questionDiv.append(previousBtn);
        }
        let answerBtn = document.createElement("button");
        answerBtn.innerText = "Svara";
        answerBtn.addEventListener ("click", () => {
            if (document.querySelector("[name='alternative-check']:checked")) {
                let allAnswers = [];
                (document.querySelectorAll("[name='alternative-check']:checked")).forEach((obj) => {
                    allAnswers.push(obj.value);
                });
                answerArray.push(allAnswers);
                content.innerHTML = "";
                quizFunction(arr);

            }
            else {
                alert("Vänligen klicka i minst ett alternativ!");
            };
        })
        questionDiv.append(answerBtn);
    }
}

let ownQuizName = "";

createQuizBtn.addEventListener("click", () => {
    content.innerHTML = "";
    ownQuizName = "";
    createQuizFunction();
});

let createQuizFunction = () => {
    let nameInput = document.createElement("input");
    let nameInputLabel = document.createElement("label");
    nameInputLabel.setAttribute("for", "name-input");
    nameInputLabel.innerText = "Välj namn på ditt quiz: "
    nameInput.id = "name-input";
    createDiv = document.createElement("div");
    let addQuestionBtn = document.createElement("button");
    addQuestionBtn.innerText = "Lägg till en fråga!";
    addQuestionBtn.addEventListener("click", () => {
        ownQuizName = nameInput.value;
        content.innerHTML = "";
        addQuestionFunction();
    })
    content.append(createDiv);
    createDiv.append(document.createElement("br"), nameInputLabel, nameInput, document.createElement("br"), document.createElement("br"), addQuestionBtn);
}

let questionsArray = [];

let addQuestionFunction = () => {
    let questionInput = document.createElement("input");
    let questionInputLabel = document.createElement("label");
    questionInputLabel.setAttribute("for", "question-input");
    questionInputLabel.innerText = "Skriv fråga: "
    questionInput.id = "question-input";
    let answerStringInput = document.createElement("input");
    let answerStringInputLabel = document.createElement("label");
    answerStringInputLabel.setAttribute("for", "answer-string-input");
    answerStringInputLabel.innerText = "Skriv svar på frågan (som String): "
    answerStringInput.id = "answer-string-input";
    let quizName = document.createElement("h2");
    quizName.innerText = "Namn på quiz: " + ownQuizName;

    let typeOfQuestionSelect = document.createElement("select");
    let typeOfQuestionSelectLabel = document.createElement("label");
    typeOfQuestionSelectLabel.setAttribute("for", "option-question");
    typeOfQuestionSelectLabel.innerText = "Välj typ av fråga: "
    typeOfQuestionSelect.id = "option-question";
    let optionNotSelected = document.createElement("option");
    optionNotSelected.value = "not-selected";
    optionNotSelected.innerText = "Inget valt";
    let optionRadio = document.createElement("option");
    optionRadio.value = "oneAlternative";
    optionRadio.innerText = "Ensvarsfråga";
    let optionCheckbox = document.createElement("option");
    optionCheckbox.value = "multipleAlternative";
    optionCheckbox.innerText = "Flersvarsfråga"
    typeOfQuestionSelect.append(optionNotSelected, optionRadio, optionCheckbox);

    
    let alternativeDiv = document.createElement("div");
    
    typeOfQuestionSelect.addEventListener("change", () => {
        alternativeDiv.innerHTML = "";
        if (typeOfQuestionSelect.value !== "not-selected") {
            let newAlternative = document.createElement("button");
            newAlternative.innerText = "Lägg till ett svarsalternativ";
            newAlternative.addEventListener("click", () => {
                let correctCheck = document.createElement("input");
                if (typeOfQuestionSelect.value === "oneAlternative") {
                    correctCheck.setAttribute("type", "radio");
                }
                else if (typeOfQuestionSelect.value === "multipleAlternative") {
                    correctCheck.setAttribute("type", "checkbox");
                };
                correctCheck.setAttribute("name", "correct-check");
                correctCheck.id = ("correct-check-" + ((document.querySelectorAll("[name='correct-check']").length)))
                let correctCheckLabel = document.createElement("label");
                correctCheckLabel.setAttribute("for", ("correct-check-" + ((document.querySelectorAll("[name='correct-check']").length))));
                correctCheckLabel.innerText = "Kryssa om rätt: "
                let answerInput = document.createElement("input");
                answerInput.setAttribute("name", "alternative");
                answerInput.id = ("alternative-" + ((document.querySelectorAll("[name='alternative']").length)))
                alternativeDiv.append(correctCheckLabel, correctCheck, answerInput, document.createElement("br"));
            })
            alternativeDiv.append(newAlternative, document.createElement("br"));
        }
    })
    let questionObject = {};
    let questionString = "";
    let correctString = "";
    let questionType = "";
    let alternativeArray = [];
    let correctAnswers = [];
    createDiv = document.createElement("div");
    let addQuestionBtn = document.createElement("button");
    addQuestionBtn.innerText = "Spara frågan och lägg till en till!";
    addQuestionBtn.addEventListener("click", () => {
        savequestionFunction();
        content.innerHTML = "";
        addQuestionFunction();
    })
    let saveQuizBtn = document.createElement("button");
    saveQuizBtn.innerText = "Spara frågan, avsluta och spara quiz!";
    saveQuizBtn.addEventListener("click", () => {
        savequestionFunction();
        let newQuiz = {};
        newQuiz.name = ownQuizName;
        newQuiz.quiz = questionsArray;
        allQuiz.push(newQuiz);
        newQuiz = {};
        questionsArray = [];
        ownQuizName = "";
        content.innerHTML = "";
    })
    let savequestionFunction = () => {
        questionString = questionInput.value;
        questionType = typeOfQuestionSelect.value;
        correctString = answerStringInput.value;
        (document.querySelectorAll("[name='alternative']")).forEach((alt) => {
            alternativeArray.push(alt.value);
        })
        let checks = (document.querySelectorAll("[name='correct-check']"));
        checks.forEach((check, index) => {
            if (check.checked){
                correctAnswers.push((document.querySelectorAll("[name='alternative']"))[index].value)
            }
        })
        questionObject.question = questionString;
        questionObject.type = questionType;
        questionObject.alternative = alternativeArray;
        questionObject.answer = correctAnswers;
        questionObject.correctString = correctString;
        questionsArray.push(questionObject);
        console.log(questionsArray);
    }
    
    content.append(createDiv);
    createDiv.append(quizName, typeOfQuestionSelect, questionInputLabel, questionInput,document.createElement("br"), document.createElement("br"), typeOfQuestionSelect, document.createElement("br"), document.createElement("br"), alternativeDiv, document.createElement("br"), document.createElement("br"), answerStringInputLabel, answerStringInput, document.createElement("br"), document.createElement("br"), addQuestionBtn, saveQuizBtn);
    
}