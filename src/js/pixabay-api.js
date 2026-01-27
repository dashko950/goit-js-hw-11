const API_KEY = '50736279-c1f88b0db9e0d00ad72cdf14a';
const BASE_URL = 'https://pixabay.com/api/';
import axios from 'axios';

export async function getImagesByQuery(query, page = 1) {
  const params = {
    key: API_KEY,
    q: encodeURIComponent(query),
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 40,
  };

  try {
    console.log(`Searching Pixabay for: "${query}", page: ${page}`);
    const response = await axios.get(BASE_URL, { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching images from Pixabay:', error.message);

    if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded');
    } else if (error.response?.status === 400) {
      throw new Error('Invalid API request');
    } else {
      throw new Error('Network error');
    }
  }
}
