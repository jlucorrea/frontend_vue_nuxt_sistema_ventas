<template>
<el-dialog :title="titleDialog" :visible="isModalVisible" @close="close" @open="create" append-to-body :close-on-modal="false" :show-close="false" :close-on-click-modal="false">
	<form class="multisteps-form__form" autocomplete="off">
		<div class="multisteps-form__content">
			<div class="row">
				<div class="col-12 col-sm-6">
					<label>Nombre</label>
					<input class="multisteps-form__input form-control" v-model="newForm.nombre" type="text" placeholder="Nombre">
				</div>
				<div class="col-12 col-sm-6 mt-3 mt-sm-0">
					<label>Total</label>
					<input class="multisteps-form__input form-control" v-model="newForm.cantidad" type="text" placeholder="P. Compra">
				</div>
				<div class="col-12 col-sm-6 mt-3 mt-sm-0">
					<label>Total</label>
					<input class="multisteps-form__input form-control" v-model="newForm.total" type="text" placeholder="P. Compra">
				</div>
			</div>
			<div class="button-row d-flex mt-4">
				<button class="btn btn-sm bg-gradient-danger ms-autojs-btn-next" @click.prevent="close()" type="button" title="Salir">Salir</button>
				<button class="btn btn-sm bg-gradient-dark ms-autojs-btn-next" @click.prevent="saveEditArticulo(newForm)" title="Guardar">Guardar</button>
			</div>
		</div>
	</form>
</el-dialog>
</template>

<script>
export default {
	props: {
		isModalVisible: {
			type: Boolean,
			required: true
		},
		newForm: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			titleDialog: null
		}
	},
	methods: {
		create() {
			this.titleDialog = 'Actualizar Articulo';
		},
		saveEditArticulo(data){
			this.$emit('saveEditArticulo', data);
		},
		close() {
			this.$emit('update:isModalVisible', false)
		},
	}
}
</script>