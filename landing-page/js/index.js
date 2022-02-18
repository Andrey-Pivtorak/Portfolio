import objTranslate from './translate.js';

const htmlTag = document.querySelector('html');

// BURGER ======================================================
const burgerMenu = document.querySelector('.menu__burger');
const bodyMenu = document.querySelector('.menu__body');
const page = document.querySelector('.page');
const headerLogo = document.querySelector('.header__logo');
// /BURGER =====================================================

const menuLinks = document.querySelectorAll('[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach((menuLink) => {
        menuLink.addEventListener('click', onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (
            menuLink.dataset.goto &&
            document.querySelector(menuLink.dataset.goto)
        ) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue =
                gotoBlock.getBoundingClientRect().top +
                scrollY -
                document.querySelector('header').offsetHeight;

            if (burgerMenu.classList.contains('_open')) {
                document.body.classList.remove('_lock');
                burgerMenu.classList.remove('_open');
                bodyMenu.classList.remove('_open');
                page.classList.remove('_open');
                headerLogo.classList.remove('_open');
            }
            window.scrollTo({
                top: gotoBlockValue,
                behavior: 'smooth',
            });
            e.preventDefault();
        }
    }
}

// ======================= IMAGES ========================

const portfolioImages = document.querySelectorAll('.season');

function changeImage(current_season) {
	portfolioImages.forEach((img, index) =>
		img.src = `assets/img/portfolio/${current_season}/${index + 1}.jpg`);
}

function addClassSelect(button) {
	const buttons = document.querySelectorAll('.portfolio__button');
	buttons.forEach(btn => btn.classList.remove('_selected-button'));
	button.classList.add('_selected-button');
}

const buttons = document.querySelectorAll('.portfolio__button');
buttons.forEach(btn => {
	btn.addEventListener('click', () => {
		addClassSelect(btn);
		changeImage(btn.textContent.toLocaleLowerCase());
	});
})

const seasons = ['winter', 'spring', 'summer', 'autumn'];
seasons.forEach((season) => {
  [...portfolioImages].map((image, i) => {
    image = new Image();
    image.src = `assets/img/portfolio/${season}/${i+ 1}.jpg`;
  })
})

// ======================= / IMAGES ======================

// ======================== LANGUAGE =====================

const english = document.querySelector('.en-button');
const russian = document.querySelector('.ru-button');

function translatePage(str) {
    const dataAttr = document.querySelectorAll('[data-i18]');
    [...dataAttr].forEach(el => el.textContent = objTranslate[str][el.dataset.i18]);
}

function saveLang(lang) {
  localStorage.setItem('lang', lang);
}

function getLang() {
    return localStorage.getItem('lang') || 'en';
}

function setLangSelector(lang) {
	if (lang === 'en') {
		english.classList.add('_actualLang');
    russian.classList.remove('_actualLang');
	}
	if (lang === 'ru') {
		russian.classList.add('_actualLang');
    english.classList.remove('_actualLang');
	}
}

// ====================== / LANGUAGE =====================

english.addEventListener('click', () => {
    const lang = 'en'
    saveLang(lang);
    setLangSelector(lang);
    translatePage(lang);
});

russian.addEventListener('click', () => {
    const lang = 'ru';
    saveLang(lang);
		setLangSelector(lang);
    translatePage(lang);
});

burgerMenu.addEventListener('click', () => {
    document.body.classList.toggle('_lock');
    burgerMenu.classList.toggle('_open');
    bodyMenu.classList.toggle('_open');
    page.classList.toggle('_open');
    headerLogo.classList.toggle('_open');
});

const changeThemeButton = document.querySelector('#light-mode-button');

function setStatusThemeButton(theme) {
	if (theme !== 'light') {
		changeThemeButton.classList.add('.light');
	}
	else {
		changeThemeButton.classList.remove('.light');
	}
}

changeThemeButton.addEventListener('click', (event) => {

	const theme = localStorage.getItem('theme');
	if (theme === 'light') {
		localStorage.removeItem('theme');
	} else {
		localStorage.setItem('theme', 'light');
	}
	setStatusThemeButton(theme);

	addDarkClassToHTML();
})

