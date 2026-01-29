import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  appendGallery,
  refreshLightbox,
} from './js/render-functions.js';

// Элементы DOM
const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more-btn');

// Переменные состояния
let currentPage = 1;
let currentQuery = '';
let isLoading = false;
let totalHits = 0;
let loadedHits = 0;

// Изначально скрываем кнопку Load more
hideLoadMoreButton();

// Обработчик формы
form.addEventListener('submit', handleFormSubmit);

// Обработчик кнопки Load more
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleFormSubmit(e) {
  e.preventDefault();

  // Получаем поисковый запрос
  const searchInput = form.elements['search-text'];
  const searchQuery = searchInput.value.trim();

  // Проверка на пустой запрос
  if (!searchQuery) {
    showWarning('Please enter a search term');
    return;
  }

  // Если уже идет загрузка - выходим
  if (isLoading) return;

  // Сбрасываем состояние
  currentQuery = searchQuery;
  currentPage = 1;
  isLoading = true;

  // Показываем лоадер, скрываем кнопку Load more
  showLoader();
  hideLoadMoreButton();

  // Очищаем галерею
  clearGallery();

  try {
    // Делаем запрос к API
    const data = await getImagesByQuery(searchQuery, currentPage);

    // Скрываем лоадер
    hideLoader();
    isLoading = false;

    // Проверяем наличие результатов
    if (!data.hits || data.hits.length === 0) {
      showNoResultsMessage();
      return;
    }

    // Сохраняем общее количество найденных изображений
    totalHits = data.totalHits;
    loadedHits = data.hits.length;

    // Показываем галерею
    createGallery(data.hits);

    // Проверяем, нужно ли показывать кнопку Load more
    if (loadedHits < totalHits) {
      showLoadMoreButton();
    }
  } catch (error) {
    // Скрываем лоадер в случае ошибки
    hideLoader();
    isLoading = false;

    // Показываем сообщение об ошибке
    showError('An error occurred while fetching images. Please try again.');
    console.error('Search error:', error);
  }
}

async function handleLoadMore() {
  // Если уже идет загрузка или нет больше изображений - выходим
  if (isLoading || loadedHits >= totalHits) return;

  isLoading = true;
  showLoader();

  try {
    currentPage++;

    // Делаем запрос к API
    const data = await getImagesByQuery(currentQuery, currentPage);

    // Если нет новых изображений
    if (!data.hits || data.hits.length === 0) {
      hideLoadMoreButton();
      showInfo('No more images to load.');
      return;
    }

    // Добавляем новые изображения в галерею
    appendGallery(data.hits);
    loadedHits += data.hits.length;

    // Обновляем SimpleLightbox
    refreshLightbox();

    // Прокручиваем страницу к новым изображениям
    scrollToNewImages();

    // Проверяем, нужно ли еще показывать кнопку Load more
    if (loadedHits >= totalHits) {
      hideLoadMoreButton();
      showInfo("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    // В случае ошибки возвращаемся на предыдущую страницу
    currentPage--;

    // Показываем сообщение об ошибке
    showError('Failed to load more images. Please try again.');
    console.error('Load more error:', error);
  } finally {
    // Всегда скрываем лоадер
    hideLoader();
    isLoading = false;
  }
}

// Функция для прокрутки к новым изображениям
function scrollToNewImages() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length > 0) {
    const secondLastItem = galleryItems[galleryItems.length - 2];
    if (secondLastItem) {
      secondLastItem.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
}

// Функция для показа сообщения "нет результатов"
function showNoResultsMessage() {
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    gallery.innerHTML = `
      <p class="no-results">
        Sorry, there are no images matching your search query. Please try again!
      </p>
    `;
  }
}

// Функции для уведомлений
function showError(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
    timeout: 5000,
    backgroundColor: '#EF4040',
    theme: 'dark',
    progressBarColor: '#D32F2F',
  });
}

function showWarning(message) {
  iziToast.warning({
    title: 'Warning',
    message: message,
    position: 'topRight',
    timeout: 3000,
    backgroundColor: '#FFC107',
    theme: 'dark',
    progressBarColor: '#FFA000',
  });
}

function showInfo(message) {
  iziToast.info({
    title: 'Info',
    message: message,
    position: 'topRight',
    timeout: 3000,
    backgroundColor: '#4e75ff',
    theme: 'dark',
    progressBarColor: '#6c8cff',
  });
}
