/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

/* Menu Show */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/* Menu hidden */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*=============== ANIMASI NAVBAR ===============*/
// Fungsi untuk mengetikkan teks satu per satu dan menghapusnya
function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
      // Pengetikan
      document.querySelector('.nav__logo').innerHTML = text.substring(0, i+1);
      setTimeout(function() {
        typeWriter(text, i + 1, fnCallback);
      },420); // Waktu penundaan antara setiap huruf (dalam milidetik)
    } else if (i === text.length) {
      // Jeda setelah pengetikan selesai sebelum penghapusan dimulai
      setTimeout(function() {
        deleteText(text, i, fnCallback);
      }, 1000);
    } else if (typeof fnCallback == 'function') {
      // Setelah penghapusan selesai, panggil kembali animasi
      setTimeout(fnCallback, 500);
    }
  }

  // Fungsi untuk menghapus teks satu per satu
  function deleteText(text, i, fnCallback) {
    if (i >= 0) {
      // Penghapusan
      document.querySelector('.nav__logo').innerHTML = text.substring(0, i);
      setTimeout(function() {
        deleteText(text, i - 1, fnCallback);
      }, 150); // Waktu penundaan antara penghapusan setiap huruf (dalam milidetik)
    } else if (typeof fnCallback == 'function') {
      // Setelah penghapusan selesai, panggil kembali animasi pengetikan
      setTimeout(function() {
        typeWriter(text, 0, fnCallback);
      }, 1000);
    }
  }

  // Memulai animasi saat halaman dimuat
  window.onload = function() {
    typeWriter(document.querySelector('.typing-animation').textContent, 0, function(){});
  };


/*=============== ADD BLUR HEADER ===============*/
const scrollHeader = () => {
    const header = document.getElementById('header');
    window.scrollY >= 50 ? header.classList.add('blur-header') : header.classList.remove('blur-header');
};
window.addEventListener('scroll', scrollHeader);

/*=============== SEND EMAIL VIA EMAILJS ===============*/
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

const sendEmail = (e) => {
    e.preventDefault();

    // serviceID - templateID - #form - publicKey
    emailjs.sendForm('service_l4dj4v8', 'template_mextwk9', '#contact-form', 'JpgLPyV__fafQoY-a')
    .then(() => {
        // Show sent message
        contactMessage.textContent = 'Message sent successfully ✅';
        // Remove message after five seconds
        setTimeout(() => {
            contactMessage.textContent = '';
        }, 5000);
        // Clear input fields
        contactForm.reset();
    })
    .catch(() => {
        // Show error message
        contactMessage.textContent = 'Message not sent (service error) ❌';
    });
};

contactForm.addEventListener('submit', sendEmail);

/*=============== SHOW SCROLL UP BUTTON ===============*/ 
const scrollUp = () => {
    const scrollUpBtn = document.getElementById('scroll-up');
    window.scrollY >= 350 ? scrollUpBtn.classList.add('show-scroll') : scrollUpBtn.classList.remove('show-scroll');
};
window.addEventListener('scroll', scrollUp);  

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector(`.nav__menu a[href*=${sectionId}]`);

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            navLink.classList.add('active-link');
        } else {
            navLink.classList.remove('active-link');
        }
    });
};

window.addEventListener('scroll', scrollActive);

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
});

sr.reveal('.home__data, .experience, .skills, .contact__container');
sr.reveal('.home__img', { delay: 600 });
sr.reveal('.home__scroll', { delay: 800 });
sr.reveal('.work__card, .services_card', { interval: 100 });
sr.reveal('.about__content', { origin: 'right' });
sr.reveal('.about__img', { origin: 'left' });
