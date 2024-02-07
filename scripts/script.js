/**
 *
 * Common constants and utils
 *
 */
const MIN_STEP_TIMEOUT = 1000;
const DEFAULT_START_VALUE = 500;
const STATISTICS_CHANGE_RATE = 30;
const PX_MULTIPLIER = 550;

const CRYPTO = window.crypto || window.msCrypto;

/**
 *
 * Scrolls viewport to the selected DOM element ID.
 *
 * @param targetId HTML-id of target DOM element
 */
const scrollToElement = (targetId) => {
  const element = document.getElementById(targetId);
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
};

/**
 * Adds random positive value based on STATISTICS_CHANGE_RATE
 * to the provided statistic and sets new value as innerHTML property
 * of DOM element with provided ID every stepTimeoutMs milliseconds
 *
 * @param elementId HTML-id of target DOM element
 * @param startVal incremented statistic at the beginning
 * @param stepTimeoutMs increment timeout
 */
const animateStatisticValue = (elementId, startVal, stepTimeoutMs) => {
  if (startVal < 0) {
    startVal = DEFAULT_START_VALUE;
  }

  if (stepTimeoutMs < MIN_STEP_TIMEOUT) {
    stepTimeoutMs = MIN_STEP_TIMEOUT;
  }

  const targetElement = document.getElementById(elementId);
  targetElement.innerHTML = startVal;

  setInterval(doStatisticValueUpdate(targetElement), stepTimeoutMs);
};

/**
 *
 * Retrieves current statistic value from provided DOM
 * element, adds randomly generated positive number to it
 * and sets new value for the target element
 *
 * @param targetElement target DOM element object
 * @returns
 */
const doStatisticValueUpdate = (targetElement) => () => {
  const array = new Uint32Array(1);
  CRYPTO.getRandomValues(array);
  const generatedIncrement = Math.ceil(
    Math.abs(array[0]) % STATISTICS_CHANGE_RATE
  );

  const newValue = +targetElement.innerHTML + generatedIncrement;
  targetElement.innerHTML = newValue;
};

/**
 *
 * Changes state of Specialist's card:
 * - if it was closed: opens it
 * - otherwise: closes it
 *
 * @param element target 'Show more' button element object
 */
const showText = (element) => {
  const parentStyle = element.parentElement.style;
  const sibling = element.previousElementSibling;
  const siblingStyle = sibling.style;

  if (element.previousElementSibling.clientHeight === 200) {
    siblingStyle.height = 'auto';
    siblingStyle.width = '1000px';

    parentStyle.height = 'auto';
    parentStyle.width = '1000px';
    parentStyle.zIndex = '2';

    element.innerHTML = 'Закрити';
  } else {
    siblingStyle.height = '200px';
    siblingStyle.width = '500px';

    parentStyle.height = '438px';
    parentStyle.width = '500px';
    parentStyle.zIndex = '0';

    element.innerHTML = 'Деталі';
  }
};

/**
 *
 * Horizontally moves provided target element, depending
 * on index of position, where this element should be
 *
 * @param targetElement DOM element that should be translated
 * @returns
 */
const updateTransform = (targetElement) => (index) => {
  console.log(index * PX_MULTIPLIER);
  targetElement.style.transform = `translateX(-${index * PX_MULTIPLIER}px)`;
};

/**
 *
 * Unconditional execution of statistics update
 *
 */
window.onload = () => {
  setTimeout(() => animateStatisticValue('count1', 893, 3000), 800);
  setTimeout(() => animateStatisticValue('count2', 674, 3000), 2000);
  setTimeout(() => animateStatisticValue('count3', 2748, 3000), 3300);
};

/**
 *
 * Sets event listeners for Specialists' block 'Next' and 'Previous' buttons
 * and defines logic that moves cards with information about specialists
 * and controles visibility of these buttons depending on current cards' positioning
 *
 */
document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.wrapper');
  const items = document.querySelectorAll('.item');
  const itemsLen = items.length;
  const prevBtn = document.querySelector('.prev');
  const prevBtnStyle = prevBtn.style;
  const nextBtn = document.querySelector('.next');
  const nextBtnStyle = nextBtn.style;
  const wrapperTransformUpdate = updateTransform(wrapper);

  let currentIndex = 0;
  prevBtnStyle.display = 'none';

  prevBtn.addEventListener('click', () => {
    currentIndex = Math.max(currentIndex - 1, 0);
    wrapperTransformUpdate(currentIndex);

    nextBtnStyle.display = 'block';
    if (currentIndex === 0) {
      prevBtnStyle.display = 'none';
    }
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = Math.min(currentIndex + 1, itemsLen - 3);
    wrapperTransformUpdate(currentIndex);

    prevBtnStyle.display = 'block';
    if (currentIndex === itemsLen - 3) {
      nextBtnStyle.display = 'none';
    }
  });
});
