var quiz = {
const: NO_OF_HIGH_SCORES = 10,
const: HIGH_SCORES = 'highScores',
const: highScoreString = localStorage.getItem(HIGH_SCORES),
const: highScores = JSON.parse(highScoreString) ?? [],
const: lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0,

  data: [
  {
    q : "Where is the Javascript inserted in the HTML?",
    o : [
      "script tag",
      "head tag",
      "footer tag",
      "You dont"
    ],
    a : 0
  },
  {
    q : "What does Javascript do anyway?",
    o : [
      "Its just like HTML",
      "It is a video game",
      "It allows you to implement complex features to a web page",
      "It doesnt exist"
    ],
    a : 2
  },
  {
    q : "What is the mimimum amount of lines of code necessary to execute something in Javascript",
    o : [
      "25",
      "50",
      "75",
      "As many as you want!"
    ],
    a : 3
  },
  {
    q : "What is the relationship between HTML and Javascript?",
    o : [
      "They are the same",
      "HTML is the framework for Javascript to execute something",
      "HTML is a language and Javascript isn't",
      "Javascript and HTML don't have any relationship within coding"
    ],
    a : 1
  },
  {
    q : "Which of the following will write a message on the screen?",
    o : [
      "alert",
      "giveMeMessage",
      "sendPostcard",
      "codeMeAMessage"
    ],
    a : 0
  }
  ],

  hWrap: null, 
  hQn: null,
  hAns: null, 

  now: 0, 
  score: 0, 

  init: () => {
    quiz.hWrap = document.getElementById("quizWrap");

    quiz.hQn = document.createElement("div");
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);

    quiz.hAns = document.createElement("div");
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);

    quiz.draw();
  },
  draw: () => {
    quiz.hQn.innerHTML = quiz.data[quiz.now].q;

    quiz.hAns.innerHTML = "";
    for (let i in quiz.data[quiz.now].o) {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.id = "quizo" + i;
      quiz.hAns.appendChild(radio);
      let label = document.createElement("label");
      label.innerHTML = quiz.data[quiz.now].o[i];
      label.setAttribute("for", "quizo" + i);
      label.dataset.idx = i;
      label.addEventListener("click", () => { quiz.select(label); });
      quiz.hAns.appendChild(label);
    }
  },

  select: (option) => {
    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
      label.removeEventListener("click", quiz.select);
    }

    let correct = option.dataset.idx == quiz.data[quiz.now].a;
    if (correct) {
      quiz.score++;
      option.classList.add("correct");
    } else {
      option.classList.add("wrong");
    }

    quiz.now++;
    setTimeout(() => {
      if (quiz.now < quiz.data.length) { quiz.draw(); }
      else {
        quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
        quiz.hAns.innerHTML = "";
      }
    }, 1000);
  },

  reset : () => {
    quiz.now = 0;
    quiz.score = 0;
    quiz.draw();
  }
};
var score = 0;
var highscore = localStorage.getItem("highscore");

if(highscore !== null){
    if (score > highscore) {
        localStorage.setItem("highscore", score);      
    }
}
else{
    localStorage.setItem("highscore", score);
}
window.addEventListener("load", quiz.init);

var count = 60;
var interval = setInterval(function(){
  document.getElementById('count').innerHTML=count;
  count--;
  if (count === 0){
    clearInterval(interval);
    document.getElementById('count').innerHTML='Done';
    alert("Your time is up!");
  }
}, 2000);
