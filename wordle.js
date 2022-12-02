let row = 0;
let cursor = [];
let absent = [];
let correct = 0;
let gameOver = false;
let attempt = 10;

window.onload = function () {
  intialize();
};

var guesslist = [
  "hello",
  "welcome",
  "orange",
  "hockey",
  "cat",
  "cake",
  "pizza",
  "elephant",
  "Dog",
];

var word =
  guesslist[Math.floor(Math.random() * guesslist.length)].toUpperCase();
console.log(word); // Random word generated from array guesslist

//initialize function is called when page is loaded
function intialize() {
  //Initialize Cursor
  for (let i = 0; i < word.length; i++) {
    cursor.push(i);
  }
  console.log("Cusor: " + cursor);

  document.getElementById("letterCount").innerHTML =
    "Letter count : " + word.length;

  for (let c = 0; c < word.length; c++) {
    let tile = document.createElement("span");
    tile.id = c.toString();
    tile.classList.add("tile");
    tile.innerText = "";
    document.getElementById("inboard").appendChild(tile);
  }

  document.addEventListener("keyup", (e) => {
    processInput(e);
  });
}

//Function to process user inputs
function processInput(e) {
  if (gameOver) return;

  if ("KeyA" <= e.code && e.code <= "KeyZ") {
    if (cursor[row] < word.length) {
      let currTile = document.getElementById(cursor[row].toString());
      if (currTile.innerHTML == "") {
        currTile.innerHTML = e.code[3];
      }
      row += 1;
    }
  } else if (e.code == "Backspace") {
    if (cursor[0] <= row && row <= cursor.length) {
      row -= 1;
      let currTile = document.getElementById(cursor[row].toString());
      currTile.innerText = "";
    }
  } else if (e.code == "Enter") {
    update();
  }
}

//Validated user guessed word
function update() {
  attempt -= 1;
  cursor = [];

  for (let c = 0; c < word.length; c++) {
    let currTile = document.getElementById(c.toString());
    let letter = currTile.innerText;

    if (word[c] == letter) {
      currTile.classList.add("correct");
      correct += 1;
    } else if (!word.includes(letter)) {
      if (!absent.includes(letter)) {
        absent.push(letter);
      }
      cursor.push(c);
      currTile.innerHTML = "";
    } else {
      currTile.innerHTML = "";
      cursor.push(c);
    }

    document.getElementById("wrong").innerHTML = absent;
    document.getElementById("attempt").innerHTML = attempt;

    if (correct == word.length) {
      document.getElementById("message").innerHTML = "You Win";
      document.getElementById("body").style.backgroundColor = "SpringGreen";
      gameOver = true;
    }
    if (attempt == 0 && correct != word.length) {
      document.getElementById("message").innerHTML =
        "You Lost!! (Click reset to try again)";
      document.getElementById("body").style.backgroundColor = "red";
      gameOver = true;
    }
  }
  console.log("cusor:" + cursor);
  row = 0;
  correct = 0;
}
