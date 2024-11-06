const phases = document.querySelectorAll(".sky__phase");
const starCanvas = document.getElementById("star-sky");
const titleImage = document.querySelector(".title");
const boat = document.querySelector(".boat");
const waves = document.querySelector(".css-waves");
const waves2 = document.querySelector(".css-waves2");
const lighthouse = document.querySelector(".lighthouse");
const light = document.querySelector(".lightbeem");
let currentPhaseIndex = 0;

// 초기 상태 설정 (첫 번째 phase를 활성화)
phases[currentPhaseIndex].style.opacity = 1;

// 타이틀 색상 및 필터 업데이트 함수
// 타이틀 색상 및 필터 업데이트 함수
function updateVisuals() {
  // 1. 타이틀과 요소 투명도 서서히 0으로 변경
  let opacity = 1;
  const fadeOutInterval = setInterval(() => {
    opacity -= 0.05;
    titleImage.style.opacity = opacity;
    boat.style.opacity = opacity;
    waves.style.opacity = opacity;
    waves2.style.opacity = opacity;

    if (opacity <= 0) {
      clearInterval(fadeOutInterval);

      // 2. 투명도 0 상태에서 이미지와 필터를 업데이트
      if (phases[currentPhaseIndex].classList.contains("sky__dusk")) {
        titleImage.src = "img/title_white.png";
        boat.style.filter = "hue-rotate(30deg) brightness(0.8)";
        waves.style.filter = "hue-rotate(30deg) brightness(0.8)";
        waves2.style.filter = "hue-rotate(30deg) brightness(0.8)";
        lighthouse.style.filter = "hue-rotate(30deg) brightness(0.8)";
        light.style.display = "block";
      } else if (
        phases[currentPhaseIndex].classList.contains("sky__midnight")
      ) {
        titleImage.src = "img/title_white.png";
        boat.style.filter = "saturate(0.8) brightness(0.4)";
        waves.style.filter = "saturate(0.8) brightness(0.6)";
        waves2.style.filter = "saturate(0.8) brightness(0.6)";
        lighthouse.style.filter = "saturate(0.8) brightness(0.4)";
        light.style.display = "block";
      } else if (phases[currentPhaseIndex].classList.contains("sky__dawn")) {
        titleImage.src = "img/title.png";
        boat.style.filter = "hue-rotate(-15deg) brightness(1.1)";
        waves.style.filter = "hue-rotate(-15deg) brightness(1.1)";
        waves2.style.filter = "hue-rotate(-15deg) brightness(1.1)";
        lighthouse.style.filter = "brightness(1)";
        light.style.display = "none";
      } else {
        titleImage.src = "img/title.png";
        boat.style.filter = "brightness(1)";
        waves.style.filter = "brightness(1)";
        waves2.style.filter = "brightness(1)";
        lighthouse.style.filter = "brightness(1)";
        light.style.display = "none";
      }

      // 3. 업데이트된 상태에서 투명도를 서서히 1로 변경
      const fadeInInterval = setInterval(() => {
        opacity += 0.05;
        titleImage.style.opacity = opacity;
        boat.style.opacity = opacity;
        waves.style.opacity = opacity;
        waves2.style.opacity = opacity;

        if (opacity >= 1) {
          clearInterval(fadeInInterval);
        }
      }, 25); // 50ms마다 opacity 조정으로 부드러운 페이드 인
    }
  }, 25); // 50ms마다 opacity 조정으로 부드러운 페이드 아웃
}

// 스크롤 시 하늘 상태와 배 위치 업데이트
window.addEventListener("wheel", function () {
  // 하늘 배경 전환 처리
  phases[currentPhaseIndex].style.opacity = 0;
  currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
  phases[currentPhaseIndex].style.opacity = 1;

  starCanvas.style.opacity = phases[currentPhaseIndex].classList.contains(
    "sky__midnight"
  )
    ? 1
    : 0;

  updateVisuals();
});

// 별 그리기 로직
var ctx = starCanvas.getContext("2d");
var x = (starCanvas.width = window.innerWidth);
var y = (starCanvas.height = window.innerHeight);
var nStar = Math.round((x + y) / 40);

var stars = [];
function createStars() {
  stars = [];
  for (var i = 0; i <= nStar; i++) {
    stars.push({
      x: Math.random() * x,
      y: Math.random() * 540,
      o: Math.random(),
      r: Math.random() * 1.5 + 0.5,
      s: 0.02,
    });
  }
}

function drawing() {
  requestAnimationFrame(drawing);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (var i = 0; i <= nStar; i++) {
    var e = stars[i];
    if (e.o > 1 || e.o < 0) {
      e.s = -e.s;
    }
    e.o += e.s;
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2, false);
    ctx.fillStyle = "rgba(255, 255, 255, " + e.o + ")";
    ctx.fill();
  }
}

window.onload = function () {
  createStars();
  drawing();
  updateVisuals();
};

const cloudContainer = document.querySelector(".cloud-container");

function createCloud() {
  const cloud = document.createElement("div");
  cloud.classList.add("cloud");

  // 구름 이미지 추가
  const cloudImage = document.createElement("img");
  cloudImage.src = "img/cloud01.png"; // 구름 이미지 경로
  cloudImage.style.width = `${400 + Math.random() * 300}px`; // 200px ~ 350px 크기로 랜덤 설정
  cloud.appendChild(cloudImage);

  // 랜덤한 높이와 속도 설정
  const randomTop = Math.random() * 50 + 10; // 10% ~ 60% 높이
  const randomDuration = Math.random() * 10 + 10; // 5초 ~ 15초 지속 시간

  cloud.style.top = `${randomTop}%`;
  cloud.style.animation = `moveCloud ${randomDuration}s linear forwards`; // 애니메이션 설정

  cloudContainer.appendChild(cloud);

  // 애니메이션 지속 시간이 지난 후 구름 제거
  setTimeout(() => {
    cloud.remove();
  }, randomDuration * 1000); // 지속 시간을 밀리초로 변환하여 setTimeout 사용
}

// 일정 시간마다 구름 생성
setInterval(createCloud, 5000); // 3초마다 새로운 구름 생성

const lighthouseContainer = document.querySelector(".lighthouse-container");
lighthouseContainer.style.left = "140%"; // 초기 위치 설정
