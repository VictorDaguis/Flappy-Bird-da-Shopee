// Referência aos elementos do DOM
const form = document.getElementById('form');
const formContainer = document.getElementById('formContainer');
const gameContainer = document.getElementById('game');
const gameOverMessage = document.createElement('div');
let isGameRunning = false;

// Configurações para o "Game Over"
gameOverMessage.id = "gameOverMessage";
gameOverMessage.style.display = "none";
gameOverMessage.style.position = "absolute";
gameOverMessage.style.top = "70%";
gameOverMessage.style.left = "50%";
gameOverMessage.style.transform = "translate(-50%, -50%)";
gameOverMessage.style.textAlign = "center";
gameOverMessage.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
gameOverMessage.style.color = "white";
gameOverMessage.style.padding = "20px";
gameOverMessage.style.borderRadius = "8px";
gameOverMessage.style.zIndex = "10";

const restartButton = document.createElement('button');
restartButton.textContent = "Reiniciar Jogo";
restartButton.style.marginTop = "20px";
restartButton.style.padding = "10px 20px";
restartButton.style.border = "none";
restartButton.style.backgroundColor = "#00c3ff";
restartButton.style.color = "white";
restartButton.style.borderRadius = "8px";
restartButton.style.cursor = "pointer";

restartButton.addEventListener('click', function () {
    gameOverMessage.style.display = "none";
    startGame();
});

gameOverMessage.appendChild(restartButton);
document.body.appendChild(gameOverMessage);

// Evento de submissão do formulário
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    // Validações do formulário
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const passwordConfirmation = document.getElementById('password-confirmation').value;

    if (password !== passwordConfirmation) {
        alert('As senhas não coincidem!');
        return;
    }

    // Oculta o formulário e exibe o jogo
    formContainer.style.display = 'none';
    gameContainer.style.display = 'block';

    // Inicia o jogo
    startGame();
});

// Lógica do jogo
function startGame() {
    if (isGameRunning) return;
    isGameRunning = true;

    // Reinicia o estado do jogo
    const block = document.getElementById("block");
    const hole = document.getElementById("hole");
    const character = document.getElementById("character");

    character.style.top = "100px";
    let counter = 0;
    let jumping = 0;

    hole.addEventListener('animationiteration', () => {
        const random = -((Math.random() * 300) + 150);
        hole.style.top = random + "px";
        counter++;
    });

    const gameInterval = setInterval(function () {
        const characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if (jumping === 0) {
            character.style.top = (characterTop + 3) + "px";
        }
        const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
        const holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
        const cTop = -(500 - characterTop);

        if ((characterTop > 480) || ((blockLeft < 20) && (blockLeft > -50) && ((cTop < holeTop) || (cTop > holeTop + 130)))) {
            // Exibir mensagem de "Game Over"
            gameOverMessage.innerHTML = `Game Over. Score: ${counter - 1}`;
            gameOverMessage.appendChild(restartButton);
            gameOverMessage.style.display = "flex";

            clearInterval(gameInterval);
            isGameRunning = false; // Permite reiniciar o jogo
        }
    }, 10);

    window.jump = function () {
        if (isGameRunning) {
            jumping = 1;
            let jumpCount = 0;
            const jumpInterval = setInterval(function () {
                const characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
                if ((characterTop > 6) && (jumpCount < 15)) {
                    character.style.top = (characterTop - 5) + "px";
                }
                if (jumpCount > 20) {
                    clearInterval(jumpInterval);
                    jumping = 0;
                }
                jumpCount++;
            }, 10);
        }
    };
}

