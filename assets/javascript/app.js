$(document).ready(function () {

    var answered = false;
    var intervalId;
    var userAnswer = '';
    var questionNumber;
    var correctAnswered = 0;
    var incorrectAnswered = 0;
    var unAnswered = 0;
    var selectedOption;
    var time;

    var triviaList = [{
        question: "For which of the following disciplines is Nobel Prize awarded?",
        options: ['Physics and Chemistry', 'Physiology or Medicine', 'Literature, Peace and Economics', 'All of the above'],
        answer: 3
    },
    {
        question: "Entomology is the science that studies",
        options: ['Behavior of human beings', 'Insects', 'The origin and history of technical and scientific terms', 'The formation of rocks'],
        answer: 1
    },
    {
        question: "Grand Central Terminal, Park Avenue, New York is the world's",
        options: ['largest railway station', 'highest railway station', 'longest railway station', 'None of the above'],
        answer: 0
    },
    {
        question: "Epsom (England) is the place associated with",
        options: ['Horse racing', 'Polo', 'Shooting', 'Snooker'],
        answer: 0
    },
    {
        question: "Galileo was an Italian astronomer who",
        options: ['developed the telescope', 'discovered four satellites of Jupiter', 'discovered that the movement of pendulum produces a regular time measurement', 'All of the above'],
        answer: 3
    },
    {
        question: "Exposure to sunlight helps a person improve his health because",
        options: ['the infrared light kills bacteria in the body', 'resistance power increases', 'the pigment cells in the skin get stimulated and produce a healthy tan', 'the ultraviolet rays convert skin oil into Vitamin D'],
        answer: 3
    },
    {
        question: "Golf player Vijay Singh belongs to which country?",
        options: ['USA', 'Fiji', 'India', 'UK'],
        answer: 1
    },
    {
        question: "First China War was fought between",
        options: ['China and Britain', 'China and France', 'China and Egypt', 'China and Greek'],
        answer: 0
    },
    {
        question: "Coral reefs in India can be found in",
        options: ['the coast of Orissa', 'Waltair', 'Rameshwaram', 'Trivandrum'],
        answer: 2
    },
    {
        question: "Headquarters of UNO are situated at",
        options: ['New York, USA', 'Hague (Netherlands)', 'Geneva', 'Paris'],
        answer: 0
    }
    ];

    $("#trivia").hide();
    $(".scoreBoard").hide();

    $("#start").click(function () {

        $(".welcome").hide();
        $("#trivia").show();
        start();
    });

    $("#startOver").click(function(){

        $(".welcome").hide();
        $(".scoreBoard").hide();
        $("#trivia").show();
        start();
    });

    function start(){
        questionNumber = 0;
        correctAnswered = 0;
        incorrectAnswered = 0;
        unAnswered = 0;
        answered = false;

        $(".current").empty();
        $("#question").empty();
        $("#options").empty();
        $("#result").empty();
        $("#answer").empty();

        showQuestion();
    }

    function showQuestion() {
        $("#trivia").show();
        $("#result").empty();
        $("#answer").empty();

        $(".current").html("You are on "+(questionNumber+1)+" out of "+triviaList.length+" questions.");
        $("#question").html("<h3>" + triviaList[questionNumber].question + "</h3>");
        for (var i = 0; i < 4; i++) {
            var options = $("<div>");
            options.attr('class','choice');
            options.attr('value', i);
            options.text(triviaList[questionNumber].options[i]);
            $("#options").append(options);
        }
        countdown();

        $(".choice").click(function(){
            answered = true;
            userAnswer = $(this).attr("value");
            clearInterval(time);
            answerCheck();
        });
    }

    function countdown(){
        seconds = 15;
        $(".timer").html("Time Remaining: " + seconds);
        time = setInterval(showCountdown, 1000);
        answered = true;
    }
    
    function showCountdown(){
        seconds--;
        $(".timer").html("Time Remaining: " + seconds);
        if(seconds < 1){
            clearInterval(time);
            answered = false;
            answerCheck();
        }
    }

    function answerCheck(){

        $(".timer").empty();
        $(".current").empty();
        $("#question").empty();
        $("#options").empty();
    
        var correctAnswer = triviaList[questionNumber].answer;
    
        if((userAnswer == correctAnswer) && (answered)){
            correctAnswered++;
            $(".welcome").hide();
            $("#trivia").hide();
            $("#result").show();
            $("#answer").show();
            $("#result").text("Correct! Good work! ")
            $("#answer").text("Correct Answer is: "+triviaList[questionNumber].options[correctAnswer]);
        }
        else if((userAnswer != correctAnswer) && (answered)){
            incorrectAnswered++;
            $(".welcome").hide();
            $("#trivia").hide();
            $("#result").show();
            $("#answer").show();
            $("#result").text("Oops! You are wrong!")
            $("#answer").text("Correct Answer is: "+triviaList[questionNumber].options[correctAnswer]);
        }
        else{
            unAnswered++;
            $(".welcome").hide();
            $("#trivia").hide();
            $("#result").show();
            $("#answer").show();
            $("#result").text("Times Up!")
            $("#answer").text("Correct Answer is: "+triviaList[questionNumber].options[correctAnswer]);
            answered = true;
        }
        if(questionNumber == (triviaList.length-1)){
            setTimeout(showScore, 1500);
        }
        else {
            questionNumber++;
            setTimeout(showQuestion, 1500);
        }
    }
    
    
    function showScore()
    {
        $(".welcome").hide();
        $("#trivia").hide();
        $("#result").hide();
        $("#answer").hide();

        $(".timer").empty();
        // $(".current").empty();
        // $("#question").empty();
        // $("#options").empty();
        $("#result").empty();
        $("#answer").empty();

        $("#correct").text("Correct Answers: "+ correctAnswered);
        $("#inCorrect").text("Incorrect Answers: "+incorrectAnswered);
        $("#unAnswered").text("Un answered Questions: "+unAnswered);
        $(".scoreBoard").show();
    }

});