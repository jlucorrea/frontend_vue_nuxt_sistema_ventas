export default function ({ $axios }, inject) {
	// Create a custom axios instance
	const api = $axios.create({
	  headers: {
		common: {
		  Accept: 'text/plain, */*'
		}
	  }
	})
	// Add CORS headers
	// api.setHeader('Access-Control-Allow-Origin', '*')
	// api.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
	// api.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  
	// Set baseURL to something different
	api.setBaseURL('http://127.0.0.1:8000/api/')
	
	// Inject to context as $api
	inject('api', api)
  }