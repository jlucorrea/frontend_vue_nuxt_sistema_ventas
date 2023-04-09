<template>
<AdminTemplate>
	<div slot="body">
		<my-producto></my-producto>
	</div>
</AdminTemplate>
</template>
<script>
import Producto from '../components/Views/Producto.vue';

export default {
	components: {
		'my-producto': Producto
	},
	name: 'IndexPage',
	head() {
		return {
			title: 'Index'
		}
	},
	data() {
		return {
			
		}
	},
	methods: {
		
	},
	mounted() {
		
	}
}
</script>