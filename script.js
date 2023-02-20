// When document loaded
document.addEventListener("DOMContentLoaded", function(){
    
    var scene1 = document.querySelector(".choose");
    var scene2 = document.querySelector(".result");

    function playAgain(){

    }

    // Choose the option
    function choose(choosen){

        // Swap scene
        document.body.style.background = "white";
        scene1.style.opacity = '0';

        // secondly triggered
        function scene2In(){
            scene2.removeEventListener('transitionend', scene2In);
        }

        // first triggered
        function scene1Out() {
            scene2.style.opacity = '1';
            scene2.style.display = 'block';
            scene1.style.display = 'none';
            document.removeEventListener('transitionend', scene1Out);
            scene2.addEventListener('transitionend', scene2In);
        }

        document.addEventListener('transitionend', scene1Out);
    
        switch(choosen){
            case "rock":
                break;
            case "paper":
                break;
            case "scissors":
                break;
            default:
                throw "Unexpected Option Error (options: rock, paper, scissors)";
                break;
        }
    
    }

    // Get buttons
    var buttons = document.querySelectorAll(".buttons > button");
    buttons.forEach((button) => {
        // Add "onclick" event,
        // that calls choose function with the "pass" argument.
        button.onclick = () => choose(button.attributes["pass"].value);
    });

});