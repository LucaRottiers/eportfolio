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
  direction: "normal",
}).add(
  {
    targets: ".console-container",
    translateX: "100vw",
    easing: "cubicBezier(.25, .75, 0.43, 1.0)",
    direction: "normal",
  },
  100
);

window.addEventListener("scroll", () => {
  const persentage = getScrollPercent();
  tl.seek(tl.duration * (persentage * 0.01));
});

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
  const lineRect = line.getBoundingClientRect(); // const lineHeight = lineRect.bottom - lineRect.top;

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
    // console.log(item);
    const rect = item.getBoundingClientRect(); //     console.log(rect);

    if (rect.top + item.offsetHeight / 5 < targetY) {
      item.classList.add("show-me");
    }
  }); // console.log(up, down);

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
// Soft Skills Title
// ——————————————————————————————————————————————————
const newParticlesPerFrame = 50;

const color = (hsl, o) => {
  return `hsla(${hsl.h | 0}, ${hsl.s}%, 100%, ${o})`;
};

class TextSparks {
  constructor() {
    this.opa = 0;
    this.tick = 0;
    this.drawCB = null;
    this.mask = null;
    this.canvas = window.document.querySelector("canvas");
    this.engine = this.canvas.getContext("2d");

    this.maskTick = 0;
    this.nextMaskCb = this.nextMask.bind(this);
    this.maskCache = [];

    this.resize();
    this.fetchData();
    this.buildStackCache();

    this.particleMap = new Map();
  }

  buildStackCache() {
    this.maskCache = this.stack.map((stack) => {
      return this.buildTextMask(stack.texts);
    });
  }

  fetchData() {
    this.stackId = -1;
    this.stack = [...document.querySelectorAll(".soft-skills-intro-text > .soft-skills-intro-text-ul")].map((ul) => {
      return {
        ticks:
          0.05 *
          (ul.hasAttribute("data-time") ? ul.getAttribute("data-time") : 0),
        fadeIn: ul.hasAttribute("data-fade-in")
          ? 50 / Number(ul.getAttribute("data-fade-in"))
          : 0,
        fadeOut: ul.hasAttribute("data-fade-out")
          ? 50 / Number(ul.getAttribute("data-fade-out"))
          : 0,
        texts: [...ul.querySelectorAll("li")].map((li) => {
          return {
            text: li.innerHTML.trim(),
            hsl: {
              h: li.hasAttribute("data-hue")
                ? Number(li.getAttribute("data-hue"))
                : 0,
              s: li.hasAttribute("data-saturation")
                ? Number(li.getAttribute("data-saturation"))
                : 100,
              l: li.hasAttribute("data-lightness")
                ? Number(li.getAttribute("data-lightness"))
                : 50,
            },
          };
        }),
      };
    });
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.setAttribute("width", this.width);
    this.canvas.setAttribute("height", this.height);
  }

  buildTextMask(texts) {
    const mask = [];

    const textAll = texts.reduce((all, textStack) => {
      return all.concat(textStack.text);
    }, "");

    const size = 0.8;
    const width = 200;
    const height = (width / (this.width / this.height)) | 0;
    const baseFontSize = 20;

    // const canvas = document.querySelector('#test');
    const canvas = document.createElement("canvas");
    const engine = canvas.getContext("2d");

    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);

    const font = (size) => {
      return `bold ${size}px Arial`;
    };

    engine.font = font(baseFontSize);
    const m = engine.measureText(textAll);
    const rel = m.width / (width * size);
    const fSize = Math.min(height * 0.8, (baseFontSize / rel) | 0);

    engine.font = font(fSize);
    const fontWidth = engine.measureText(textAll).width;

    engine.fillText(
      textAll,
      (width - fontWidth) / 2,
      height / 2 + fSize * 0.35
    );

    let left = (width - fontWidth) / 2;
    const bot = height / 2 + fSize * 0.35;

    Object.values(texts).forEach((textStack) => {
      engine.clearRect(0, 0, width, height);

      engine.fillText(textStack.text, left, bot);

      left += engine.measureText(textStack.text).width;

      const data = engine.getImageData(0, 0, width, height);
      const subStack = [];

      for (let i = 0, max = data.width * data.height; i < max; i++) {
        if (data.data[i * 4 + 3]) {
          subStack.push({
            x: (i % data.width) / data.width,
            y: ((i / data.width) | 0) / data.height,
            o: Math.random(),
            t: Math.random(),
          });
        }
      }

      mask.push({
        hsl: textStack.hsl,
        s: subStack,
      });
    });

