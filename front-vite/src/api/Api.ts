import axios from 'axios';

//const baseURL = `/api`
const baseURL = `http://127.0.0.1:8080/api/`

export default axios.create({
	baseURL,
	headers: {
		ContentType: 'application/json',
	},
});
