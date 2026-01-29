import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = null;

// Инициализация SimpleLightbox
export function initLightbox() {
  if (lightbox) {
    lightbox.destroy();
  }
  lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

// Обновление SimpleLightbox
export function refreshLightbox() {
  if (lightbox) {
    lightbox.refresh();
  }
}

// Создание галереи
export function createGallery(images) {
  const gallery = document.querySelector('.gallery');
  if (!gallery) {
    console.error('Gallery element not found');
    return;
  }

  // Если нет изображений - показываем сообщение
  if (!Array.isArray(images) || images.length === 0) {
    gallery.innerHTML =
      '<p class="no-results">No images found. Try another search.</p>';
    return;
  }

  // Создаем разметку для галереи
  const markup = images
    .map(
      image => `
    <li class="gallery-item">
      <a class="gallery-link" href="${image.largeImageURL}">
        <img 
          class="gallery-image" 
          src="${image.webformatURL}" 
          alt="${image.tags}" 
          loading="lazy" 
          width="360"
          height="200"
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
      </a>
    </li>
  `
    )
    .join('');

  gallery.innerHTML = markup;
  initLightbox();
}

// Добавление новых изображений для кнопки "Load more"
export function appendGallery(images) {
  const gallery = document.querySelector('.gallery');
  if (!gallery) {
    console.error('Gallery element not found');
    return;
  }

  if (!Array.isArray(images) || images.length === 0) {
    return;
  }

  const markup = images
    .map(
      image => `
    <li class="gallery-item">
      <a class="gallery-link" href="${image.largeImageURL}">
        <img 
          class="gallery-image" 
          src="${image.webformatURL}" 
          alt="${image.tags}" 
          loading="lazy" 
          width="360"
          height="200"
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
      </a>
    </li>
  `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  refreshLightbox();
}

// Очистка галереи
export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    gallery.innerHTML = '';
  }
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
}

// Показать лоадер
export function showLoader() {
  const loader = document.querySelector('.loader-container');
  if (loader) {
    loader.style.display = 'flex';
  }
}

// Скрыть лоадер
export function hideLoader() {
  const loader = document.querySelector('.loader-container');
  if (loader) {
    loader.style.display = 'none';
  }
}

// Показать кнопку "Load more"
export function showLoadMoreButton() {
  const loadMoreContainer = document.querySelector('.load-more-container');
  if (loadMoreContainer) {
    loadMoreContainer.style.display = 'flex';
  }
}

// Скрыть кнопку "Load more"
export function hideLoadMoreButton() {
  const loadMoreContainer = document.querySelector('.load-more-container');
  if (loadMoreContainer) {
    loadMoreContainer.style.display = 'none';
  }
}
