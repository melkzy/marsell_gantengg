'use strict';

function playMusic() {
  const music = document.getElementById('background-music');
  music.play().catch(e => console.log("Menunggu interaksi user untuk memutar musik."));
}
window.addEventListener('DOMContentLoaded', playMusic);
document.body.addEventListener('click', playMusic, { once: true });

const content = document.getElementById('content');
const timer = document.getElementById('timer');

const second = 1000,
  minute = second * 60,
  hour = minute * 60,
  day = hour * 24;

let countDown = new Date('Aug 20, 2026 00:00:00').getTime();

const x = setInterval(function () {
  let now = new Date().getTime(),
    distance = countDown - now;
    
  document.getElementById('hours').innerText = Math.floor(distance / (hour));
  document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute));
  document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);

  if (distance < 0) {
    timer.classList.add('d-none');
    confetti();
    clearInterval(x);
    _slideSatu();
  }
}, second);

const _slideSatu = function () {
  const tap = document.getElementById('tap');
  const slideSatu = document.getElementById('slideSatu');
  
  slideSatu.classList.remove('d-none');
  setTimeout(function () {
    tap.classList.remove('d-none');
    document.body.addEventListener('click', _slideDua, { once: true });
  }, 7000);
};

const _slideDua = function () {
  const slideSatu = document.getElementById('slideSatu');
  const tap = document.getElementById('tap');
  const slideDua = document.getElementById('slideDua');

  slideSatu.classList.replace('animate__slideInDown', 'animate__backOutDown');
  tap.classList.add('d-none');
  setTimeout(() => slideSatu.classList.add('d-none'), 1000);

  slideDua.classList.remove('d-none');
  setTimeout(function () {
    tap.classList.remove('d-none');
    document.body.addEventListener('click', function () {
      slideDua.classList.replace('animate__zoomInDown', 'animate__fadeOutLeft');
      slideDua.classList.remove('animate__delay-2s', 'animate__slow');
      tap.classList.add('d-none');
      setTimeout(function () {
        slideDua.remove();
        _slideTiga();
      }, 1000);
    }, { once: true });
  }, 40000);
};

const _slideTiga = function () {
  const tap = document.getElementById('tap');
  const slideTiga = document.getElementById('slideTiga');

  slideTiga.classList.remove('d-none');
  setTimeout(function () {
    tap.classList.remove('d-none');
    document.body.addEventListener('click', function () {
      slideTiga.classList.remove('animate__delay-2s', 'animate__slow');
      slideTiga.classList.replace('animate__fadeInRight', 'animate__fadeOut');
      tap.remove();
      setTimeout(function () {
        slideTiga.remove();
        _slideEmpat();
      }, 1000);
    }, { once: true });
  }, 40000);
}

function getRandomPosition(element) {
  var x = document.body.offsetHeight - element.clientHeight;
  var y = document.body.offsetWidth - element.clientWidth;
  var randomX = Math.floor(Math.random() * 500);
  var randomY = Math.floor(Math.random() * y);
  return [randomX, randomY];
};

const _slideEmpat = function () {
  const slideEmpat = document.getElementById('slideEmpat');
  const btn = document.getElementsByTagName('button');
  slideEmpat.classList.remove('d-none');

  btn[0].addEventListener('click', function () {
    var xy = getRandomPosition(slideEmpat);
    slideEmpat.style.top = xy[0] + 'px';
  });

  btn[1].addEventListener('click', function () {
    slideEmpat.classList.replace('animate__fadeInDown', 'animate__bounceOut');
    slideEmpat.classList.remove('animate__delay-2s');
    setTimeout(function () {
      slideEmpat.remove()
      setTimeout(() => {
        _slideLima();
      }, 500);
    }, 1000);
  }, { once: true });
};

