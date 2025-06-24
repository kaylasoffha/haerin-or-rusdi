const board = document.getElementById('board');
const boxes = board.querySelectorAll('.square2');
const scoreDisplay = document.getElementById('score');
let score = 0;
let revealedCount = 0;
let zonkIndex = -1;

function initGame() {
  score = 0;
  revealedCount = 0;
  scoreDisplay.textContent = 'Skor: 0';
  zonkIndex = Math.floor(Math.random() * boxes.length);

  boxes.forEach(box => {
    box.classList.remove('flipped');
    const back = box.querySelector('.card-back');
    back.classList.remove('aman', 'zonk');
    box.onclick = () => revealBox(box, [...boxes].indexOf(box));
  });
}

function revealBox(box, index) {
  if (box.classList.contains('flipped')) return;

  box.classList.add('flipped');
  const back = box.querySelector('.card-back');

  if (index === zonkIndex) {
    back.classList.add('zonk');
    disableAll();

    setTimeout(() => {
      showModal('oh no, you match with Rusdi :P');
    }, 1500);
  } else {
    back.classList.add('aman');
    const point = Math.floor(Math.random() * 10 + 1);
    score += point;
    revealedCount++;
    scoreDisplay.textContent = `Skor: ${score}`;

    if (revealedCount === boxes.length - 1) {
      disableAll();
      setTimeout(() => {
        showModal('congratulations! you match with Haerin! >_<');
      }, 1500);
    }
  }
}

function disableAll() {
  boxes.forEach((box, index) => {
    if (!box.classList.contains('flipped')) {
      box.classList.add('flipped');
      const back = box.querySelector('.card-back');
      if (index === zonkIndex) {
        back.classList.add('zonk');
      } else {
        back.classList.add('aman');
      }
    }
  });
}

function showModal(message) {
  const modal = document.getElementById('resultModal');
  const msg = document.getElementById('resultMessage');
  msg.textContent = message;
  modal.style.display = 'block';
}

function resetGame() {
  const modal = document.getElementById('resultModal');
  modal.style.display = 'none';
  initGame();
}

window.onload = initGame;
