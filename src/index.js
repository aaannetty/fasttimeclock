import refs from './js/helpers/refs';
import { getTimeComponents } from './js/helpers/getTimeComponents';
import { declensionNum } from './js/helpers/declensionNum';

import { addPad } from './js/helpers/addPad';
import localStorageApi from './js/localStorageAPI';

const { buttons, clock, clockItem } = refs;
let showAmPm = false;
let formatTime = false;
let intervalId = null;

buttons.addEventListener('click', onbtnsClick);

function onbtnsClick(evt) {
  if (evt.target.matches('.js-hide')) {
    onHideBtnClick();

    return;
  }

  if (evt.target.matches('.js-change')) {
    onChangeBtnClick();

    return;
  }

  onShowBtnClick();
}

function startClock(rootSelector) {
  intervalId = setInterval(() => {
    const currentTime = Date.now();

    let { hours, minutes, seconds } = getTimeComponents(currentTime);
    const timeZoneName = hours >= 12 ? 'PM' : 'AM';
    hours = formatTime ? hours % 12 : hours % 24;

    rootSelector.querySelector('.js-clock__hours').textContent = addPad(hours);

    rootSelector.querySelector('.js-clock__minutes').textContent =
      addPad(minutes);
    rootSelector.querySelector('.js-clock__seconds').textContent =
      addPad(seconds);
    rootSelector.querySelector('.js-clock__timezone').textContent = showAmPm
      ? timeZoneName
      : '';

    rootSelector.querySelector('.js-clock__hours').dataset.title =
      declensionNum(hours, ['година', 'години', 'годин']);
    rootSelector.querySelector('.js-clock__minutes').dataset.title =
      declensionNum(minutes, ['хвилина', 'хвилини', 'хвилин']);
    rootSelector.querySelector('.js-clock__seconds').dataset.title =
      declensionNum(seconds, ['секунда', 'секунди', 'секунд']);
  }, 1000);
}

// Допоміжні функціій
function onChangeBtnClick() {
  if (buttons.querySelector('.js-change').textContent.trim() === 'AM/PM') {
    showAmPm = true;
    formatTime = true;

    buttons.querySelector('.js-change').textContent = 'format 24h';
  } else {
    showAmPm = false;
    formatTime = false;
    buttons.querySelector('.js-change').textContent = 'AM/PM';
  }
}

function onHideBtnClick() {
  clock.classList.add('is-hidden');
  buttons.querySelector('.js-show').classList.remove('is-hidden');
  buttons.querySelector('.js-hide').classList.add('is-hidden');
  buttons.querySelector('.js-change').classList.add('is-hidden');
  stopClock();
  localStorageApi.save('show-clock', false);
}

function onShowBtnClick() {
  setTimeout(() => {
    clock.classList.remove('is-hidden');
    buttons.querySelector('.js-show').classList.add('is-hidden');
    buttons.querySelector('.js-hide').classList.remove('is-hidden');
    buttons.querySelector('.js-change').classList.remove('is-hidden');
  }, 1000);
  startClock(clockItem);
  localStorageApi.save('show-clock', true);
}

function stopClock() {
  clearInterval(intervalId);
}

if (localStorageApi.load('show-clock')) {
  buttons.querySelector('.js-show').classList.add('is-hidden');
  onShowBtnClick();
}
