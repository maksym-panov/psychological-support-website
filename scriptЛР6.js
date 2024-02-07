function showText(el) { // функція показати текст відповідна до зразка з методичних рекомендацій
    if(el.previousElementSibling.clientHeight === 80){
    el.previousElementSibling.style.height = "100%"
    el.innerHTML = "Show Less...";
    } else {
    el.previousElementSibling.style.height = "80px"; 
    el.innerHTML = "Read More...";
    }
}

document.addEventListener("DOMContentLoaded",  () => { // функція спрацьовує при завантаження сторінки

    document.body.classList.add("light");     // встановлюємо світлу тему при завантаженні сторінки
    document.body.classList.remove("dark");   // та видаляємо темну тему при завантаженні сторінки

    var authorizedContainer = document.getElementById("authorizedContainer");   // отримуємо ІД елементу контейнеру, який містить підтвердження
    authorizedContainer.style.display = "none";                                 // авторизації, та відключаємо його відображення 

    var signInBtn = document.getElementById("signInBtn");       // отримуємо ІД кнопки "sign in"
    signInBtn.disabled = true;                                  // та відключаємо роботу цієї кнопки до подальших розпоряджень

    var loginInput = document.getElementById("login");          // отримуємо ІД елеметів логін 
    var passwordInput = document.getElementById("password");    // та пароль

    // Додати обробники подій для полів вводу/
    loginInput.addEventListener("input", checkInputs);          // перевіряємо чи заповнені поля логіну
    passwordInput.addEventListener("input", checkInputs);       // та паролю

    function checkInputs() {
        // перевірка, чи заповнені обидва поля
        if (loginInput.value.trim() !== "" && passwordInput.value.trim() !== "") {
            // активувати кнопку, якщо обидва поля заповнені
            signInBtn.disabled = false;
        } else {
            // заблокувати кнопку, якщо хоча б одне поле не заповнене
            signInBtn.disabled = true;
        }
    }

    var scrollToTopBtn = document.getElementById("scrollToTopBtn"); // отримуємо елемент "scrollToTopBtn" з HTML файлу у JavaScript
    scrollToTopBtn.style.display = "none";                          // вимикаємо відображення кнопки "вгору" при завантаженні сторінки

    // функція спрацьовує при прокрутці сторінки
    window.addEventListener("scroll", () => { 
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) { // якщо сторінку прокручено менше ніж на 20 пікселів
            scrollToTopBtn.style.display = "block";                                    // то кнопка "вгору" не показується          
        } else {                                                                       // якщо сторінку прокручено більше ніж на 20 пікселів             
            scrollToTopBtn.style.display = "none";                                     // то з`являється кнопка "вгору" 
        }
    });
});

function changeThemeFunction (){ // функція спарацьовує при натисканні кнопки
    var changeTheme = document.getElementById("changeTheme"); // отримуємо ІД кнопки
    if ( document.body.classList.contains("light")) {                                  // якщо встановлена світла тема
        document.body.classList.remove("light");                                       // видаляємо світлу тему
        document.body.classList.add("dark");                                           // та встановлюємо темну тему
        changeTheme.innerHTML = '<img class="day" src="img/sun.png" alt="light">';     // змінємо зображення на зображення світлої теми
    }else {                                                                            // в іншому випадку
        document.body.classList.add("light");                                          // встановлюємо світлу тему
        document.body.classList.remove("dark");                                        // та видаляємо темну тему
        changeTheme.innerHTML = '<img class="night" src="img/moon.png" alt="dark">';   // змінюємо зображення на зображення темної теми
    }
}

function signInFunction (){ // функція для кнопки "sign in"
    var authorizationContainer = document.getElementById("authorizationContainer"); // отримуємо ІД контейнеру авторизації
    var authorizedContainer = document.getElementById("authorizedContainer");       // отримуємо ІД контейнеру підтвердження авторизації
    var loginInput = document.getElementById("login");                              // отримуємо ІД логіну 
    var passwordInput = document.getElementById("password");                        // та паролю

    authorizationContainer.style.display = "none";            // ввідключаємо відображення контейнеру авторизації
    authorizedContainer.style.display = "flex";               // включаємо відображення контейнеру підтвердження авторизації

    document.getElementById("loginDisplayed").innerHTML = loginInput.value;         // отримуємо ІД елементу, який відображає вказаний логін,
                                                                                    // та задаємо значення логіну
    loginInput.value = "";                       // очищуємо поле логіну
    passwordInput.value = "";                    // очищуємо поле паролю

    event.preventDefault();                      // відключаємо оновлення сторінки після натискання кнопки "sign in"                                  
}

function exitFunction (){ // функція для кнопки "exit"
    var authorizationContainer = document.getElementById("authorizationContainer"); // отримуємо ІД контейнеру авторизації
    var authorizedContainer = document.getElementById("authorizedContainer");       // отриуємо ІД контейнеру підтвердження авторизації
   
    authorizationContainer.style.display = "flex";      // включаємо відображення контейнеру авторизації
    authorizedContainer.style.display = "none";         // ввідключаємо відображення контейнеру підтвердження авторизації                    

    signInBtn.disabled = true;        // відключаємо роботу цієї кнопки до подальших розпоряджень
}