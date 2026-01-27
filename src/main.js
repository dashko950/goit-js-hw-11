import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

console.log('App loaded successfully!');

// Элементы DOM
const form = document.querySelector('.form');
const mainElement = document.querySelector('main');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader-container');

// Переменные состояния
let currentPage = 1;
let currentQuery = '';
let isLoading = false;
let totalHits = 0;

// Изначально скрываем main
mainElement.style.display = 'none';

// Обработчик формы
form.addEventListener('submit', async e => {
  e.preventDefault();

  if (isLoading) {
    console.log('Already loading, please wait...');
    return;
  }

  const searchQuery = form.elements['search-text'].value.trim();

  if (!searchQuery) {
    showWarningToast('Please enter a search term');
    return;
  }

  // Сброс состояния
  currentQuery = searchQuery;
  currentPage = 1;
  isLoading = true;

  // Показываем лоадер
  showLoader();

  // Очищаем галерею
  clearGallery();

  try {
    console.log(`Starting search for: "${searchQuery}"`);

    // Делаем запрос к API
    const data = await getImagesByQuery(searchQuery, currentPage);
    console.log('Data received, total hits:', data.totalHits);

    // Скрываем лоадер
    hideLoader();
    isLoading = false;

    // Показываем main
    mainElement.style.display = 'block';
    mainElement.classList.add('has-results');

    // Проверяем результаты
    if (!data || !data.hits || data.hits.length === 0) {
      console.log('No images found for query:', searchQuery);
      showErrorToast(
        'Sorry, there are no images matching your search query. Please try again!'
      );

      // Показываем сообщение в галерее
      gallery.innerHTML =
        '<p class="no-results">No images found. Try another search term.</p>';
      return;
    }

    // Сохраняем общее количество найденных изображений
    totalHits = data.totalHits || data.hits.length;
    console.log(
      `Found ${totalHits} total hits, showing ${data.hits.length} images`
    );

    // Показываем галерею
    createGallery(data);

    // Прокручиваем к результатам
    setTimeout(() => {
      mainElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  } catch (error) {
    console.error('Search error:', error);
    hideLoader();
    isLoading = false;

    // Проверяем тип ошибки для правильного сообщения
    if (error.message.includes('Rate limit')) {
      showErrorToast(
        'Rate limit exceeded. Please wait a minute before searching again.'
      );
    } else if (error.message.includes('Network')) {
      showErrorToast('Network error. Please check your internet connection.');
    } else {
      showErrorToast(
        'An error occurred while fetching images. Please try again later.'
      );
    }

    // Показываем сообщение об ошибке
    gallery.innerHTML = `<p class="no-results">Error loading images. Please try again.</p>`;
  }
});

// Обработчик бесконечной прокрутки
window.addEventListener('scroll', () => {
  if (isLoading || !currentQuery) return;

  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  // Если пользователь прокрутил до конца страницы
  if (scrollTop + clientHeight >= scrollHeight - 500) {
    loadMoreImages();
  }
});

// Функция для загрузки дополнительных изображений
async function loadMoreImages() {
  if (isLoading) return;

  // Проверяем, есть ли еще изображения для загрузки
  const loadedImages = currentPage * 40;
  if (loadedImages >= totalHits) {
    console.log('All images loaded');
    return;
  }

  isLoading = true;
  showLoader();

  try {
    currentPage++;
    console.log(`Loading more images, page ${currentPage}`);

    const data = await getImagesByQuery(currentQuery, currentPage);

    if (data.hits && data.hits.length > 0) {
      // Добавляем новые изображения
      const newMarkup = data.hits
        .map(
          image => `
        <li class="gallery-item">
          <a class="gallery-link" href="${image.largeImageURL}">
            <div class="gallery-card">
              <img 
                class="gallery-image" 
                src="${image.webformatURL}" 
                alt="${image.tags}" 
                loading="lazy" 
              />
              <div class="image-info">
                <div class="info-item">
                  <span class="info-label">Likes</span>
                  <span class="info-value">${image.likes}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Views</span>
                  <span class="info-value">${image.views}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Comments</span>
                  <span class="info-value">${image.comments}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Downloads</span>
                  <span class="info-value">${image.downloads}</span>
                </div>
              </div>
            </div>
          </a>
        </li>
      `
        )
        .join('');

      gallery.insertAdjacentHTML('beforeend', newMarkup);

      // Обновляем лайтбокс
      if (window.lightbox) {
        window.lightbox.refresh();
      }

      // Плавная прокрутка к новым изображениям
      const galleryItems = document.querySelectorAll('.gallery-item');
      if (galleryItems.length > 0) {
        const lastItem = galleryItems[galleryItems.length - 1];
        lastItem.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }
    }
  } catch (error) {
    console.error('Load more error:', error);
    showErrorToast('Failed to load more images.');
    currentPage--;
  } finally {
    hideLoader();
    isLoading = false;
  }
}

// Функции для уведомлений
function showErrorToast(message) {
  iziToast.error({
    title: '',
    message: message,
    position: 'topRight',
    timeout: 5000,
    backgroundColor: '#EF4040',
    theme: 'dark',
    progressBarColor: '#D32F2F',
    iconColor: '#FFFFFF',
    titleColor: '#FFFFFF',
    messageColor: '#FFFFFF',
    close: true,
    closeOnEscape: true,
    closeOnClick: true,
    displayMode: 'replace',
  });
}

function showWarningToast(message) {
  iziToast.warning({
    title: '',
    message: message,
    position: 'topRight',
    timeout: 3000,
    backgroundColor: '#FFC107',
    theme: 'dark',
    progressBarColor: '#FFA000',
    iconColor: '#FFFFFF',
    titleColor: '#FFFFFF',
    messageColor: '#FFFFFF',
    close: false,
    closeOnEscape: true,
    closeOnClick: false,
  });
}
