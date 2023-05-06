const questions = [
	{
		question: "What is the most important piece of equipment for preventing head injuries in football?",
		answers: [
			{ text: "Mouthguard", correct: false},
			{ text: "Cleats", correct: false},
			{ text: "Helmet", correct: true},
			{ text: "Shoulder pads", correct: false},
		]
	},
	{
		question: "Which of the following is not a good way to prevent injuries in basketball?",
		answers: [
			{ text: "Playing with worn-out shoes", correct: true},
			{ text: "Stretching before playing", correct: false},
			{ text: "Using proper technique", correct: false},
			{ text: "Wearing ankle support", correct: false},
		]
	},
	{
		question: "What is the best way to prevent heat exhaustion during a long-distance run?",
		answers: [
			{ text: "Eating a heavy meal beforehand", correct: false},
			{ text: "Running during the hottest part of the day", correct: false},
			{ text: "Wearing heavy clothing", correct: false},
			{ text: "Staying hydrated", correct: true},
		]
	},
	{
		question: "What is the most important factor in preventing injuries in weightlifting?",
		answers: [
			{ text: "Lifting heavier weights", correct: false},
			{ text: "Proper form and technique", correct: true},
			{ text: "Ignoring pain or discomfort", correct: false},
			{ text: "Not using a spotter", correct: false},
		]
	},
	{
		question: "What is the most common type of injury in sports?",
		answers: [
			{ text: "Sprains and strains", correct: true},
			{ text: "Concussions", correct: false},
			{ text: "fractures", correct: false},
			{ text: "contusions", correct: false},
		]
	},
	{
		question: "Which of the following is the best way to prevent sports injuries",
		answers: [
			{ text: "Drinking energy drinks", correct: false},
			{ text: "wearing lucky socks", correct: false},
			{ text: "Proper warm-up and stretching", correct: true},
			{ text: "ignoring pain", correct: false},
		]
	},
	{
		question: "What is a common injury that can result from not wearing proper footwear?",
		answers: [
			{ text: "muscle cramp", correct: false},
			{ text: "broken finger", correct: false},
			{ text: "Head injury", correct: false},
			{ text: "Ankle sprain", correct: true},
		]
	},
	{
		question: "What is the recommended amount of time for rest and recovery after a sports injury?",
		answers: [
			{ text: "one month", correct: false},
			{ text: "one week", correct: false},
			{ text: "One hour", correct: false},
			{ text: " It depends on the injury and severity, but generally at least a few days", correct: true},
		]
	},
	{
		question: "What is the best way to cool down after a workout to prevent injury?",
		answers: [
			{ text: "Gentle stretching and a slow walk or jog", correct: true},
			{ text: "Jumping jacks", correct: false},
			{ text: "sitting down immediately", correct: false},
			{ text: "doing another intense workout", correct: false},
		]
	},
	{
		question: "Which of the following can be a sign of a serious sports injury that requires medical attention?",
		answers: [
			{ text: "A mild ache", correct: false},
			{ text: "Severe pain, swelling, or loss of function", correct: true},
			{ text: "a small bruise", correct: false},
			{ text: "feeling tired", correct: false},
		]
	},
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
	currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    questions.sort(() => Math.random() - 0.5); // shuffle questions randomly
    showQuestion();
}

function showQuestion(){
	resetState();
	let currentQuestion = questions[currentQuestionIndex];
	let questionNo = currentQuestionIndex + 1;
	questionElement.innerHTML = questionNo + ". " + currentQuestion.
	question;
	
	currentQuestion.answers.forEach(answer => {
		const button = document.createElement("button");
		button.innerHTML = answer.text;
		button.classList.add("btn");
		answerButtons.appendChild(button);
		if(answer.correct){
			button.dataset.correct = answer.correct;
		}
		button.addEventListener("click", selectAnswer);
	});
}



function resetState(){
	nextButton.style.display = "none";
	while(answerButtons.firstChild){
		answerButtons.removeChild(answerButtons.firstChild);
	}
}

function selectAnswer(e){
	const selectedBtn = e.target;
	const isCorrect = selectedBtn.dataset.correct === "true";
	if(isCorrect){
		selectedBtn.classList.add("correct");
		score++;
	}
	else{
		selectedBtn.classList.add("incorrect");
	}
	Array.from(answerButtons.children).forEach(button => {
		if(button.dataset.correct === "true"){
			button.classList.add("correct");
		}
		button.disabled = true;
	});
	nextButton.style.display = "block";
}


function showScore(){
	resetState();
	questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
	nextButton.innerHTML = "Play Again";
	nextButton.style.display = "block";
}

function handleNextButton(){
	currentQuestionIndex++;
	if(currentQuestionIndex < questions.length){
		showQuestion();
	}
	else{
		showScore();
	}
}

nextButton.addEventListener("click", ()=>{
	if(currentQuestionIndex < questions.length){
		handleNextButton();
	}
	else{
		startQuiz();
	}
	})

startQuiz();