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
anime({
  targets: "#luca-animated path",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutSine",
  duration: 1500,
  delay: function (el, i) {
    return i * 350;
  },
  direction: "alternate",
  loop: true,
});

// ——————————————————————————————————————————————————
// preambule animation
// ——————————————————————————————————————————————————
var preambuleAnimation = anime({
  targets: ".myname",
  width: "195%",
  easing: "cubicBezier(.25, .75, 0.43, 1.0)",
  duration: 2500,
  direction: "normal",
  loop: false,
  autoplay: false,
});

var lastScrollTop = 0;
window.addEventListener("scroll", function(){ 
   var st = window.pageYOffset;
   if (st > lastScrollTop){
    preambuleAnimation.play(window.pageYOffset * 2);
   }
   lastScrollTop = st <= 0 ? 0 : st;
}, { once: true });