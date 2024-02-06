function scrollToElement(targetId) {
    let element = document.getElementById(targetId);
    element.scrollIntoView({behavior: "smooth", block: "center"});
}