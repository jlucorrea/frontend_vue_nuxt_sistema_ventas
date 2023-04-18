<template>
	<el-dialog :visible="isModalVisible" @close="close" @open="create" append-to-body>
		<div class="row justify-content-md-center">
			<div class="col-lg-12 mx-auto">
				<div class="card">
					<div class="card-header">
						<div>
							<h6>Detalle de Venta</h6>
							<p class="text-sm mb-0">
								Venta no. <b> {{ this.modal.id }}</b> de <b>{{ this.modal.fecha }} </b>
							</p>
						</div>
						<div class="d-flex justify-content-between align-items-center">
							<div>
								<span class="mb-2 text-xs"><strong>ClIENTE:</strong>
									<span class="text-dark font-weight-bold ms-2">{{ this.modal.customer }}</span></span>
							</div>
							<h6>Total: S/ {{ this.modal.total }}</h6> 
						</div>
					</div>
					<div class="card-body p-3 pt-0">
						<hr class="horizontal dark mt-0 mb-4" />
						<div class="row">
							<div class="col-12" v-for="m in modal.articulos">
								<div class="d-flex">
									<div>
										<h6 class="text-lg mb-0 mt-2">{{ m.nombre }}</h6>
										<p class="text-sm mb-3">
											{{ Number(m.precio_unitario).toFixed(2) }} x {{ m.cantidad }}
											<!-- {{ m.medida }} -->
										</p>
										<span class="badge badge-sm bg-gradient-success"> <i class="fas fa-barcode"></i> {{ m.barra }}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</el-dialog>
</template>
<script>
export default {
	props: ['isModalVisible','recordId'],
	data(){
		return{
			resource: 'ventas',
			modal: {
				id: null,
				articulos: [],
				fecha: '',
				proveedor: null,
				total: 0,
			}
		}
	},
	created(){
		if(this.recordId) this.create();
	},
	methods: {
		async create() {
			try {
				this.$api.$get(`${this.resource}/record/${this.recordId}`)
				.then((response) => {
					this.modal = response.data
				})
			} catch (error) {
				console.log(error)
			}
		},
		close(){
			this.$emit('update:isModalVisible', false);
		}
	}
}
</script>
<style>
.el-dialog {
    margin-top: 1vh !important;
}
</style>