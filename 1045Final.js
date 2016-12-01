(function () {
    "use strict";
    var qtyRandomNumbers = 5,
        range = 20,
        numbers = [],
        question = [
            'Which is the highest number?',
            'Which is the lowest number?',
            'Which numbers are higher than ',
            'Which numbers are lower than ',
            'Which numbers are between '],
        choseQuestion,
        comparedNumber,
        qtyRightSpots,
        countToFinish,
        score = 0,
        level = ["easy", "intermediate", "hard"],
        levelCounter = 0;
    
    talk("Click on start button to begin playing!");
    document.getElementById("start").addEventListener("click",startGame);
    document.getElementById("numbers").addEventListener("click", verify);
    
    // Main procedure to the game works
    function startGame() {
        document.getElementById("numbers").addEventListener("click", verify);
        countToFinish = 0;
        zeroBackground();
        writeMessage("");
        levelAnaliser();
        populateNumbers();
        choseQuestion = randomNumbers(0, question.length);
        if (choseQuestion === 0 || choseQuestion === 1) {
            writeQuestion();
        } else {
            switch (choseQuestion) {
            case 2:
                isThereAnswer('higher');
                writeQuestion();
                break;
            case 3:
                isThereAnswer('lower');
                writeQuestion();
                break;
            case 4:
                isThereAnswer('between');
                writeQuestion();
                break;
            }
        }
    }
    //See if user change the level and do the procedures necessary if yes
    function levelAnaliser() {
        if ((score == 5) && (levelCounter < level.length - 1)) {
            score = 0;
            if (levelCounter < level.length - 1) {
                levelCounter++;
            }
            var message = "Gongratulations! You are now on " + level[levelCounter] + " level !!!";
            setTimeout( function() { writeMessage(""); },1500);
            
            writeMessage(message);
            paintStarsScore(5,"bottom");
        }
        if (levelCounter == 1) {
            range = 30;
            changeColors("#FDCFCF");
        } else if (levelCounter == 2) {
            range = 50;
            changeColors("#CAC97C");
        }
    }
    //Evaluate if there is a possible answer
    function isThereAnswer(tester) {
        var stop = false;
        qtyRightSpots = 0;
        if (tester === "higher") {
            comparedNumber = "";
            do {
                comparedNumber = randomNumbers(1, range);
                for (var i = 0; i < numbers.length; i++) {
                    if (comparedNumber < numbers[i]) {
                        stop = true;
                        qtyRightSpots++;
                    }
                }
            } while (stop === false);
        } else if (tester === "lower") {
            comparedNumber = "";
            do {
                comparedNumber = randomNumbers(1, range);
                for (var i = 0; i < numbers.length; i++) {
                    if (comparedNumber > numbers[i]) {
                        stop = true;
                        qtyRightSpots++;
                    }
                }
            } while (stop === false);
        } else {
            comparedNumber = [];
            compareNumbersBetween();
        }
    }
    //Count how many right numbers there are between the select randiom numbers
    function compareNumbersBetween() {
        var keepGoing = true;
        
        do {
            comparedNumber = [randomNumbers(1, range),randomNumbers(1, range)];
            if (comparedNumber[0] > comparedNumber[1]) {
                let temp = comparedNumber[0];
                comparedNumber[0] = comparedNumber[1];
                comparedNumber[1] = temp;
            }
            for (var i = 0; i < numbers.length; i++) { //PROBLEMA AQUI!!!!!!
                if ((comparedNumber[0] < numbers[i]) && (numbers[i] < comparedNumber[1])) { 
                    keepGoing = false;
                    qtyRightSpots++;
                }
            }
           
        } while (keepGoing);
    }
    //Select random numbers
    function randomNumbers(min,max) {
        return Math.floor(Math.random() * max) + min;
    }
    //Populate the HTML with random numbers
    function populateNumbers() {
        zeroBackground();
        numbers = [];
        for (let i = 0; i < qtyRandomNumbers; i++){
            let select = '';
            let stop = false;
            do {
               select = randomNumbers(1, range);
                if (numbers.indexOf(select) === -1) {
                    stop = true;
                }
            } while(stop === false);
            numbers.push(select);
            document.getElementById('numbers').children[i].innerHTML = '<div class="numberBoxDiv">' + numbers[i] +'</div>';
        }
    }
    //Select the chose question question
    function writeQuestion() {
        switch (choseQuestion) {
            case 0:
                document.getElementById('question').innerHTML = question[choseQuestion];
                talk(question[choseQuestion]);
                break;
            case 1:
                document.getElementById('question').innerHTML = question[choseQuestion];
                talk(question[choseQuestion]);
                break;
            case 2:
                document.getElementById('question').innerHTML = question[choseQuestion] + comparedNumber + "?";
                talk(question[choseQuestion] + comparedNumber + "?");
                break;
            case 3:
                document.getElementById('question').innerHTML = question[choseQuestion] + comparedNumber + "?";
                talk(question[choseQuestion] + comparedNumber + "?");
                break;
            case 4:    
                document.getElementById('question').innerHTML = question[choseQuestion] + comparedNumber[0] + " and " + comparedNumber[1] + " ?";
                talk(question[choseQuestion] + comparedNumber[0] + " and " + comparedNumber[1] + " ?");
                break;
        }
    }
    //Erase background style 
    function zeroBackground() {
        for (let i = 0; i < qtyRandomNumbers; i++) {
            document.getElementById('numbers').children[i].style.background = 'none';
        }
    }
    //Helping Function - Get the maximum of an array
    function getMaxOfArray(numArray) {
        return Math.max.apply(null, numArray);
    }
    //Helping Function - Get the minimum of an array
    function getMinOfArray(numArray) {
        return Math.min.apply(null, numArray);
    }
    //Get the value clicked by the user and verify if it's right or wrong
    function verify(ev) {
        if (ev.target.tagName === "DIV"){
            let htmlEventPointer = +ev.target.innerHTML;
            var finish = false;
            switch (choseQuestion) {
                case 0:
                    if (htmlEventPointer == getMaxOfArray(numbers)) {
                        ev.target.style.background = "lightgreen";
                        finish = true;
                    } else {
                        ev.target.style.background = "#FA6E6A";//"red";
                    }
                    break;
                case 1:
                    if (htmlEventPointer == getMinOfArray(numbers)) {
                        ev.target.style.background = "lightgreen";
                        finish = true;
                    } else {
                        ev.target.style.background = "#FA6E6A";
                    }
                    break;
                case 2:
                    if (htmlEventPointer > comparedNumber) {
                        ev.target.style.background = "lightgreen";
                        countToFinish++;
                    } else {
                        ev.target.style.background = "#FA6E6A";
                    }
                        if (countToFinish === qtyRightSpots) finish = true;
                    break;
                case 3:
                    if (htmlEventPointer < comparedNumber) {
                        ev.target.style.background = "lightgreen";
                        countToFinish++;
                        if (countToFinish === qtyRightSpots) finish = true;
                    } else {
                        ev.target.style.background = "#FA6E6A";
                    }
                    break;
                case 4:
                    if ((comparedNumber[0] < htmlEventPointer) && (htmlEventPointer < comparedNumber[1])) {
                        ev.target.style.background = "lightgreen";
                        countToFinish++;
                        if (countToFinish === qtyRightSpots) finish = true;
                    } else {
                        ev.target.style.background = "#FA6E6A";
                    }           
            }
            if (finish) {
                score++;
                paintStarsScore(score, "top");
                setTimeout(restartGame,50);
                }
        }
    }
    //Procedures necessary to restart a new game
    function restartGame(){
        document.getElementById("numbers").removeEventListener("click", verify);
        if (levelCounter === 0 && score ===1) {
            document.getElementById("start").value = "Next";
        }
        writeMessage("Well done!");
        document.getElementById("start").addEventListener("click",startProcedure);
    }
    //Display a message to the user if he's roght or when upgrade his level
    function writeMessage(message) {
        document.getElementById("messages").innerHTML = message;
        talk(message);
    }
    //Change the stars from gray to yellow
    function paintStarsScore(qty,where){
        for (var i = 0; i < qty; i++) {
            document.getElementById("starsDiv").children[i].style.backgroundPosition = where;
        }
    }

    function talk(textToTalk) {
        var msg = new SpeechSynthesisUtterance(textToTalk);
        var voices = window.speechSynthesis.getVoices();
        
        msg.voice = voices[10]; // Note: some voices don't support altering params
//        msg.voice = voices.filter(function(voice) { return voice.name == "Alice"; })[0];
        msg.default = false;
        msg.voiceURI = 'native';
        msg.volume = 1; // 0 to 1
        msg.rate = 1.1; // 0.1 to 10
        msg.pitch = 1; //0 to 2
        msg.lang = 'en-US';
        
        msg.onend = function(e) {
            console.log('Finished in ' + event.elapsedTime + ' seconds.');
        };
        
        msg = new SpeechSynthesisUtterance(textToTalk);
        msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Whisper'; })[0];
        speechSynthesis.speak(msg);
        
    }
    //change the wrapper backgound color when the player level up
    function changeColors(color){
        document.getElementById("wrapper").style.backgroundColor = color;
    }
})();
