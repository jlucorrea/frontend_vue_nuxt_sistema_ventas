<template>
	<el-dialog :title="titleDialog" :visible="isModalVisible" @close="close" @open="create" append-to-body
		:close-on-modal="false" :show-close="false" :close-on-click-modal="false">
		<form class="multisteps-form__form" autocomplete="off" @submit.prevent="submit">
			<div class="multisteps-form__content">
				<div class="row">
					<input v-model="form.articulo_id" type="hidden">
					<div class="col-12 col-sm-6">
						<label class="">Tipo de Ajuste</label><br>
						<el-select v-model="form.tipo" clearable placeholder="Tipo">
							<el-option v-for="item in tipos" :key="item.tipo" :label="item.nombre" :value="item.tipo"></el-option>
						</el-select>
					</div>
					<div class="col-12 col-sm-6">
						<label>Motivo</label>
						<input class="multisteps-form__input form-control" v-model="form.motivo" type="text"
							placeholder="Motivo">
						<small class="text-danger" v-if="errors.motivo" v-text="errors.motivo[0]"></small>
					</div>
					<div class="col-12 col-sm-6">
						<label>Cantidad</label>
						<input class="multisteps-form__input form-control" v-model="form.cantidad" type="text" placeholder="Cantidad">
					</div>
					<div class="col-6">
						<div class="form-group has-success">
							<label for="">Precio Compra</label>
							<input type="text" placeholder="" class="form-control" v-model="form.compra" />
						</div>
					</div>
					<div class="col-6">
						<div class="form-group has-success">
							<label for="">Precio Venta</label>
							<input type="text" placeholder="" class="form-control" v-model="form.venta" />
						</div>
					</div>
				</div>
				<div class="button-row d-flex mt-4">
					<button class="btn btn-sm bg-gradient-danger ms-autojs-btn-next" @click.prevent="close()" type="button"
						title="Salir">Salir</button>
					<button class="btn btn-sm bg-gradient-dark ms-autojs-btn-next" type="submit"
						title="Guardar">Ajustar</button>
				</div>
			</div>
		</form>
	</el-dialog>
</template>
<script>

export default {
	props: ['isModalVisible', 'recordId'],
	data() {
		return {
			titleDialog: null,
			resource: 'inventarios',
			errors: {},
			form: {},
			tipos: [
				{ tipo: 1, nombre: 'Entrada' },
				{ tipo: 2, nombre: 'Salida' }
			],
			
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
				motivo: null,
				articulo_id: null,
				compra: 0,
				venta: 0,
				cantidad: 0,
				tipo: 1
			}
		},
		async GET_DATA(path) {
			const apiData = await this.$api.$get(path);
			return apiData;
		},
		create() {
			this.titleDialog = 'Ajustar Stock';
			if (this.recordId) {
				this.$api.$get(`/${this.resource}/${this.recordId}`)
				.then(response => {
					this.form = response.data;
					this.form.articulo_id = response.data.id;
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