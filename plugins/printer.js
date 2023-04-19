export default function ({ $axios }, inject) {
	// Create a custom axios instance
	const printer = $axios.create({
	  headers: {
		common: {
		  Accept: 'text/plain, */*'
		}
	  }
	})
	// Inject to context as $api
	inject('printer', printer)
}