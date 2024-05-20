document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.classList.add('loaded');
      setTimeout(() => {
        preloader.remove();
      }, 1000);
    });
  }

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');
  const body = document.querySelector('body');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', (event) => {
      event.preventDefault();
      mobileNavToggle();
    });
  });

  function mobileNavToggle() {
    body.classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {
    if (navbarlink.hash) {
      const section = document.querySelector(navbarlink.hash);
      if (section) {
        navbarlink.addEventListener('click', () => {
          if (body.classList.contains('mobile-nav-active')) {
            mobileNavToggle();
          }
        });
      }
    }
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navbar .dropdown > a').forEach(el => {
    el.addEventListener('click', function(event) {
      if (body.classList.contains('mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');
        this.querySelector('.dropdown-indicator').classList.toggle('bi-chevron-up');
        this.querySelector('.dropdown-indicator').classList.toggle('bi-chevron-down');
      }
    });
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = () => {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    };
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /**
   * Initiate glightbox
   */
  GLightbox({ selector: '.glightbox' });

  /**
   * Init swiper sliders
   */
  const initSwiper = (selector, slidesPerView) => {
    new Swiper(selector, {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 40 },
        1200: { slidesPerView: slidesPerView }
      }
    });
  };

  initSwiper('.slides-1', 1);
  initSwiper('.slides-3', 3);

  /**
   * Animation on scroll function and init
   */
  const aos_init = () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  };
  window.addEventListener('load', aos_init);
});
