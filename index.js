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
                question: "Vilket land ligger inte i Europa?",
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
                question: "Markera alla länder som inte gränsar till något hav.",
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
            event.target.remove();
            answerForUser.remove();
            let points = 0;
            answerArray.forEach((answer, index) => {
                let correctAnswer = document.createElement("p");
                if (answer === "Rätt!") {
                    points++;
                }
                else {
                    correctAnswer.innerText = arr[index].correctString;
                }
                let questionForUser = document.createElement("h3");
                questionForUser.innerText = arr[index].question;
                questionDiv.append(questionForUser, answer, document.createElement("br"), correctAnswer);
            })
            let score = document.createElement("h2");
            let grade = "";
            if (points/arr.length<0.5) {
                score.style.color = "red";
                grade = "Underkänt."
            }
            else if (points/arr.length<=0.75) {
                score.style.color = "yellow";
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

        // Funktion för radio-frågor.
        if (arr[answerArray.length].type === "oneAlternative") {
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
