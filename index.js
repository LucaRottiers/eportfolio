// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = "";
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const phrases = [
  "Networking",
  "Automation",
  "Scripting",
  "Security",
  "Testing",
];

const el = document.querySelector(".qualities");
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 800);
  });
  counter = (counter + 1) % phrases.length;
};

next();

// ——————————————————————————————————————————————————
// Name amination
// ——————————————————————————————————————————————————
consoleText(["Luca", "Rottiers"], "text", ["Black"]);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ["#fff"];
  var visible = true;
  var con = document.getElementById("console");
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id);
  target.setAttribute("style", "color:" + colors[0]);
  window.setInterval(function () {
    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount);
      window.setTimeout(function () {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute("style", "color:" + colors[0]);
        letterCount += x;
        waiting = false;
      }, 1000);
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function () {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000);
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount);
      letterCount += x;
    }
  }, 120);
  window.setInterval(function () {
    if (visible === true) {
      con.className = "console-underscore hidden";
      visible = false;
    } else {
      con.className = "console-underscore";

      visible = true;
    }
  }, 400);
}

// ——————————————————————————————————————————————————
// preambule animation
// ——————————————————————————————————————————————————
function getScrollPercent() {
  var h = document.documentElement,
    b = document.body,
    st = "scrollTop",
    sh = "scrollHeight";
  return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
}
const tl = anime.timeline({ autoplay: false });

tl.add({
  targets: ".myname",
  width: "195%",
  easing: "cubicBezier(.25, .75, 0.43, 1.0)",
  duration: 1000,
  direction: "normal",
}).add(
  {
    targets: ".console-container",
    translateX: "100vw",
    easing: "cubicBezier(.25, .75, 0.43, 1.0)",
    duration: 5000,
    direction: "normal",
  },
  100
);

window.addEventListener("scroll", () => {
  const persentage = getScrollPercent();
  tl.seek(tl.duration * (persentage * 0.01));
});

ScrollTrigger.create({
  trigger: ".intro",
  anticipatePin: 1,
  start: "top top",
  end: 5 * innerHeight,
  pin: true,
});
ScrollTrigger.create({
  trigger: ".video-container",
  anticipatePin: 1,
  start: "top top",
  end: 5 * innerHeight,
  pin: false,
});

gsap.delayedCall(1, () =>
  ScrollTrigger.getAll().forEach((t) => {
    t.refresh();
  })
);

// ——————————————————————————————————————————————————
// Block title animation
// ——————————————————————————————————————————————————
const timelineBlockTitle = gsap.timeline({
  scrollTrigger: {
    trigger: ".myname",
    start: "120% top",
    end: "200% top",
    scrub: true,
  },
});
timelineBlockTitle
  .from(".block-title-text", {
    y: -150,
    autoAlpha: 0,
    ease: Power2.easeInOut,
    stagger: 5,
  })
  .from(".profile-picture", {
    y: 150,
    autoAlpha: 0,
    ease: Power2.easeInOut,
    stagger: 50,
  });

// ——————————————————————————————————————————————————
// Timeline animation
// ——————————————————————————————————————————————————
function qs(selector, all = false) {
  return all
    ? document.querySelectorAll(selector)
    : document.querySelector(selector);
}

const sections = qs(".section", true);
const timeline = qs(".timeline");
const line = qs(".line");
line.style.bottom = `calc(100% - 20px)`;
let prevScrollY = window.scrollY;
let up, down;
let full = false;
let set = 0;
const targetY = window.innerHeight * 0.8;

function scrollHandler(e) {
  const { scrollY } = window;
  up = scrollY < prevScrollY;
  down = !up;
  const timelineRect = timeline.getBoundingClientRect();
  const lineRect = line.getBoundingClientRect(); 

  const dist = targetY - timelineRect.top;
  console.log(dist);

  if (down && !full) {
    set = Math.max(set, dist);
    line.style.bottom = `calc(100% - ${set}px)`;
  }

  if (dist > timeline.offsetHeight + 50 && !full) {
    full = true;
    line.style.bottom = `-50px`;
  }

  sections.forEach((item) => {
    const rect = item.getBoundingClientRect(); 

    if (rect.top + item.offsetHeight / 5 < targetY) {
      item.classList.add("show-me");
    }
  }); 

  prevScrollY = window.scrollY;
}

scrollHandler();
line.style.display = "block";
window.addEventListener("scroll", scrollHandler);

// ——————————————————————————————————————————————————
// Soft Skills Horizontal Scroll
// ——————————————————————————————————————————————————
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.scrollerProxy(".soft-skills-container", {
  getBoundingClientRect() {
    return {
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.querySelector(".soft-skills-container").style.transform
    ? "transform"
    : "fixed",
});

window.addEventListener("load", function () {
  let pinBoxes = document.querySelectorAll(".pin-wrap > *");
  let pinWrap = document.querySelector(".pin-wrap");
  let pinWrapWidth = pinWrap.offsetWidth;
  let horizontalScrollLength = pinWrapWidth - window.innerWidth;

  // Pinning and horizontal scrolling
  gsap.to(".pin-wrap", {
    scrollTrigger: {
      scrub: true,
      trigger: "#sectionPin",
      pin: true,
      // anticipatePin: 1,
      start: "top top",
      end: "500% top",
    },
    x: -horizontalScrollLength,
    ease: "none",
  });

  ScrollTrigger.refresh();
});

// ——————————————————————————————————————————————————
// Percentbar on skill card
// ——————————————————————————————————————————————————
let numberPercent = document.querySelectorAll(".countbar");
let getPercent = Array.from(numberPercent);

getPercent.map((items) => {
  let startCount = 0;
  let progressBar = () => {
    startCount++;
    items.innerHTML = `<h3>${startCount}%</h3>`;
    items.style.width = `${startCount}%`;
    if (startCount == items.dataset.percentnumber) {
      clearInterval(stop);
    }
  };
  let stop = setInterval(() => {
    progressBar();
  }, 25);
});

// ——————————————————————————————————————————————————
// Back to top button
// ——————————————————————————————————————————————————
var btn = $("#backToTopButton");

btn.on("click", function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, "600");
});

// ——————————————————————————————————————————————————
// Particle animation
// ——————————————————————————————————————————————————
let nrOfParticles = 100
let densityOfParticles = 700
let lineColor = "#cccccc"
let lineWidth = 0.5
let movementSpeed = 6

particlesJS("particles-js", {
  particles: {
    number: { value: nrOfParticles, density: { enable: true, value_area: densityOfParticles } },
    size: { value: 0 },
    line_linked: {
      enable: true,
      distance: 250,
      color: lineColor,
      opacity: 1,
      width: lineWidth
    },
    move: {
      enable: true,
      speed: movementSpeed,
      direction: "right",
      random: true,
      straight: true,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true
});
var count_particles, stats, update;

document.body.appendChild(stats.domElement);
count_particles = document.querySelector(".js-count-particles");
update = function () {
  stats.begin();
  stats.end();
  if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
    count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
  }
  requestAnimationFrame(update);
};
requestAnimationFrame(update);

