const MIN_STEP_TIMEOUT = 1000;
const DEFAULT_START_VALUE = 500;
const STATISTICS_CHANGE_RATE = 30;

const CRYPTO = window.crypto || window.msCrypto;

const scrollToElement = (targetId) => {
    const element = document.getElementById(targetId);
    element.scrollIntoView({
        behavior: "smooth", 
        block: "center"
    });
};

const animateStatisticValue = (elementId, startVal, stepTimeoutMs) => { // анімація зміни статистики
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

const doStatisticValueUpdate = (targetElement) => () => {
    const array = new Uint32Array(1);
    CRYPTO.getRandomValues(array);
    const generatedIncrement = Math.ceil(Math.abs(array[0]) % STATISTICS_CHANGE_RATE);

    const newValue = +targetElement.innerHTML + generatedIncrement;
    targetElement.innerHTML = newValue;
};

window.onload = () => {
    setTimeout(() => animateStatisticValue("count1", 893, 3000), 800);
    setTimeout(() => animateStatisticValue("count2", 674, 3000), 2000);
    setTimeout(() => animateStatisticValue("count3", 2748, 3000), 3300);
};
