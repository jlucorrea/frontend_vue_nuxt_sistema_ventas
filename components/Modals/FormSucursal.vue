<template>
	<el-dialog :title="titleDialog" :visible="isModalVisible" @close="close" @open="create" append-to-body :close-on-modal="false" :show-close="false" :close-on-click-modal="false">
		<form class="multisteps-form__form" autocomplete="off" @submit.prevent="submit">
			<div class="multisteps-form__content">
				<div class="row">
					<div class="col-12 col-sm-6">
						<label>Codigo</label>
						<input v-model="formData.codigo" class="multisteps-form__input form-control" type="text" placeholder="Codigo">
					</div>
					<div class="col-12 col-sm-6">
						<label>Descripción</label>
						<input v-model="formData.nombre" class="multisteps-form__input form-control" type="text" placeholder="Descripción">
					</div>
					<div class="col-12 col-sm-6">
						<label>Dirección</label>
						<input v-model="formData.direccion" class="multisteps-form__input form-control" type="text">
					</div>
					<div class="col-12 col-sm-6">
						<label>Telefono</label>
						<input v-model="formData.telefono" class="multisteps-form__input form-control" type="text">
					</div>
					<div class="col-12 col-sm-6">
						<label>Impresora</label>
						<input v-model="formData.impresora" class="multisteps-form__input form-control" type="text">
					</div>
					<div class="col-12 col-sm-6">
						<label>Url Print</label>
						<input v-model="formData.impresora_url" class="multisteps-form__input form-control" type="text">
					</div>
				</div>
				<div class="button-row d-flex mt-4">
					<button class="btn btn-sm bg-gradient-danger ms-autojs-btn-next" @click.prevent="close()" type="button" title="Salir">Salir</button>
					<button class="btn btn-sm bg-gradient-dark ms-autojs-btn-next" type="submit" title="Guardar">Guardar</button>
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
		formulario: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			titleDialog: null,
			resource: 'sucursales',
			formData: { ...this.formulario }
		}
	},
	created() {
		this.initForm();
	},
	methods: {
		initForm(){
			this.formData = {
				codigo: null,
				nombre: null,
				direccion: null,
				telefono: null,
				impresora: null,
				impresora_url: null
			}
		},
		create() {
			this.titleDialog = (this.formulario.id) ? 'Editar Sucursal' : 'Regisrar Sucursal'
			if(this.formulario.id){
				this.formData = this.formulario;
			}
		},
		async submit() {
			try {
				await this.$api.$post(this.resource, this.formData)
				.then(response => {
					if (response.success) {
						this.$message.success(response.message)
						this.$eventHub.$emit('reloadData')
						this.close()
					} else {
						this.$message.error(response.message)
					}
				})
				.catch(error => {
					if (error.response.status === 422) {
						this.errors = error.response.data 
					} else {
						console.log(error)
					}
				})
			} catch (error) {
				console.log(error);
			}
		},
		close() {
			this.$emit('update:isModalVisible', false)
			this.initForm()
		},
	}
}
</script>