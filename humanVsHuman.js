console.log('Welcome to Tic-Tac-Toe \n'
+ 'To make your move please pick from 1 - 9 \n'
+ 'Example: \n \n'
+ '1 | 2 | 3 \n'
+ '--------- \n'
+ '4 | 5 | 6 \n'
+ '--------- \n'
+ '7 | 8 | 9 \n');

let winArr = [
              [1, 2, 3], [4, 5, 6],
              [7, 8, 9], [1, 4, 7],
              [2, 5, 8], [3, 6, 9],
              [1, 5, 9], [3, 5, 7]
            ];

let gameState = Array.apply(null, {length: 9})
                  .map((x) => ' ');

let letterChecker = (letter) =>
  gameState
    .map((value, index) =>
      (value === letter)
        ? index + 1
        : false)
    .filter((value) => value !== false);

let winChecker = (letter) =>
  winArr
    .map((array, index) =>
      array
        .map((value) =>
          ( letterChecker(letter).indexOf(value) !== -1  )
            ? 0
            : 1)
        .reduce((a, b) => a + b))
    .indexOf(0);

function logState() {
  console.log('\n'
    + `${gameState[0]} | ${gameState[1]} | ${gameState[2]} \n`
    + `--------- \n`
    + `${gameState[3]} | ${gameState[4]} | ${gameState[5]} \n`
    + `--------- \n`
    + `${gameState[6]} | ${gameState[7]} | ${gameState[8]} \n`);

}

function startGame(exOrOh) {
  console.log('May the odds be in your favor\n\n');
  console.log('It is your turn. You are :' + exOrOh);

  process.stdin
    .resume()
    .setEncoding('utf8')
    .once('data', (userInput) => {
      if ( (isNaN(parseFloat(userInput)) === false) && gameState[userInput - 1] === ' ') {
        gameState[userInput - 1] = exOrOh.toLowerCase();
        logState();

        if ( winChecker(exOrOh) !== -1) {
          console.log(`Congratzzz ${exOrOh.toUpperCase()}!!!! You win`);
          process.exit();
        } else if (gameState.indexOf(' ') === -1) {
          console.log('Sorry looks like we have a tie');
          process.exit();
        } else if (exOrOh.toLowerCase() === 'x') {
          startGame('o');
        } else {
          startGame('x');
        }

      } else {
        console.log(`\n \nOpps something went wrong. Please remember to enter a number 1 - 9. \n\nExample: ${Math.floor(Math.random() * 9)} \n\nNeed help? \nTry: ${gameState.indexOf(' ') + 1} \n\n`);
        startGame(exOrOh.toLowerCase());
      }
    })
}

startGame('x');
