let state = {
  board: [],
  currentGame: [],
  savedGames: [],
};

const isGameComplete = () => {
  return state.currentGame.length === 6;
};

const addNumberToGame = (numberToAdd) => {
  if (numberToAdd < 1 || numberToAdd > 60) {
    console.error(`O número ${numberToAdd} é invalido`);
    return;
  }
  if (isGameComplete()) {
    console.error("O jogo já está completo");
    return;
  }
  if (isNumberInGame(numberToAdd)) {
    console.error(`O número ${numberToAdd} já está no jogo`);
    return;
  }
  state.currentGame.push(numberToAdd);
};

const removeNumberFromGame = (numberToRemove) => {
  if (!isNumberInGame(numberToRemove)) {
    console.error(`O número ${numberToRemove} não está no jogo`);
    return;
  }
  let newGame = [];

  for (let i = 0; i < state.currentGame.length; i++) {
    let currentNumber = state.currentGame[i];

    if (currentNumber === numberToRemove) {
      continue;
    }
    newGame.push(currentNumber);
  }
  state.currentGame = newGame;
};

const isNumberInGame = (numberToCheck) => {
  return state.currentGame.includes(numberToCheck);
};

const saveGame = () => {
  if (state.currentGame.length === 6) {
    state.savedGames.push(state.currentGame);
    newGame();
    return;
  }
  console.error(
    `O jogo está incompleto, falta ${
      6 - Number(state.currentGame.length)
    } número para finaliza-lo`
  );
};

const resetGame = () => (state.currentGame = []);

const handleNumberClick = (event) => {
  let value = Number(event.currentTarget.textContent);

  if (isNumberInGame(value)) {
    removeNumberFromGame(value);
  } else {
    addNumberToGame(value);
  }
  render();
  console.log(state.currentGame);
};

const renderBoard = () => {
  let divBoard = document.querySelector("#megasena-board");
  divBoard.innerHTML = "";

  let ulNumbers = document.createElement("ul");
  ulNumbers.classList.add("numbers");

  for (let i = 0; i < state.board.length; i++) {
    let currentNumber = state.board[i];

    let liNumber = document.createElement("li");
    liNumber.textContent = currentNumber;

    liNumber.addEventListener("click", handleNumberClick);

    if (isNumberInGame(currentNumber)) {
      liNumber.classList.add("select_number");
    }

    liNumber.classList.add("number");

    ulNumbers.appendChild(liNumber);
  }

  divBoard.appendChild(ulNumbers);
};

const createNewGameButton = () => {
  let button = document.createElement("button");
  button.textContent = "Novo Jogo";

  button.addEventListener("click", newGame);

  return button;
};

const randomGame = () => {
  resetGame();

  while (!isGameComplete()) {
    let randomNumber = Math.ceil(Math.random() * 60);
    addNumberToGame(randomNumber);
  }
  render();
  console.log(state.currentGame);
};

const createRandomGameButton = () => {
  let button = document.createElement("button");
  button.textContent = "Jogo Aleatório";

  button.addEventListener("click", randomGame);

  return button;
};

const createSaveGameButton = () => {
  let button = document.createElement("button");
  button.textContent = "Salvar Jogo";

  button.addEventListener("click", saveGame);

  return button;
};

const renderButtons = () => {
  let divButtons = document.querySelector("#megasena-buttons");
  divButtons.innerHTML = "";

  let buttonNewGame = createNewGameButton();
  let buttonRandomGame = createRandomGameButton();
  let buttonSaveGame = createSaveGameButton();

  divButtons.appendChild(buttonNewGame);
  divButtons.appendChild(buttonRandomGame);

  isGameComplete() && divButtons.appendChild(buttonSaveGame);
};

const renderSavedGames = () => {
  let divSavedGames = document.querySelector("#megasena-saved-games");
  divSavedGames.innerHTML = "";

  if (state.savedGames.length === 0) {
    divSavedGames.innerHTML = "<p>Nenhum jogo salvo</p>";
  } else {
    let ulSavedGames = document.createElement("ul");

    for (let i = 0; i < state.savedGames.length; i++) {
      let currentGame = state.savedGames[i];

      let liGame = document.createElement("li");

      liGame.textContent = currentGame.join(" - ");

      ulSavedGames.appendChild(liGame);
    }
    divSavedGames.appendChild(ulSavedGames);
  }
};

const render = () => {
  renderBoard();
  renderButtons();
  renderSavedGames();
};
const newGame = () => {
  resetGame();
  render();
};

const createBord = () => {
  state.board = [];

  for (let i = 1; i <= 60; i++) {
    state.board.push(i);
  }
};

const start = () => {
  createBord();
  newGame();
};

start();