const _slideLima = function () {
  const slideLima = document.getElementById('slideLima');
  slideLima.classList.remove('d-none');
  const trims = document.getElementById('trims');

  setTimeout(() => {
    trims.classList.remove('d-none');
  }, 1000);

  slideLima.addEventListener('animationend', () => {
    slideLima.classList.add('animate__delay-3s')
    slideLima.classList.replace('animate__bounceIn', 'animate__fadeOut');
    trims.classList.add('animate__animated', 'animate__fadeOut', 'animate__delay-3s');
    setTimeout(() => {
      trims.remove();
      setTimeout(() => {
        slideLima.remove();
        _slideEnam();
      }, 1000);
    }, 6000);
  }, { once: true });
};

const _slideEnam = function () {
  const slideEnam = document.getElementById('slideEnam');
  slideEnam.classList.remove('d-none');
  
  let newTap = document.getElementById('tap-gallery');
  if (!newTap) {
    newTap = document.createElement('p');
    newTap.id = 'tap-gallery';
    newTap.className = 'text-muted animate__animated animate__pulse animate__slow animate__repeat-3';
    newTap.textContent = 'Ketuk untuk lanjut ke pesan terakhir';
    document.getElementById('content').appendChild(newTap);
  }
  
  setTimeout(function() {
    newTap.classList.remove('d-none');
    document.body.addEventListener('click', function nextSlide() {
      newTap.classList.add('d-none');
      slideEnam.classList.add('animate__fadeOutUp');
      setTimeout(function() {
        slideEnam.classList.add('d-none');
        slideEnam.classList.remove('animate__fadeOutUp');
        _slideTujuh();
      }, 1000);
    }, { once: true });
  }, 3000);
};

const _slideTujuh = function () {
  const tap = document.getElementById('tap-gallery');
  const slideTujuh = document.getElementById('slideTujuh');
  
  slideTujuh.classList.remove('d-none');
  if (tap) tap.remove();
  
  let newTap = document.createElement('p');
  newTap.id = 'tap-final';
  newTap.className = 'text-muted animate__animated animate__pulse animate__slow animate__repeat-3';
  newTap.textContent = 'Ketuk untuk selesai';
  document.getElementById('content').appendChild(newTap);
  
  setTimeout(function() {
    newTap.classList.remove('d-none');
    document.body.addEventListener('click', function finalSlide() {
      newTap.classList.add('d-none');
      slideTujuh.classList.replace('animate__zoomIn', 'animate__fadeOut');
      setTimeout(function() {
        slideTujuh.remove();
        newTap.remove();
        
        const akhir = document.createElement('div');
        akhir.className = 'animate__animated animate__bounceIn';
        akhir.style.position = 'relative';
        akhir.style.top = '250px';
        akhir.style.padding = '20px';
        akhir.innerHTML = `
          <div style="background: rgba(255,255,255,0.9); padding: 30px 20px; border-radius: 20px; display: inline-block; box-shadow: 0 4px 30px rgba(0,0,0,0.2); max-width: 95%;">
            <i class="fas fa-heart fa-5x text-danger animate__animated animate__infinite animate__pulse"></i>
            <h2 class="mt-3" style="color: #D44147; font-weight: 700; font-size: 1.5rem;">
              HAPPY BIRTHDAY SAYANGG! 😍😘
            </h2>
            <p style="color: #555; font-size: 1.1rem; font-weight: 500;">
              Semoga semua impianmu menjadi kenyataan 🌹
            </p>
          </div>
        `;
        document.getElementById('content').appendChild(akhir);
      }, 1000);
    }, { once: true });
  }, 5000);
};

new TypeIt("#teks1", {
  strings: ["Selamat ulang tahun sayang, Semoga di usia kamu yang baru ini, semua hal baik datang menghampiri kamu", "Semoga hal-hal yang membuat kamu runtuh turut menjadi alasan kamu untuk tetap tumbuh.", "Semoga dunia senantiasa menjaga kamu dimanapun kamu berada.", "Semoga hari-hari kamu selalu diiringi cinta yang tak pernah ada batasnya." , "Semoga setiap langkahmu dimudahkan hingga tercapai apa yang kamu inginkan."],
  startDelay: 4000,
  speed: 75,
  waitUntilVisible: true
}).go();

