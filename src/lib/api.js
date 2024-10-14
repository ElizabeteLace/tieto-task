import axios from 'axios';

const API_KEY = 'UK4F8eHw'; // Use your provided key

// Fetch 3 artworks
export const fetchArtworks = async (p) => {
  const response = await axios.get(
    `https://www.rijksmuseum.nl/api/en/collection?key=${API_KEY}&ps=3&p=${p}`
  );
  return response.data.artObjects;
};

// Fetch details of a single artwork by ID
export const fetchArtworkDetails = async (id) => {
  const response = await axios.get(
    `https://www.rijksmuseum.nl/api/en/collection/${id}?key=${API_KEY}`
  );
  return response.data.artObject;
};
