import axios from 'axios';

export default class NewsApiService {
  constructor() {
    this.perPage = 12;
  }
  async fetchArticles({ page, searchQuery }) {
    const API_KEY = '32899430-8e4282f6a276a3be5999f0793';
    const instance = axios.create({
      baseURL: 'https://pixabay.com/api/',
      timeout: 1000,
      params: {
        key: `${API_KEY}`,
        q: `${searchQuery}`,
        page: `${page}`,
        per_page: `${this.perPage}`,
        image_type: 'photo',
        orientation: 'horizontal',
      },
    });
    const response = await instance;
    return response()
      .then(response => {
        return response.data;
      })
      .catch(error => console.log(error));
  }
}
