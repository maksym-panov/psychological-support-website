function scrollToElement(targetId) {
    let element = document.getElementById(targetId);
    element.scrollIntoView({behavior: "smooth", block: "center"});
}

function animateValue(id, start, end, duration) { // анімація підрахунку
    var range = end - start;
    var minTimer = 50;
    var stepTime = Math.abs(Math.floor(duration / range));
    stepTime = Math.max(stepTime, minTimer);
    var startTime = new Date().getTime();
    var endTime = startTime + duration;
    var timer;

    function run() {
        var now = new Date().getTime();
        var remaining = Math.max((endTime - now) / duration, 0);
        var value = Math.round(end - (remaining * range));
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
