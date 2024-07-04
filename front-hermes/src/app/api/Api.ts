import axios from 'axios';

//const baseURL = `/api`
const baseURL = `http://34.121.103.54/api`

export default axios.create({
	baseURL,
	headers: {
		ContentType: 'application/json',
	},
});
