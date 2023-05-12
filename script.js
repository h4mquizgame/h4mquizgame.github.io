location.href="https://h4mquizgame.rtnztech.com"

const questions = [
	{
		question: "Which nutrient is important for repairing and building muscle tissue after exercise?",
		answers: [
			{ text: "Fat", correct: false},
			{ text: "Carbohydrates", correct: false},
			{ text: "Protein", correct: true},
			{ text: "Sodium", correct: false},
		]
	},
	{
		question: "Which nutrient is important for providing long-lasting energy during a workout or competition?",
		answers: [
			{ text: "Carbohydrates", correct: true},
			{ text: "Protein", correct: false},
			{ text: "Fat", correct: false},
			{ text: "Vitamin C", correct: false},
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
		question: "What is the best pre-workout snack?",
		answers: [
			{ text: "A candy bar", correct: false},
			{ text: "A bag of chips", correct: false},
			{ text: "A banana", correct: true},
			{ text: "A slice of pizza", correct: false},
		]
	},
	{
		question: "Which of the following is NOT a benefit of exercise on mental health?",
		answers: [
			{ text: "Reduced anxiety and depression", correct: false},
			{ text: "Improved self-esteem", correct: false},
			{ text: "Enhanced cognitive function", correct: false},
			{ text: "Increased stress levels", correct: true},
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
	{
		question: "What is an important factor to consider when choosing the right sports equipment?",
		answers: [
			{ text: "The color of the equipment", correct: false},
			{ text: "the brand name", correct: false},
			{ text: "the price of the equipment", correct: false},
			{ text: "Proper fit and safety features", correct: true},
		]
	},
	{
		question: "What is an important step to take when returning to sports after an injury?",
		answers: [
			{ text: "Immediately resuming previous activity levels", correct: false},
			{ text: "Gradually increasing intensity and frequency of exercise", correct: true},
			{ text: "avoiding exercise altogether", correct: false},
			{ text: "not seeking medical attention", correct: false},
		]
	},
	{
		question: "Which of the following is an important step to take to prevent sports injuries caused by weather conditions?",
		answers: [
			{ text: "wearing clothing that is uncomfortable or ill-fitting", correct: false},
			{ text: "pushing through extreme weather conditions", correct: false},
			{ text: "Dressing appropriately for the weather and avoiding exercise during extreme weather conditions", correct: true},
			{ text: "Ignoring weather conditions", correct: false},
		]
	},
	{
		question: "What is an important factor to consider when mentally preparing for a sports competition?",
		answers: [
			{ text: "Visualizing success and maintaining a positive mindset", correct: true},
			{ text: "Focusing on potential failure", correct: false},
			{ text: "being overly critical of yourself", correct: false},
			{ text: "letting distractions consume your thoughts.", correct: false},
		]
	}
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
	questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

	currentQuestion.answers.sort(() => Math.random() - 0.5);

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
	if (score == 14){
		questionElement.innerHTML = `Perfect! You got ${score} out of ${questions.length}!`;
	}
	else if (score >= 7 && score < 14){
		questionElement.innerHTML = `Good Job! You got ${score} out of ${questions.length}!`;
	}
	else if (score >= 0 && score < 7){
		questionElement.innerHTML = `Better luck next time! You got ${score} out of ${questions.length}!`;
	}
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
