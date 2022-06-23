// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

document.addEventListener('DOMContentLoaded', () => {
    // function 
    (function () {
        const header = document.querySelector('.header');
        window.onscroll = () => {
            if (window.pageYOffset > 50) {
                header.classList.add('header_active');
            } else {
                header.classList.remove('header_active');
            }
        };
    }());

    //burger header
    (function () {
        const burgerItem = document.querySelector('.burger');
        const menu = document.querySelector('.header__nav');
        const menuCloseItem = document.querySelector('.header__nav-close');
        const menulinks = document.querySelectorAll('.header__menu-link')
        burgerItem.addEventListener('click', () => {
            menu.classList.add('header__nav_active');
        });
        menuCloseItem.addEventListener('click', () => {
            menu.classList.remove('header__nav_active');
        });
        if (window.innerWidth <= 767) {
            for (let i = 0; i < menulinks.length; i += 1) {
                menulinks[i].addEventListener('click', () => {
                    menu.classList.remove('header__nav_active');
                });
            }
        }
    }());

    //scroll to anchors
    (function () {

        const smoothScroll = function (targetEl, duration) {
            const headerElHeight = document.querySelector('.header').clientHeight;
            let target = document.querySelector(targetEl);
            let targetPossition = target.getBoundingClientRect().top - headerElHeight;
            let startPossition = window.pageYOffset;
            let startTime = null;

            const ease = function (t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            };

            const animation = function (currentTime) {
                if (startTime == null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPossition, targetPossition, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            };
            requestAnimationFrame(animation);
        };

        const scrollTo = function () {
            const links = document.querySelectorAll('.js-scroll');
            links.forEach(each => {
                each.addEventListener('click', function () {
                    const currentTarget = this.getAttribute('href');
                    smoothScroll(currentTarget, 1000);
                });
            });
        };
        scrollTo();
    }());

    // tabs
    var tabLinks = document.querySelectorAll(".tabs__item");
    var tabContent = document.querySelectorAll(".tabs__card");


    tabLinks.forEach(function (el) {
        el.addEventListener("click", openTabs);
    });


    function openTabs(el) {
        var btnTarget = el.currentTarget;
        var type = btnTarget.dataset.type;

        tabContent.forEach(function (el) {
            el.classList.remove("tabs__card_show");
        });

        tabLinks.forEach(function (el) {
            el.classList.remove("tabs__card_show");
        });

        document.querySelector("#" + type).classList.add("tabs__card_show");

        btnTarget.classList.add("active");
    }

    // theme
    const toggleSwitch = document.querySelector('.header__theme input[type="checkbox"]');

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }

    toggleSwitch.addEventListener('change', switchTheme, false);


    // modal window
    const myBtn = document.querySelector('#myButton');
    const closeBtn = document.querySelector('.modal__window-close');
    const modal = document.querySelector('.modal');

    function toggleModal() {
        if (modal.style.display === 'block') {
            modal.style.display = 'none';
        } else {
            modal.style.display = 'block';
        }
    }

    myBtn.addEventListener('click', toggleModal);
    closeBtn.addEventListener('click', toggleModal);

});