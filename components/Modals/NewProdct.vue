<template>
<el-dialog :title="titleDialog" :visible="isModalVisible" @close="close" @open="create" append-to-body :close-on-modal="false" :show-close="false" :close-on-click-modal="false">
	<form class="multisteps-form__form" autocomplete="off" @submit.prevent="submit">
		<div class="multisteps-form__content">
			<div class="row">
				<div class="col-12 col-sm-6">
					<label>Descripción</label>
					<input class="multisteps-form__input form-control" v-model="form.nombre" type="text" placeholder="Descripción">
					<small class="text-danger" v-if="errors.nombre" v-text="errors.nombre[0]"></small>
				</div>
				<div class="col-12 col-sm-6 mt-3 mt-sm-0">
					<label>Codigo Barra</label>
					<input class="multisteps-form__input form-control" v-model="form.barra" type="text" placeholder="Codigo de Barra">
				</div>
				<div class="col-12 col-sm-6">
					<label>P. Venta</label>
					<input class="multisteps-form__input form-control" v-model="form.venta" type="text" placeholder="P. Venta">
				</div>
				<div class="col-12 col-sm-6 mt-3 mt-sm-0">
					<label>P. Compra</label>
					<input class="multisteps-form__input form-control" v-model="form.compra" type="text" placeholder="P. Compra">
				</div>
				<div class="col-12 col-sm-6">
					<label>Stock Minimo</label>
					<input class="multisteps-form__input form-control" v-model="form.stock_minimo" type="text">
				</div>
				<div class="col-12 col-sm-6">
					<label class="">Categorias</label><br>
					<el-select v-model="form.categoria_id" clearable placeholder="Categorias">
						<el-option v-for="item in options" :key="item.id" :label="item.nombre" :value="item.id"></el-option>
  					</el-select>
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
	props: ['isModalVisible', 'recordId'],
	data() {
		return {
			titleDialog: null,
			resource: 'articulos',
			errors: {},
			form: {},
			options:[
				{id: 1, nombre: 'Abarrotes'},
				{id: 2, nombre: 'Arinas'}
			]
		}
	},
	created() {
		this.initForm();
		this.getTable();
	},
	methods: {
		initForm() {
			this.errors = {}
			this.form = {
				id: null,
				nombre: null,
				barra: null,
				compra: 0,
				venta: 0,
				stock_minimo: 0,
				marca_id: null,
				medida_id: null,
				categoria_id: null
			}
		},
		getTable(){
			// this.$api.$get(`/${this.resource}/tables`)
			// .then(response => {
			// 	console.log(response);
			// })
		},
		create() {
			this.titleDialog = (this.recordId)? 'Editar Producto':'Nuevo Producto';
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
			            this.close()
			        } else {
			            this.$message.error(response.message)
			        }
			    })
				.catch(error => {
					console.log(error)
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