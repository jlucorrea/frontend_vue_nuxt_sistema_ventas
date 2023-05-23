export default function ({ $axios }, inject) {
	// Create a custom axios instance
	const api = $axios.create({
	  headers: {
		common: {
		  Accept: 'text/plain, */*'
		}
	  }
	})
	let url = 'http://127.0.0.1:8000/api/'
	// http://api_laravel_sistema_ventas.test/public/api/ or http://127.0.0.1:8000/api/
	api.url = url
	// Set baseURL to something different
	api.setBaseURL(url)
	
	// Inject to context as $api
	inject('api', api)
}