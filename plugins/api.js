export default function ({ $axios }, inject) {
	// Create a custom axios instance
	const api = $axios.create({
	  headers: {
		common: {
		  Accept: 'text/plain, */*'
		}
	  }
	})
	let url = 'http://api_facturacion.test/public/api/'
	api.url = url
	// Set baseURL to something different
	api.setBaseURL(url)
	
	// Inject to context as $api
	inject('api', api)
}