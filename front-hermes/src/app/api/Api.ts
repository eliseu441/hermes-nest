import axios from 'axios';

//const baseURL = `/api`
const baseURL = `http://localhost:5000/api`

export default axios.create({
	baseURL,
	headers: {
		ContentType: 'application/json',
	},
});
