// ----- Door Selectors / Objects ----- //
// const doorOne = document.getElementById('door1');
// const doorTwo = document.getElementById('door2');
// const doorThree = document.getElementById('door3');
const doorsParent = document.querySelector('.door-wrapper');
const roboImage = 'assets/door-robo.svg';
const openDoor = 'assets/open-door.svg';
const botScore = document.querySelector('#bot-score');
const yourScore = document.querySelector('#your-score');
// let doors = doorsParent.children;
let doors = document.querySelectorAll('img');
let index;
// ------ Door Logic ------ //
const randGen = () => {
  index = Math.floor(Math.random() * 4);
  return index
}
let openedDoor = 0;
randGen();
const botGenerator = event => {
  event.stopPropagation();
  let target = event.target;
  if(target === doors[index] && openedDoor < 3) {
    target.src = roboImage;
    removeEvent();
    console.log('You lose! Game Over!');
    botScore.innerHTML++;
  }else {
    target.src = openDoor;
    openedDoor++;
  }
  while(openedDoor >= 3) {
    if(target === doors[index]){
      target.src = roboImage;
      console.log('You Win!');
      yourScore.innerHTML++;
      // setTimeout(playAgain, 10000);
    }
    break;
  }
}

doors.forEach(door => {
  door.addEventListener('click', botGenerator, {once: true});
});

//remove Event listener
const removeEvent = () => {
  doors.forEach(door => {
    door.removeEventListener('click', botGenerator);
  });
}


// ----- Play Again/Reset ----- //
let playAgainBtn = document.querySelector('.play-again');

const playAgain = () => {
  doors.forEach(door => {
    door.src = 'assets/door.svg';
    door.addEventListener('click', botGenerator);
  });
  randGen();
  openedDoor = 0;
}

playAgainBtn.addEventListener('click', playAgain);
