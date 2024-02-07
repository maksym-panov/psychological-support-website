function scrollToElement(targetId) {
    let element = document.getElementById(targetId);
    element.scrollIntoView({behavior: "smooth", block: "center"});
}

function animateValue(id, start, end, duration) { // анімація підрахунку
    let range = end - start;
    let minTimer = 50;
    let stepTime = Math.abs(Math.floor(duration / range));
    stepTime = Math.max(stepTime, minTimer);
    let startTime = new Date().getTime();
    let endTime = startTime + duration;
    let timer;

    function run() {
        let now = new Date().getTime();
        let remaining = Math.max((endTime - now) / duration, 0);
        let value = Math.round(end - (remaining * range));
        document.getElementById(id).innerHTML = value;
        if (value == end) {
            clearInterval(timer);
        }
    }

    timer = setInterval(run, stepTime);
    run();
}

window.onload = function() {
    animateValue("count1", 0, 893, 2000);
    animateValue("count2", 0, 674, 2000);
    animateValue("count3", 0, 2748, 2000);
};
