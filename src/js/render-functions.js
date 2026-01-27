import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function createGallery(images) {
  const gallery = document.querySelector('.gallery');

  if (!images || !images.hits || images.hits.length === 0) {
    gallery.innerHTML =
      '<p class="no-results">No images found. Try another search.</p>';
    return;
  }

  const markup = images.hits
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

  gallery.innerHTML = markup;

  // Инициализируем SimpleLightbox
  if (!window.lightbox) {
    window.lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    window.lightbox.refresh();
  }
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    gallery.innerHTML = '';
  }
  if (window.lightbox) {
    window.lightbox.destroy();
    window.lightbox = null;
  }
}

export function showLoader() {
  const loader = document.querySelector('.loader-container');
  if (loader) {
    loader.style.display = 'flex';
  }
}

export function hideLoader() {
  const loader = document.querySelector('.loader-container');
  if (loader) {
    loader.style.display = 'none';
  }
}
