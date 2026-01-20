import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import './css/styles.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const searchForm = document.querySelector('.form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');
const loadMoreContainer = document.querySelector('.load-more-container');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

searchForm.addEventListener('submit', handleSearch);
loadMoreBtn?.addEventListener('click', handleLoadMore);

async function handleSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const searchQuery = form.elements['search-text'].value.trim();

  if (!searchQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term',
      position: 'topRight',
    });
    return;
  }

  try {
    currentQuery = searchQuery;
    currentPage = 1;

    showLoader();
    clearGallery();
    hideLoadMoreButton();

    const data = await getImagesByQuery(searchQuery, currentPage);

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    totalHits = data.totalHits;
    createGallery(data.hits);

    iziToast.success({
      title: 'Success',
      message: `Hooray! We found ${totalHits} images.`,
      position: 'topRight',
    });

    if (totalHits > 40) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message:
        'An error occurred while fetching images. Please try again later.',
      position: 'topRight',
    });
    console.error('Search error:', error);
  } finally {
    hideLoader();
    form.reset();
  }
}

async function handleLoadMore() {
  try {
    showLoader();
    loadMoreBtn.disabled = true;

    currentPage += 1;
    const data = await getImagesByQuery(currentQuery, currentPage);

    createGallery(data.hits);

    // Прокрутка страницы
    const cardHeight = document.querySelector('.gallery-item')?.offsetHeight;
    if (cardHeight) {
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    // Проверяем, есть ли еще изображения
    const loadedImages = currentPage * 40;
    if (loadedImages >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images. Please try again.',
      position: 'topRight',
    });
    console.error('Load more error:', error);
  } finally {
    hideLoader();
    loadMoreBtn.disabled = false;
  }
}

function showLoadMoreButton() {
  if (loadMoreContainer) {
    loadMoreContainer.style.display = 'block';
  }
}

function hideLoadMoreButton() {
  if (loadMoreContainer) {
    loadMoreContainer.style.display = 'none';
  }
}

// Инициализация
hideLoadMoreButton();
