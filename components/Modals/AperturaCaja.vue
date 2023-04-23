<template>
	<el-dialog :title="titleDialog" :visible="isModalApertura" @close="close" @open="create" :width="'40%'" :height="300"
		append-to-body>
		<form class="multisteps-form__form" autocomplete="off" @submit.prevent="submit">
			<div class="multisteps-form__content">
				<div class="d-flex justify-content-between mt-2">
					<label class="text-uppercase">{{ formUser.nombre }}</label>
					<div class="button-row text-center">
						<button class="btn btn-sm bg-gradient-danger ms-autojs-btn-next" @click.prevent="close()"
							type="button" title="Salir">
							Cancelar
						</button>
						<button class="btn btn-sm bg-gradient-dark ms-autojs-btn-next mx-2" type="submit" title="Guardar">
							Aperturar
						</button>
					</div>
				</div>
			</div>
		</form>
	</el-dialog>
</template>
<script>
export default {
	props: {
		isModalApertura: {
			type: Boolean,
			required: true
		},
		formUser: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			titleDialog: null,
			resource: 'cajas',
			form: { ...this.formUser }
		}
	},
	methods: {
		initForm() {
			this.form = {
				user_id: null
			}
		},
		create() {
			this.titleDialog = 'Aperturar caja';
			this.initForm();
		},
		async submit() {
			try {
				this.form.user_id = this.formUser.id;
				await this.$api.$post(this.resource, this.form)
					.then(response => {
						if (response.success) {
							this.$message.success(response.message)
							this.$eventHub.$emit('reloadData')
							this.close()
						} else {
							this.$message.error(response.errors)
						}
					})
					.catch(error => {
						if (error.response.status === 422) {
							this.errors = error.response.data.errors
						} else {
							console.log(error)
						}
					})
			} catch (error) {
				console.log(error);
			}
		},
		close() {
			this.$emit('update:isModalApertura', false)
			this.initForm()
		}
	}
}
</script>