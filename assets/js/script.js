function toggleNav() {
    const navList = document.getElementById("navList");
    const hamburger = document.querySelector(".nav__hamburger");

    navList.classList.toggle("nav__list--open");
    hamburger.classList.toggle("nav__hamburger--open");
}