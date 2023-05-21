const refs = {
  buttons: document.querySelector('.js-buttons__wrapper'),
  clock: document.querySelector('.js-clock'),
  clockItem: document.querySelector('.js-clock-items'),
};

const timeZone = (new Date().getTimezoneOffset() / 60) * -1;
console.log(timeZone);

refs.buttons.addEventListener('click', onbtnsClick);

function onbtnsClick(evt) {
  refs.clock.classList.remove('is-hidden');
  refs.buttons.querySelector('.js-show').classList.add('is-hidden');
  refs.buttons.querySelector('.js-hide').classList.remove('is-hidden');
  refs.buttons.querySelector('.js-change').classList.remove('is-hidden');
  startClock(refs.clockItem);
}

function startClock(rootSelector) {
  setInterval(() => {
    const currentTime = Date.now();

    const { hours, minutes, seconds } = getTimeComponents(currentTime);

    rootSelector.querySelector('.js-clock__hours').textContent = addPad(hours);
    rootSelector.querySelector('.js-clock__minutes').textContent =
      addPad(minutes);
    rootSelector.querySelector('.js-clock__seconds').textContent =
      addPad(seconds);
  }, 1000);
}

// Допоміжні функціій
function stopClock() {
  clearInterval(intervalId);
}

function getTimeComponents(time) {
  const hours = Math.floor((time / 1000 / 60 / 60) % 24) + timeZone;
  const minutes = Math.floor(time / 1000 / 60) % 60;
  const seconds = Math.floor(time / 1000) % 60;

  return {
    hours,
    minutes,
    seconds,
  };
}

function addPad(value) {
  return String(value).padStart(2, 0);
}
