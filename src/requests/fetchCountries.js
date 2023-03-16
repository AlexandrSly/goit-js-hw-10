const baseURL = 'https://restcountries.com/v3.1/';

const instance = axios.create({
  baseURL: 'https://dummyjson.com',
});

export async function fetchCountries() {
  const postObject = {
    title: 'I changed',
  };
  try {
    const result = await baseURL.put('all/', postObject);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
