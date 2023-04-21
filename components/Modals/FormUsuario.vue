<template>
	<el-dialog :title="titleDialog" :visible="isModalVisible" @close="close" @open="create" append-to-body :close-on-modal="false" :show-close="false" :close-on-click-modal="false">
		<form class="multisteps-form__form" autocomplete="off" @submit.prevent="submit">
			<div class="multisteps-form__content">
				<div class="row">
					<div class="col-12 col-sm-6">
						<label>Nombre</label>
						<input v-model="formData.nombre" class="multisteps-form__input form-control" type="text" placeholder="Nombre">
					</div>
					<div class="col-12 col-sm-6">
						<label>Usuario</label>
						<input v-model="formData.username" class="multisteps-form__input form-control" type="text" placeholder="Usuario">
					</div>
					<div class="col-12 col-sm-6">
						<label>Email</label>
						<input v-model="formData.email" class="multisteps-form__input form-control" type="email">
					</div>
					<div class="col-12 col-sm-6">
						<label>Contraseña</label>
						<input v-model="formData.password" class="multisteps-form__input form-control" type="password">
					</div>
					<div class="col-12 col-sm-6">
						<label>Confirmar Contraseña</label>
						<input v-model="formData.confirmed_password" class="multisteps-form__input form-control" type="password">
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
			resource: 'usuarios',
			formData: { ...this.formulario }
		}
	},
	created() {
		this.initForm();
	},
	methods: {
		initForm(){
			this.formData = {
				nombre: null,
				username: null,
				email: null,
				password: null,
				confirmed_password: null
			}
		},
		create() {
			this.titleDialog = (this.formulario.id) ? 'Editar Usuario' : 'Regisrar Usuario'
			if(this.formulario.id){
				this.formData = this.formulario;
			}
		},
		async submit() {
			try {
				if(this.formData.password != this.formData.confirmed_password){
					return this.$message.error('Las contrseñas no coinciden');
				}

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