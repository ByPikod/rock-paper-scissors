// When document loaded
document.addEventListener("DOMContentLoaded", function(){
    
    var scene1 = document.querySelector(".choose");
    var scene2 = document.querySelector(".result");

    function playAgain(){

    }

    /**
    * Return who is the winner.
    * @param {string} player1 Player1 choosed
    * @param {string} player2 Player2 choosed
    * @returns {number} 0 = Draw, 1 = Player1, 2 = Player2
    */
    function compare(player1, player2){

        if(player1 == player2) 
            return 0; // nobody wins - draw
        else if(player1 == "rock" && player2 == "paper")
            return 1; // player1 won
        else if(player1 == "paper" && player2 == "rock")
            return 1; // player1 won
        else if(player1 == "scissors" && player2 == "paper")
            return 1; // player1 won
        else
            return 2; // player2 won

    }

    /**
     * Return the asset path by the choosen string.
     * @param {*} choosen 
     * @returns {string} Path
     * @throws Throws unexpected choosen if there's no matching choosen.
     */
    function getAssetByChoosen(choosen){

        switch(choosen){
            case "rock":
                return "assets/rock.svg";
            case "paper":
                return "assets/paper.svg";
            case "scissors":
                return "assets/scissors.svg";
            default:
                throw "Unexpected choosen: " + choosen;
        }

    }

    /**
     * Converts the number to a string.
     * 0 = rock,
     * 1 = paper,
     * 2 = scissors
     * @param {*} choosen Number to convert
     * @returns {string} rock, paper or scissors
     */
    function getChoosenByNumber(choosen){
        return (
            choosen == 0 ? "rock" :
            choosen == 1 ? "paper" : 
            "scissors"
        );
    }

    /**
     * Button click event
     */
    function choose(choosen){

        // Generate random number for computer to choose
        let aiChoosen = Math.floor(Math.random() * 3);
        aiChoosen = getChoosenByNumber(aiChoosen); // convert random number to a string.

        // Swap scene
        document.body.style.background = "white";
        scene1.style.opacity = '0';
        scene2.style.display = 'block';
        
        // Variable definitions to use in callbacks.
        let handElements = document.querySelectorAll(".hand");
        let handImgElements = document.querySelectorAll(".hand > img");
        let resultText = document.querySelector("#result-text");

        // last triggered callback. triggered after hand animaton finished.
        function handAnimationEnd() {

            handImgElements[0].removeEventListener("animationend", handAnimationEnd); // remove the listener

            // change the hand images.
            document.querySelector(".player.left > .hand > img").src = getAssetByChoosen(choosen); 
            document.querySelector(".player.right > .hand > img").src = getAssetByChoosen(aiChoosen);
            
            // get results.
            let results = compare(choosen, aiChoosen);

            // change the results text according to result.
            resultText.innerHTML = 
               results == 0 ? "Draw!" :
               results == 1 ? "Victory!" : "Defeat"
            
            resultText.style.color =
                results == 0 ? resultText.style.color :
                results == 1 ? "green" : "red"

        }

        // second triggered callback. triggered after scene2 appears.
        function scene2In(){
            // animate hand
            handElements.forEach( (value) => value.querySelector("img").style.animation = 'handanim 0.5s 3' );
            // wait for hand animaton to end and call last callback.
            handImgElements[0].addEventListener("animationend", handAnimationEnd);
            // remove second event listener.
            scene2.removeEventListener('transitionend', scene2In);
        }

        // first triggered callback. triggered after scene1 disappears.
        function scene1Out() {
            // swap scenes
            scene2.style.opacity = '1';
            scene1.style.display = 'none';

            // remove first even listener and wait for scene2 to appear then call second callback.
            document.removeEventListener('transitionend', scene1Out);
            scene2.addEventListener('transitionend', scene2In);
        }

        // wait for scene1 to disappear.
        document.addEventListener('transitionend', scene1Out);
    
    }

    // Get buttons
    var buttons = document.querySelectorAll(".buttons > button");
    buttons.forEach((button) => {
        // Add "onclick" event,
        // that calls choose function with the "pass" argument.
        button.onclick = () => choose(button.attributes["pass"].value);
    });

});