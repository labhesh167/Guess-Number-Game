document.addEventListener('DOMContentLoaded', () => {
    const guessInput = document.getElementById('guessInput');
    const checkButton = document.getElementById('checkButton');
    const resetButton = document.getElementById('resetButton'); 
    const feedbackElement = document.getElementById('feedback');
    const attemptsSpan = document.getElementById('attempts');

    let randomNumber;
    let attempts;
    const maxAttempts = 10;
    let isGameOver = false;

    function initializeGame() {
        randomNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        isGameOver = false;
        
        attemptsSpan.textContent = attempts;
        feedbackElement.textContent = '';
        feedbackElement.className = 'message';
        guessInput.value = '';
        guessInput.disabled = false;
        
        checkButton.textContent = 'Submit';
        checkButton.style.backgroundColor = '#00BCD4';
        checkButton.removeEventListener('click', initializeGame);
        checkButton.addEventListener('click', handleButtonClick);
        console.log('New game started. Random number:', randomNumber);
    }

    function checkGuess() {
        const userGuess = parseInt(guessInput.value);

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            feedbackElement.textContent = 'Please enter a valid number between 1 and 100.';
            feedbackElement.className = 'message';
            return;
        }

        attempts++;
        attemptsSpan.textContent = attempts;

        feedbackElement.className = 'message';

        if (userGuess === randomNumber) {
            feedbackElement.textContent = `Correct! The number was ${randomNumber}. You guessed it in ${attempts} attempts.`;
            feedbackElement.classList.add('correct');
            endGame(true);
        } else if (userGuess < randomNumber) {
            feedbackElement.textContent = 'Too low';
            feedbackElement.classList.add('too-low');
        } else {
            feedbackElement.textContent = 'Too high';
            feedbackElement.classList.add('too-high');
        }

        if (attempts >= maxAttempts && userGuess !== randomNumber) {
            feedbackElement.textContent += ` Game Over! The number was ${randomNumber}.`;
            endGame(false);
        }
    }

    function endGame(isWin) {
        isGameOver = true;
        guessInput.disabled = true;

        checkButton.textContent = 'Play Again';
        checkButton.style.backgroundColor = '#607D8B';
        
      
        checkButton.removeEventListener('click', handleButtonClick);
        checkButton.addEventListener('click', initializeGame);
    }

    function handleButtonClick() {
        if (!isGameOver) {
            checkGuess();
        } else {
            initializeGame();
        }
    }
    checkButton.addEventListener('click', handleButtonClick);
    guessInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !isGameOver) { 
            checkGuess();
        } else if (event.key === 'Enter' && isGameOver) { 
            initializeGame();
        }
    });
     resetButton.addEventListener('click', initializeGame); 

    initializeGame();
});