<template>
	<el-dialog :title="titleDialog" :visible="isModalVisible" @close="close" @open="create" append-to-body :close-on-modal="false" :show-close="false" :close-on-click-modal="false">
		<form class="multisteps-form__form" autocomplete="off" @submit.prevent="submit">
			<div class="multisteps-form__content">
				<div class="row">
					<div class="col-12 col-sm-6" v-if="nameResource=='medidas'">
						<label>Codigo</label>
						<input class="multisteps-form__input form-control" v-model="form.codigo" type="text" placeholder="Codigo">
					</div>
					<div class="col-12 col-sm-6">
						<label>Descripción</label>
						<input class="multisteps-form__input form-control" v-model="form.nombre" type="text" placeholder="Descripción">
						<small class="text-danger" v-if="errors.nombre" v-text="errors.nombre[0]"></small>
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
	props: ['isModalVisible', 'recordId','nameResource','titleResource'],
	data() {
		return {
			titleDialog: null,
			resource: this.nameResource,
			errors: {},
			form: {}
		}
	},
	created() {
		this.initForm();
	},
	methods: {
		initForm() {
			this.errors = {}
			this.form = {
				id: null,
				codigo: null,
				nombre: null
			}
		},
		create() {
			this.titleDialog = (this.recordId)? 'Editar' + ' ' + this.titleResource : 'Registrar' + ' ' + this.titleResource;
			if (this.recordId) {
				this.$api.$get(`/${this.resource}/${this.recordId}`)
				.then(response => {
					this.form = response;
				})
			}
		},
		async submit() {
			try {
				await this.$api.$post(this.resource, this.form)
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