console.log(`
Требования
1. Вёрстка +10
   на странице есть несколько фото и строка поиска +5
   в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2. При загрузке приложения на странице отображаются изображения +10
3. Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10
4. Поиск +30
   при открытии приложения курсор находится в поле ввода +5
   есть placeholder +5
   автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5
   поисковый запрос можно отправить нажатием клавиши Enter +5
   после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5
   в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5
5. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
   высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо - немного изменил на свое усмотрение дизайн. Также, при клике на картинку - она открывается в новом окне. В режиме мобильного устройства картинка открывается двойным touch.

   Итоговая оценка: 70 баллов (60 возможных). Большая просьба - не скрывайте свое имя. Вдруг возникнут вопросы, можно будет их обсудить.
   Связь со мною: телеграм @andrey1509.
   Благодарю за время, уделенное проверке моей работы. Успехов в обучении!
`);

document.querySelectorAll('[data-goto]').forEach((el) => {
  el.addEventListener('click', (e) => {
    const button = e.target;
    if (button.dataset.goto && document.querySelector(button.dataset.goto)) {
      const gotoBlock = document.querySelector(button.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top +
        scrollY - document.querySelector('header').offsetHeight;

      window.scrollTo({
        top: gotoBlockValue,
        behavior: 'smooth',
      });
    };
  });
});

const url = 'https://api.unsplash.com/search/photos?query=cars&per_page=30&client_id=NI1Pc7q9YOqnmurJMYmOQFsj3BXgI6AcksRaYAthaSU';
sendRequest(url);

document.querySelector('.search__panel').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const url = 'https://api.unsplash.com/search/photos?query=' + input.value + '&per_page=30&client_id=NI1Pc7q9YOqnmurJMYmOQFsj3BXgI6AcksRaYAthaSU';
    sendRequest(url);
  }
});

document.querySelector('.search__icon').addEventListener('click', () => {
  const url = 'https://api.unsplash.com/search/photos?query=' + input.value + '&per_page=30&client_id=NI1Pc7q9YOqnmurJMYmOQFsj3BXgI6AcksRaYAthaSU';
  sendRequest(url);
});

async function sendRequest(urlCurrrent) {
  document.querySelector('.images-table').textContent = '';
  const response = await fetch(urlCurrrent);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  const data = await response.json();
  getImage(data);
}

const getImage = (data) => {
  const pageInfoText = document.querySelector('.page__info-text');

  if (data.total === 0) {
    pageInfoText.style = 'display: block;';
  } else {
    pageInfoText.style = 'display: none;';

    for (let i = 0; i < data.results.length; i++) {
      let image = document.createElement('div');
      image.className = 'image';
      image.style.backgroundImage = 'url(' + data.results[i].urls.regular + '&w=1320&h=768' + ')';

      if (document.documentElement.clientWidth > 992) {
        image.addEventListener('click', function () {
          window.open(data.results[i].links.download, '_blank');
        });
      }

      if (document.documentElement.clientWidth <= 992) {
        let lastTap = 0;

        image.addEventListener('touchend', function () {
          let currentTime = new Date().getTime();
          const tapLength = currentTime - lastTap;
          if (tapLength < 500 && tapLength > 0) {
            window.open(data.results[i].links.download, '_blank');
          }

          lastTap = currentTime;
        });
      }

      document.querySelector('.images-table').appendChild(image);
    }
  }
}
