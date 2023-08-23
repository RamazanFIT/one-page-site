window.addEventListener('DOMContentLoaded', function() {

    const menu = document.querySelector('.menu'),
        header = document.querySelector('.header'),
        nav = document.querySelector('.nav'),
        body = document.querySelector('body'),
        main = document.querySelector('.main'),
        next = document.querySelector('.main__next'),
        prev = document.querySelector('.main__prev'),
        anchors = document.querySelectorAll('[data-nav]'),
        slidesField = document.querySelector('.main__slider'),
        slides = document.querySelectorAll('.main__slide img'),
        width = window.getComputedStyle(main).width,
        height = parseFloat(window.getComputedStyle(main).height) - 70;

    let slideIndex = 1, offset = 0;


    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            let href = this.getAttribute('href').substring(1);

            const scrollTarget = document.getElementById(href);

            const topOffSet = 100,
                  elementPosition = scrollTarget.getBoundingClientRect().top,
                  offsetPosition = elementPosition - topOffSet;
            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            })

        });
    });

    const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;

    window.addEventListener('scroll', () => {
        if (scrollPosition() >= height && !header.classList.contains("headerScroll")) {
            header.classList.add('headerScroll');
            
        }
        else if (scrollPosition() <= height && header.classList.contains("headerScroll")) {
            header.classList.remove('headerScroll');
        }
    });

    menu.addEventListener('click', () => {
        menu.classList.toggle("active");
        nav.classList.toggle("active");
        body.classList.toggle("active");
    });


    slidesField.style.width = 100 * slides.length + '%';
    slides.forEach(slide => {
        slide.style.width = width;
    });

    function nextSlide() {
        if (offset == parseInt(width.replace(/px$/, ''), 10) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += parseInt(width.replace(/px$/, ''), 10);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    let infinityMainSlider, isTurnOn = false;

    function startSlider() {
        infinityMainSlider = setInterval(() => nextSlide(), 3000);
        isTurnOn = true;
    }

    startSlider();

    next.addEventListener('click', () => {
        nextSlide();
        clearInterval(infinityMainSlider);
        if(!isTurnOn) {
            setTimeout(() => startSlider(), 30000);
            isTurnOn = true;
        }
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = parseInt(width, 10) * (slides.length - 1);
        } else {
            offset -= parseInt(width, 10);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        clearInterval(infinityMainSlider);
        if(!isTurnOn) {
            setTimeout(() => startSlider(), 30000);
            isTurnOn = true;
        }

    });

// Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 30000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);


});















// field.setAttribute("name", strUser); чтобы поменять name аттрибут