function addDarkClassToHTML() {
	if (localStorage.getItem('theme') === 'light') {
			document.querySelector('html').classList.add('light');
		} else {
			document.querySelector('html').classList.remove('light');
	}
}

// ============== PLAYER ===============================================

const progressVideo = document.querySelector('.controls-player__progress');
progressVideo.addEventListener('input', function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${value}%, #c8c8c8 ${value}%, #c8c8c8 100%)`;
  video.currentTime = (value / 100) * video.duration;
});

const playIcon = document.querySelector('.controls-player__icon-play');
playIcon.addEventListener('click', () => {
  playVideo();
});

const bigPlayBtn = document.querySelector('.player__button-play');
const poster = document.querySelector('.player__poster');

[bigPlayBtn, poster].forEach((elem) => {
  elem.addEventListener('click', () => {
    poster.style = 'opacity: 0; pointer-events: none; transition: all 0.7s linear 0s;';
    bigPlayBtn.style = 'opacity: 0;';
    playVideo();
  })
});

function playVideo() {
  if (playIcon.classList.contains('play')) {
    playIcon.classList.remove('play');
    playIcon.classList.add('pause');
    video.play();
    bigPlayBtn.style = 'display: none;';
  } else {
    playIcon.classList.remove('pause');
    playIcon.classList.add('play');
    video.pause();
    bigPlayBtn.style = 'display: block;';
  }
}

const progressVolume = document.querySelector('.controls-player__progress-volume');
const volumeIcon = document.querySelector('.controls-player__icon-volume');

progressVolume.addEventListener('input', function () {
  volumeIcon.classList.remove('mute-volume');
  volumeIcon.classList.add('icon-volume');
  const value = this.value;
  video.volume = value / 100;
  localStorage.setItem('volume', video.volume);
  this.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${value}%, #c8c8c8 ${value}%, #c8c8c8 100%)`;
  if (video.volume === 0) {
    volumeIcon.classList.remove('icon-volume');
    volumeIcon.classList.add('mute-volume');
  }
});

volumeIcon.addEventListener('click', function () {
  if (volumeIcon.classList.contains('icon-volume')) {
    volumeIcon.classList.remove('icon-volume');
    volumeIcon.classList.add('mute-volume');
    video.volume = 0;
    progressVolume.value = 0;
    progressVolume.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${video.volume}%, #c8c8c8 ${video.volume}%, #c8c8c8 100%)`;

  } else {
    volumeIcon.classList.remove('mute-volume');
    volumeIcon.classList.add('icon-volume');
    video.volume = localStorage.getItem('volume');
    progressVolume.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${video.volume * 100}%, #c8c8c8 ${video.volume * 100}%, #c8c8c8 100%)`;
    progressVolume.value = video.volume * 100;
  }
});

const video = document.querySelector('.player__viewer');
video.addEventListener('click', () => {
  playVideo();
});

video.ontimeupdate = progressUpdate;

function progressUpdate() {
  const fullDuration = video.duration;
  const curTime = video.currentTime;
  progressVideo.value = (curTime / fullDuration) * 100;
  progressVideo.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${progressVideo.value}%, #c8c8c8 ${progressVideo.value}%, #c8c8c8 100%)`;
  if (progressVideo.value === '100') {
    playVideo();
    bigPlayBtn.style = 'display: block;';
  }
}

const fullscreen = document.querySelector('.controls-player__fullscreen');
fullscreen.addEventListener('click', () => {
  if (video.webkitSupportsFullscreen) {
    video.webkitEnterFullScreen();
  }
});

// ============== / PLAYER =============================================

function initFromLocalStorage() {
	const lang = getLang();
	if (lang) {
		translatePage(lang);
		setLangSelector(lang);
	}
	const theme = localStorage.getItem('theme');
	if (theme) {
		if (!htmlTag.classList.contains(theme)) {
			htmlTag.classList.add(theme);
			changeThemeButton.classList.add('.light');
		}
	}
	if (!theme) {
		changeThemeButton.classList.remove('.light');
  }
  video.volume = 50 / 100;
  localStorage.setItem('volume', video.volume);
}

window.addEventListener('load', () => {
    initFromLocalStorage();
});
