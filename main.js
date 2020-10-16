/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*===== ACTIVE AND REMOVE MENU =====*/
const navLink = document.querySelectorAll(".nav-link");

function linkAction() {
  /*Active link*/
  navLink.forEach((n) => n.classList.remove("active"));
  this.classList.add("active");

  /*Remove menu mobile*/
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "80px",
  duration: 2000,
  reset: true,
});

/*SCROLL HOME*/
sr.reveal(".home-title", {});
sr.reveal(".button", { delay: 200 });
sr.reveal(".home-img", { delay: 400 });
sr.reveal(".home-social-icon", { interval: 200 });

/*SCROLL ABOUT*/
sr.reveal(".about-subtitle", { delay: 400 });
sr.reveal(".about-text", { delay: 400 });
sr.reveal(".about-img", { delay: 600 });

/*SCROLL SKILLS*/
sr.reveal(".skills-subtitle", {});
sr.reveal(".skills-text", {});
sr.reveal(".skills-data", { interval: 200 });
sr.reveal(".skills-img", { delay: 600 });

/*SCROLL WORK*/
sr.reveal(".section-title", { delay: 400 });
sr.reveal(".work-img", { interval: 200 });
sr.reveal(".work-text", { delay: 600 });

/*SCROLL CONTACT*/
sr.reveal(".contact-input", { interval: 200 });

/*WORK OVERLAYS*/
function onOne() {
  document.querySelector("#overlay-one").style.display = "block";
}
function offOne() {
  document.querySelector("#overlay-one").style.display = "none";
}
function onTwo() {
  document.querySelector("#overlay-two").style.display = "block";
}
function offTwo() {
  document.querySelector("#overlay-two").style.display = "none";
}
function onThree() {
  document.querySelector("#overlay-three").style.display = "block";
}
function offThree() {
  document.querySelector("#overlay-three").style.display = "none";
}
function onFour() {
  document.querySelector("#overlay-four").style.display = "block";
}
function offFour() {
  document.querySelector("#overlay-four").style.display = "none";
}
function onFive() {
  document.querySelector("#overlay-five").style.display = "block";
}
function offFive() {
  document.querySelector("#overlay-five").style.display = "none";
}
function onSix() {
  document.querySelector("#overlay-six").style.display = "block";
}
function offSix() {
  document.querySelector("#overlay-six").style.display = "none";
}

const title = document.getElementById('title');

const typewriter = new Typewriter(title, {
    loop: true
});

typewriter.typeString('WEB DEVELOPER')
    .pauseFor(1000)
    .deleteChars(9)
    .typeString('DESIGNER')
    .pauseFor(1000)
    .deleteAll()
    .typeString('CREATOR')
    .pauseFor(1000)
    .start();