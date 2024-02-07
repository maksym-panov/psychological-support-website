const MIN_STEP_TIMEOUT = 1000;
const DEFAULT_START_VALUE = 500;
const STATISTICS_CHANGE_RATE = 30;

const scrollToElement = (targetId) => {
    const element = document.getElementById(targetId);
    element.scrollIntoView({
        behavior: "smooth", 
        block: "center"
    });
};

const doStatisticValueUpdate = (targetElement) => () => {
    const newValue = Number(targetElement.innerHTML) + Math.ceil(Math.random() * 20);
    targetElement.innerHTML = newValue;
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

window.onload = () => {
    setTimeout(() => animateStatisticValue("count1", 893, 3000), 800);
    setTimeout(() => animateStatisticValue("count2", 674, 3000), 2700);
    setTimeout(() => animateStatisticValue("count3", 2748, 3000), 4300);
};
