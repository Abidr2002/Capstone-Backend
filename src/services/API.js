import axios from 'axios';

const apiKey = '224fdd7405614aa3a515d6d61f3efa75';

const getHealthNews = async () => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=${apiKey}`, {withCredentials: false,}
    );
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching health news:', error);
    return [];
  }
};

export default getHealthNews;