new TypeIt("#teks2", {
  strings: ["Dengan ataupun tanpaku, semoga semesta selalu membahagiakan kamu bagimanapun caranya.", "Terima kasih karena sudah hadir dan menjadi bagian penting dalam hidupku. ","Aku bersyukur bisa mengenal kamu dan melewati banyak cerita bersama."," Semoga kita bisa terus saling menemani, saling mendukung, dan menciptakan banyak kenangan indah lagi ke depannya. ", "Terima kasih sudah bertahan sampai sejauh ini.", " ", "- I am proud of you "],
  startDelay: 2000,
  speed: 75,
  waitUntilVisible: true
}).go();

new TypeIt("#trims", {
  strings: ["makacihh tayangg"],
  startDelay: 2000,
  speed: 100,
  loop: false,
  waitUntilVisible: true,
}).go();

new TypeIt("#teks3", {
  strings: [
    "Terakhir, aku ingin kamu tahu sesuatu...",
    "Kamu adalah orang yang sangat berharga.",
    "Kamu layak mendapatkan semua kebaikan di dunia ini.",
    " ",
    "Jangan pernah ragu untuk bermimpi setinggi langit.",
    "Karena kamu mampu meraih semuanya.",
    " ",
    "Terima kasih sudah menjadi dirimu sendiri.",
    " ",
    "❤️ Selamat Ulang Tahun Sayang ❤️"
  ],
  startDelay: 2000,
  speed: 70,
  waitUntilVisible: true
}).go();


var onlyOnKonami = false;

