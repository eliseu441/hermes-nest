import axios from 'axios';

//const baseURL = `http://127.0.0.1:8080/api/`
const baseURL = `https://hermes-vite-eliseu441s-projects.vercel.app/api/`
//const baseURL = `http://34.121.103.54/api/`

export default axios.create({
	baseURL,
	headers: {
		ContentType: 'application/json',
	},
});
