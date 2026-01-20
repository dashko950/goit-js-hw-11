import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
let lightbox;

export function createGallery(images) {
  const markup = images
    .map(image => {
      return `
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
      `;
    })
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);

  // Инициализируем или обновляем lightbox
  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
}

export function showLoader() {
  const loaderContainer = document.querySelector('.loader-container');
  if (loaderContainer) {
    loaderContainer.style.display = 'flex';
  }
}

export function hideLoader() {
  const loaderContainer = document.querySelector('.loader-container');
  if (loaderContainer) {
    loaderContainer.style.display = 'none';
  }
}
