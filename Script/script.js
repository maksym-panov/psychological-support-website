function scrollToElement(targetId) {
    let element = document.getElementById(targetId);
    element.scrollIntoView({behavior: "smooth", block: "center"});
}

document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.wrapper');
    const items = document.querySelectorAll('.item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;

    function updateTransform() {
        wrapper.style.transform = `translateX(-${currentIndex * 550}px)`;
    }

    nextBtn.addEventListener('click', function() {
        currentIndex = Math.min(currentIndex + 1, items.length - 3);
        updateTransform();
    });

    prevBtn.addEventListener('click', function() {
        currentIndex = Math.max(currentIndex - 1, 0);
        updateTransform();
    });

    updateTransform();
});


function showText(el) { 

    let item = el.parentElement;

    if(el.previousElementSibling.clientHeight === 200){
        
    el.previousElementSibling.style.height = "auto";
    el.previousElementSibling.style.width = "1000px";   

    item.style.height = "auto";
    item.style.width = "1000px";
    item.style.zIndex = "2"; 

    el.innerHTML = "Закрити";

    } else {

    el.previousElementSibling.style.height = "200px";
    el.previousElementSibling.style.width = "500px"; 

    item.style.height = "438px";
    item.style.width = "500px";
    item.style.zIndex = "0"; 

    el.innerHTML = "Деталі";
    }
}

