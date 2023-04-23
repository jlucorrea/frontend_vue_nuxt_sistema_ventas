<template>
	<el-dialog :title="titleDialog" :visible="isModalVisible" @close="close" @open="create" append-to-body>
		<form class="multisteps-form__form" autocomplete="off" @submit.prevent="submit">
			<div class="multisteps-form__content">
				<div class="row">
					<div class="col-12 col-sm-6">
						<label>Motivo *</label>
						<input v-model="form.motivo" class="multisteps-form__input form-control" type="text" placeholder="Motivo">
						<small class="text-danger" v-if="errors.motivo" v-text="errors.motivo[0]"></small>
					</div>
					<div class="col-12 col-sm-6">
						<label>Monto *</label>
						<input v-model="form.monto" class="multisteps-form__input form-control" type="number" placeholder="Monto" step="0.01">
						<small class="text-danger" v-if="errors.monto" v-text="errors.monto[0]"></small>
					</div>
					<div class="col-12 col-sm-6 mt-2">
						<select class="form-control" v-model="form.tipo">
							<option class="text-dark" v-for="option in tipos" :value="option.id">{{ option.nombre }}</option>
						</select>
					</div>
				</div>
				<div class="button-row d-flex mt-4">
					<button class="btn btn-sm bg-gradient-danger ms-autojs-btn-next" @click.prevent="close()" type="button" title="Salir">Salir</button>
					<button class="btn btn-sm bg-gradient-dark ms-autojs-btn-next mx-2" type="submit" title="Guardar">Guardar</button>
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
			cajaId:{
				type: Number,
				default: null
			}
		},
		data() {
			return {
				titleDialog: null,
				resource: 'cajamovimientos',
				form: {},
				errors: {},
				tipos: [
					{id: 1, nombre: 'Ingreso'},
					{id: 2, nombre: 'Salida'}
				]
			}
		},
		methods: {
			initForm(){
				this.errors = {},
				this.form = {
					motivo: null,
					monto: null,
					tipo: 1,
					caja_id: this.cajaId
				}
			},
			create(){
				this.titleDialog = 'Moviento de caja';
				this.initForm();
			},
			async submit() {
				try {
					if(!this.form.motivo || !this.form.monto){
						this.$message.error('El motivo y monto son obligatorios');
						return false;
					}
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
			close(){
				this.$emit('update:isModalVisible', false)
				this.initForm()
			}
		}
	}
</script>