function confetti() {
  var $window = $(window),
    random = Math.random,
    cos = Math.cos,
    sin = Math.sin,
    PI = Math.PI,
    PI2 = PI * 2,
    timer = undefined,
    frame = undefined,
    confetti = [];

  var runFor = 2000
  var isRunning = true

  setTimeout(() => {
    isRunning = false
  }, runFor);

  var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
    pointer = 0;

  var particles = 150,
    spread = 20,
    sizeMin = 5,
    sizeMax = 12 - sizeMin,
    eccentricity = 10,
    deviation = 100,
    dxThetaMin = -.1,
    dxThetaMax = -dxThetaMin - dxThetaMin,
    dyMin = .13,
    dyMax = .18,
    dThetaMin = .4,
    dThetaMax = .7 - dThetaMin;

  var colorThemes = [
    function () { return color(200 * random() | 0, 200 * random() | 0, 200 * random() | 0); },
    function () { var black = 200 * random() | 0; return color(200, black, black); },
    function () { var black = 200 * random() | 0; return color(black, 200, black); },
    function () { var black = 200 * random() | 0; return color(black, black, 200); },
    function () { return color(200, 100, 200 * random() | 0); },
    function () { return color(200 * random() | 0, 200, 200); },
    function () { var black = 256 * random() | 0; return color(black, black, black); },
    function () { return colorThemes[random() < .5 ? 1 : 2](); },
    function () { return colorThemes[random() < .5 ? 3 : 5](); },
    function () { return colorThemes[random() < .5 ? 2 : 4](); }
  ];

  function color(r, g, b) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  function interpolation(a, b, t) {
    return (1 - cos(PI * t)) / 2 * (b - a) + a;
  }

  var radius = 1 / eccentricity,
    radius2 = radius + radius;

  function createPoisson() {
    var domain = [radius, 1 - radius],
      measure = 1 - radius2,
      spline = [0, 1];
    while (measure) {
      var dart = measure * random(),
        i, l, interval, a, b, c, d;

      for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
        a = domain[i], b = domain[i + 1], interval = b - a;
        if (dart < measure + interval) {
          spline.push(dart += a - measure);
          break;
        }
        measure += interval;
      }
      c = dart - radius, d = dart + radius;

      for (i = domain.length - 1; i > 0; i -= 2) {
        l = i - 1, a = domain[l], b = domain[i];
        if (a >= c && a < d)
          if (b > d) domain[l] = d; 
          else domain.splice(l, 2); 
        else if (a < c && b > c)
          if (b <= d) domain[i] = c; 
          else domain.splice(i, 0, c, d); 
      }
      for (i = 0, l = domain.length, measure = 0; i < l; i += 2)
        measure += domain[i + 1] - domain[i];
    }
    return spline.sort();
  }

  var container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '0';
  container.style.overflow = 'visible';
  container.style.zIndex = '9999';

  function Confetto(theme) {
    this.frame = 0;
    this.outer = document.createElement('div');
    this.inner = document.createElement('div');
    this.outer.appendChild(this.inner);

    var outerStyle = this.outer.style,
      innerStyle = this.inner.style;
    outerStyle.position = 'absolute';
    outerStyle.width = (sizeMin + sizeMax * random()) + 'px';
    outerStyle.height = (sizeMin + sizeMax * random()) + 'px';
    innerStyle.width = '100%';
    innerStyle.height = '100%';
    innerStyle.backgroundColor = theme();

    outerStyle.perspective = '50px';
    outerStyle.transform = 'rotate(' + (360 * random()) + 'deg)';
    this.axis = 'rotate3D(' +
      cos(360 * random()) + ',' +
      cos(360 * random()) + ',0,';
    this.theta = 360 * random();
    this.dTheta = dThetaMin + dThetaMax * random();
    innerStyle.transform = this.axis + this.theta + 'deg)';

    this.x = $window.width() * random();
    this.y = -deviation;
    this.dx = sin(dxThetaMin + dxThetaMax * random());
    this.dy = dyMin + dyMax * random();
    outerStyle.left = this.x + 'px';
    outerStyle.top = this.y + 'px';

    this.splineX = createPoisson();
    this.splineY = [];
    for (var i = 1, l = this.splineX.length - 1; i < l; ++i)
      this.splineY[i] = deviation * random();
    this.splineY[0] = this.splineY[l] = deviation * random();

    this.update = function (height, delta) {
      this.frame += delta;
      this.x += this.dx * delta;
      this.y += this.dy * delta;
      this.theta += this.dTheta * delta;

      var phi = this.frame % 7777 / 7777,
        i = 0,
        j = 1;
      while (phi >= this.splineX[j]) i = j++;
      var rho = interpolation(
        this.splineY[i],
        this.splineY[j],
        (phi - this.splineX[i]) / (this.splineX[j] - this.splineX[i])
      );
      phi *= PI2;

      outerStyle.left = this.x + rho * cos(phi) + 'px';
      outerStyle.top = this.y + rho * sin(phi) + 'px';
      innerStyle.transform = this.axis + this.theta + 'deg)';
      return this.y > height + deviation;
    };
  }

  function poof() {
    if (!frame) {
      document.body.appendChild(container);
      var theme = colorThemes[onlyOnKonami ? colorThemes.length * random() | 0 : 0],
        count = 0;

      (function addConfetto() {
        if (onlyOnKonami && ++count > particles)
          return timer = undefined;
        if (isRunning) {
          var confetto = new Confetto(theme);
          confetti.push(confetto);
          container.appendChild(confetto.outer);
          timer = setTimeout(addConfetto, spread * random());
        }
      })(0);

      var prev = undefined;
      requestAnimationFrame(function loop(timestamp) {
        var delta = prev ? timestamp - prev : 0;
        prev = timestamp;
        var height = $window.height();

        for (var i = confetti.length - 1; i >= 0; --i) {
          if (confetti[i].update(height, delta)) {
            container.removeChild(confetti[i].outer);
            confetti.splice(i, 1);
          }
        }
        if (timer || confetti.length)
          return frame = requestAnimationFrame(loop);

        document.body.removeChild(container);
        frame = undefined;
      });
    }
  }

  $window.keydown(function (event) {
    pointer = konami[pointer] === event.which ?
      pointer + 1 :
      +(event.which === konami[0]);
    if (pointer === konami.length) {
      pointer = 0;
      poof();
    }
  });

  if (!onlyOnKonami) poof();
};
