const totalNumbers = 48;
const selectedNumbers = new Set();

// Create number elements dynamically
const numbersContainer = document.getElementById('numbers-container');
for (let i = 1; i <= totalNumbers; i++) {
    const numberElement = document.createElement('div');
    numberElement.classList.add('number');
    numberElement.textContent = i;
    numberElement.addEventListener('click', () => toggleNumber(numberElement, i));
    numbersContainer.appendChild(numberElement);
}

// Toggle selected numbers
function toggleNumber(element, number) {
    if (selectedNumbers.has(number)) {
        selectedNumbers.delete(number);
        element.classList.remove('selected');
    } else {
        if (selectedNumbers.size < 6) {
            selectedNumbers.add(number);
            element.classList.add('selected');
        } else {
            alert('You can only select 6 numbers.');
        }
    }
}
function generateResult() {
    const resultContainer = document.getElementById('result');
    const drawnNumbersContainer = document.getElementById('drawn-numbers');
    drawnNumbersContainer.innerHTML = '';

    const betAmount = parseFloat(document.getElementById('betAmount').value) || 0;
    if (betAmount <= 0) {
        alert('Please enter a valid bet amount.');
        return;
    }

    const resultNumbers = [];
    while (resultNumbers.length < 35) {
        const randomNumber = Math.floor(Math.random() * totalNumbers) + 1;
        if (!resultNumbers.includes(randomNumber)) {
            resultNumbers.push(randomNumber);
        }
    }

    let index = 0;
    const revealInterval = setInterval(() => {
        const currentNumber = resultNumbers[index];

        // Highlight the drawn number
        const numberElements = document.querySelectorAll('.number');
        numberElements.forEach((el) => {
            if (parseInt(el.textContent) === currentNumber) {
                el.classList.add('drawn');
            }
        });

        // Add the drawn number to the result container
        const drawnNumberElement = document.createElement('div');
        drawnNumberElement.classList.add('drawn-number');
        drawnNumberElement.textContent = currentNumber;
        drawnNumbersContainer.appendChild(drawnNumberElement);

        index++;

        if (index >= resultNumbers.length) {
            clearInterval(revealInterval);

            // After all numbers are revealed, check the user's result
            const correctGuesses = [...selectedNumbers].filter(number => resultNumbers.includes(number));
            const totalWinnings = calculateWinnings(correctGuesses, betAmount);

            setTimeout(() => {
                if (correctGuesses.length > 0) {
                    resultContainer.innerHTML = `
                        <h2>You Win!</h2>
                        <p>Correct Guesses: ${correctGuesses.length}</p>
                        <p>Your Numbers: ${[...selectedNumbers].join(', ')}</p>
                        <p>Drawn Numbers: ${resultNumbers.slice(0, 6).join(', ')}</p>
                        <p>Winnings: $${totalWinnings.toFixed(2)}</p>
                    `;
                } else {
                    resultContainer.innerHTML = `
                        <h2>You Lose</h2>
                        <p>Better luck next time!</p>
                        <p>Your Numbers: ${[...selectedNumbers].join(', ')}</p>
                        <p>Drawn Numbers: ${resultNumbers.slice(0, 6).join(', ')}</p>
                    `;
                }
            }, 1000); // Show result after a short delay
        }
    }, 500);
}

// Calculate winnings based on correct guesses and bet amount
function calculateWinnings(correctGuesses, betAmount) {
    const payouts = {
        1: 1.5,
        2: 5,
        3: 15,
        4: 50,
        5: 250,
        6: 1000
    };
    const numberOfCorrectGuesses = correctGuesses.length;
    return payouts[numberOfCorrectGuesses] ? payouts[numberOfCorrectGuesses] * betAmount : 0;
}
function resetGame() {
    // Step 1: Clear selected numbers set
    selectedNumbers.clear();

    // Step 2: Reset all number elements to their default state
    const numberElements = document.querySelectorAll('.number');
    numberElements.forEach((element) => {
        element.classList.remove('selected', 'drawn'); // Remove both classes
    });

    // Step 3: Clear the drawn numbers container if it exists
    const drawnNumbersContainer = document.getElementById('drawn-numbers');
    if (drawnNumbersContainer) {
        drawnNumbersContainer.innerHTML = '';
    } else {
        console.warn("drawn-numbers container not found.");
    }

    // Step 4: Reset the result container to its default state
    const resultContainer = document.getElementById('result');
    if (resultContainer) {
        resultContainer.innerHTML = `
            <h2>Drawn Numbers</h2>
            <div class="drawn-numbers" id="drawn-numbers"></div>
        `;
    } else {
        console.warn("Result container not found.");
    }

    // Step 5: Clear the bet amount input
    const betInput = document.getElementById('betAmount');
    if (betInput) {
        betInput.value = '';
    } else {
        console.warn("Bet amount input not found.");
    }

    // Step 6: Reset console or debugging logs
    console.log("Game has been reset successfully!");
}

document.addEventListener('DOMContentLoaded', () => {
    // Bind event listeners and ensure elements are ready
    const resetButton = document.getElementById('resetButton');
    if (resetButton) {
        resetButton.addEventListener('click', resetGame);
    }
});


