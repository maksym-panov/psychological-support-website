/**
 *
 * Common constants and utils
 *
 */
const MIN_STEP_TIMEOUT = 1000;
const DEFAULT_START_VALUE = 500;
const STATISTICS_CHANGE_RATE = 30;
const PX_MULTIPLIER = 440;

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

  targetElement.innerHTML = +targetElement.innerHTML + generatedIncrement;
};

/**
 *
 * Unconditional execution of statistics update
 *
 */
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
  let buttonCenterX = element.getBoundingClientRect().left;

  if (element.previousElementSibling.clientHeight === 170) {
    siblingStyle.height = 'auto';
    siblingStyle.width = '800px';

    parentStyle.height = 'auto';
    parentStyle.width = '840px';
    parentStyle.zIndex = '2';

    if (buttonCenterX > 1000) {
      parentStyle.transform = 'translateX(-440px)';
      element.style.transform = 'translateX(666px)';
    }

    element.innerHTML = 'Закрити';
  } else {
    siblingStyle.height = '170px';
    siblingStyle.width = '350px';

    parentStyle.height = '351px';
    parentStyle.width = '400px';
    parentStyle.zIndex = '0';

    if (buttonCenterX > 1000) {
      parentStyle.transform = 'translateX(0px)';
      element.style.transform = 'translateX(0px)';
    }

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

  const wrapper_review = document.querySelector('.wrapper_review');
  const reviews = document.querySelectorAll('.review');
  const reviewsLen = reviews.length;
  const prev_reviewBtn = document.querySelector('.prev_review');
  const prev_reviewBtnStyle = prev_reviewBtn.style;
  const next_reviewBtn = document.querySelector('.next_review');
  const next_reviewBtnStyle = next_reviewBtn.style;

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

  const wrapper_reviewTransformUpdate = updateTransform(wrapper_review);
  prev_reviewBtnStyle.display = 'none';

  let reviewIndex = 0;

  prev_reviewBtn.addEventListener('click', () => {
    reviewIndex = Math.max(reviewIndex - 1, 0);
    wrapper_reviewTransformUpdate(reviewIndex);

    next_reviewBtnStyle.display = 'block';
    if (reviewIndex === 0) {
      prev_reviewBtnStyle.display = 'none';
    }
  });

  next_reviewBtn.addEventListener('click', () => {
    reviewIndex = Math.min(reviewIndex + 1, reviewsLen - 3);
    wrapper_reviewTransformUpdate(reviewIndex);

    prev_reviewBtnStyle.display = 'block';
    if (reviewIndex === reviewsLen - 3) {
      next_reviewBtnStyle.display = 'none';
    }
  });

});

/**
* Gets all FAQ items and sets event handlers for the FAQ toggle buttons.
* Defines logic that changes the visibility of the FAQ content depending on the current state of the switch.
*/

const faqItems = document.querySelectorAll('.faq-item');
const faqContents = document.querySelectorAll('.faq-content');

faqItems.forEach((item, index) => {
  const toggleButton = item.querySelector('.faq-toggle');
  const faqContent = faqContents[index];

  toggleButton.addEventListener('click', () => {
    item.classList.toggle('active');
    if (item.classList.contains('active')) {
      faqContent.style.transform = "scaleY(1)";
    } else {
      faqContent.style.transform = "scaleY(0)";
    }
  });
});