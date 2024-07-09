import axios from 'axios';
console.log(import.meta.env.VITE_URL_API)
//const baseURL = `http://127.0.0.1:8080/api/`
const baseURL = import.meta.env.VITE_URL_API
//const baseURL = `http://hermes-vite-eliseu441s-projects.vercel.app/api/`
//const baseURL = `http://34.121.103.54/api/`

export default axios.create({
	baseURL,
	headers: {
		ContentType: 'application/json',
	},
});
