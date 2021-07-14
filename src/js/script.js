const burgerBtn = document.querySelector('.burger');
const burgerMenu = document.querySelector('.nav_menu');
burgerBtn.addEventListener('click', function() {
    this.classList.toggle('open-menu');
    burgerMenu.classList.toggle('active');
})