    return mask;
  }

  createNewParticle() {
    for (let i = 0; i < newParticlesPerFrame; i++) {
      let main = (Math.random() * this.mask.length) | 0;
      let subMask = this.mask[main];
      let maskElement =
        this.mask[main].s[(Math.random() * this.mask[main].s.length) | 0];

      if (subMask && maskElement) {
        let particle = {
          x: maskElement.x,
          y: maskElement.y,
          hsl: subMask.hsl,
          c: this.prepareParticle,
        };

        this.particleMap.set(particle, particle);
      }
    }
  }

  secLog(log, timesPerFrame) {
    if (Math.random() < 1 / 60 / timesPerFrame) {
      console.log(log);
    }
  }

  clear() {
    this.engine.fillStyle = "#6767ff";
    this.engine.fillRect(0, 0, this.width, this.height);
  }

  randFromList(...rands) {
    return (
      rands.reduce((acc, rand) => {
        return acc + rand;
      }, 0) / rands.length
    );
  }

  prepareParticle(particle) {
    const r1 = Math.random();
    const r2 = Math.random();
    const r3 = Math.random();

    const rad = r3 * Math.PI * 2;

    particle.x += (-0.5 + r1) / 300;
    particle.y += (-0.5 + r2) / 300;
    particle.si = (1 + Math.random() * 4) | 0;
    
    

    particle.s = 0.003 + this.randFromList(r1, r2) / 10;
    particle.l = 0;

    particle.mx = Math.cos(rad) * (particle.s / (r1 < 0.05 ? 10 : 400));
    particle.my = Math.sin(rad) * (particle.s / (r1 < 0.05 ? 10 : 400));

    particle.c = this.drawParticle;
  }

  drawParticle(particle) {
    if (particle.l >= 1) {
      particle.c = null;
      return;
    }

    particle.l += particle.s;
    particle.x += particle.mx;
    particle.y += particle.my;

    this.engine.fillStyle = color(
      particle.hsl,
      this.opa * Math.sin(particle.l * Math.PI)
    );
    this.engine.fillRect(
      particle.x * this.width,
      particle.y * this.height,
      particle.si,
      particle.si
    );
  }

  renderParticles() {
    this.particleMap.forEach((particle) => {
      particle.c.call(this, particle);

      if (!particle.c) {
        this.particleMap.delete(particle);
      }
    });
  }

  drawStatic() {
    let i = 0;
    const step = 0.01;

    this.mask.forEach((subMask) => {
      subMask.s.forEach((pos) => {
        i++;

        this.engine.fillStyle = color(
          subMask.hsl,
          ((1 + Math.cos(pos.x * 5 * pos.y * 5 + this.tick / 10)) / 2) *
            this.opa *
            pos.t *
            0.5
        );
        this.engine.fillRect(
          pos.x * this.width,
          pos.y * this.height,
          this.width / 150,
          this.width / 150
        );

        if (i % 2) {
          return;
        }

        pos.o += step;
        const opa = Math.max(0, Math.sin(pos.o * Math.PI * 2));
        const padding = (opa * this.width) / 200;

        this.engine.fillStyle = color(subMask.hsl, this.opa * opa * 0.2);

        if (pos.t < 0.5) {
          this.engine.beginPath();
          this.engine.arc(
            pos.x * this.width,
            pos.y * this.height,
            this.width / 500 + padding,
            0,
            Math.PI * 2
          );
          this.engine.fill();
        } else {
          this.engine.fillRect(
            pos.x * this.width - padding,
            pos.y * this.height - padding,
            this.width / 150 + padding * 2,
            this.width / 150 + padding * 2
          );
        }
      });
    });
  }

  draw() {
    this.tick++;

    this.nextMaskCb();
    this.createNewParticle();
    this.clear();

    this.engine.globalCompositeOperation = "lighter";
    this.drawStatic();
    this.renderParticles();
    this.engine.globalCompositeOperation = "source-over";

    requestAnimationFrame(this.drawCB);
  }

  fadeInMask() {
    this.opa += this.stack[this.stackId].fadeIn;

    if (this.opa >= 1) {
      this.opa = 1;

      this.afterFadeIn();
    }
  }

  afterFadeIn() {
    this.opa = 1;

    if (this.stack[this.stackId].ticks) {
      this.maskTick = 0;
      this.nextMaskCb = this.tickMask.bind(this);
    } else {
      this.nextMaskCb = () => {};
    }
  }

  fadeOutMask() {
    this.opa -= this.stack[this.stackId].fadeOut;

    if (this.opa <= 0) {
      this.afterFadeOut();
    }
  }

  afterFadeOut() {
    this.opa = 0;
    this.nextMaskCb = this.nextMask.bind(this);
  }

  tickMask() {
    this.maskTick++;

    if (this.maskTick >= this.stack[this.stackId].ticks) {
      if (this.stack[this.stackId].fadeOut) {
        this.nextMaskCb = this.fadeOutMask.bind(this);
      } else {
        this.afterFadeOut();
      }
    }
  }

  nextMask() {
    this.stackId++;

    if (this.stackId >= this.stack.length) {
      this.stackId = 0;
    }

    this.mask = this.maskCache[this.stackId];

    if (this.stack[this.stackId].fadeIn) {
      this.nextMaskCb = this.fadeInMask.bind(this);
    } else {
      this.opa = 1;
      this.afterFadeIn();
    }
  }

  run() {
    this.drawCB = this.draw.bind(this);
    this.drawCB();
  }
}

const a = new TextSparks();
a.run();
