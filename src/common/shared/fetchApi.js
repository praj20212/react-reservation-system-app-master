
const rootPoint = '/api';

/*method to call api and return response*/
const fetchGet = (endPoint) => {
	return fetch(`${rootPoint}/${endPoint}`, {"mode": "cors"}).then((response) => {
		if(response.ok) {
			return response.json();
		}
		throw new Error('Network response was not ok.');
	}).catch(function(error) {
		console.log('There has been a problem with your fetch operation: ' + error.message);
	});
}

const fetchPost = (endPoint, data) => {
	return fetch(`${rootPoint}/${endPoint}`, {
		method: 'post',
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
			"mode": "cors"
		}
	}).then(function(response) {
		if(response.ok) {
			return response.json();
		}
		throw new Error('Network response was not ok.');
	}).catch(function(error) {
		console.log('There has been a problem with your fetch operation: ' + error.message);
	});
}

export {
	fetchGet,
	fetchPost
}