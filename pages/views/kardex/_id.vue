<template>
	<AdminTemplate>
		<div slot="body">
			<div class="row">
				<div class="col-12">
					<div class="card">
						<div class="card-header pb-0">
							<div class="d-lg-flex">
								<div>
									<h5 class="mb-0">Kardex de artículo</h5>
								</div>
								<div class="ms-auto my-auto mt-lg-0 mt-4">
									<div class="ms-auto my-auto">
										<button @click="$router.back()" class="btn bg-gradient-info btn-sm mb-0">
											<i class="ni ni-bold-left"></i> Regresar
										</button>
									</div>
								</div>
							</div>
						</div>
						<div class="card-body">
							<div class="row">
								<div class="col-12 col-lg-5 mx-auto">
									<h3 class="mt-lg-0 mt-4">{{ itemInventory.nombre }}</h3>
									<div class="rating">
										<i class="fas fa-barcode" aria-hidden="true"></i> {{ itemInventory.barra }} |
										<i class="fas fa-boxes" aria-hidden="true"></i> {{ itemInventory.categoria }} |
										<i class="fas fa-bookmark" aria-hidden="true"></i> {{ itemInventory.marca }}
									</div>
									<br />
									<div class="d-flex justify-content-between">
										<div class="mx-1">
											<h6 class="mb-0 mt-3">Precio Compra</h6>
											<h5>{{ itemInventory.compra }}</h5>
										</div>
										<div class="mx-1">
											<h6 class="mb-0 mt-3">Precio Venta</h6>
											<h5>{{ itemInventory.venta }}</h5>
										</div>
										<div class="mx-1">
											<h6 class="mb-0 mt-3">Ganancia Unitaria</h6>
											<h5>{{ Number(itemInventory.venta - itemInventory.compra).toFixed(2) }}</h5>
										</div>
									</div>
									<span :class="(itemInventory.stock < itemInventory.stock_minimo) ? 'badge badge-danger' : 'badge badge-success'"><i class="fas fa-archive" aria-hidden="true"></i> {{ itemInventory.stock }} en Stock</span>
									<br />
									<div class="d-flex justify-content-between">
										<div class="mx-1">
											<h6 class="mb-0 mt-3">Inversion</h6>
											<h5>{{ itemInventory.inversion }}</h5>
										</div>
										<div class="mx-1">
											<h6 class="mb-0 mt-3">Valorizado</h6>
											<h5>{{ itemInventory.valorizado }}</h5>
										</div>
										<div class="mx-1">
											<h6 class="mb-0 mt-3">Ganancia</h6>
											<h5>{{ itemInventory.ganancia }}</h5>
										</div>
									</div>
									<div class="row mt-4">
										<div class="col-lg-12">
											<button @click.prevent="openModal(itemInventory.id)" class="btn bg-gradient-primary mb-0 mt-lg-auto w-100" type="button">
												<i class="fas fa-cog"></i>Ajustar Stock
											</button>
										</div>
									</div>
								</div>
								<div class="col-12 col-sm-7">
									<h5 class="ms-1">Movimientos de stock</h5>
									<div class="table table-responsive">
										<table class="table align-items-center mb-0 table-sm">
											<thead>
												<tr>
													<th class="text-uppercase text-left text-secondary text-xxs font-weight-bolder opacity-7 px-1">
														Detalle
													</th>
													<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
														Cantidad
													</th>
													<th class="text-uppercase text-secondary text-left text-xxs font-weight-bolder opacity-7 ps-2">
														Compra
													</th>
													<th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
														Venta
													</th>
													<th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
													</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(row, index) in itemInventory.inventarios">
													<td>
														<div class="d-flex px-1 py-1">
															<div class="text-xxs">{{ row.motivo }}</div>
														</div>
													</td>
													<td>
														<h6><span class="badge text-xxs" :class="[row.tipo == 2 ? 'badge-danger' : 'badge-success']">{{ row.cantidad }} {{ row.codigo }}</span></h6>
													</td>
													<td class="text-xxs">{{ Number(row.compra).toFixed(2) }}</td>
													<td class="align-middle text-sm text-xxs">{{ Number(row.venta).toFixed(2) }}</td>
													<td class="align-middle text-center text-xxs">
														<a href="javascript:;" @click="Delete(row.id)" class="mx-3" data-bs-toggle="tooltip" data-bs-original-title="Eliminar Ajuste">
															<i class="fas fa-trash text-secondary" aria-hidden="true"></i>
														</a>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<modal-inventory :isModalVisible.sync="isModalVisible" :recordId="recordId"></modal-inventory>
		</div>
	</AdminTemplate>
</template>
<script>
import ModalInventory from '../../../components/Modals/NewInventory.vue'
import { deletetable } from '../../../plugins/deletetable';
export default {
	head() {
		return {
			title: 'Kardex',
		};
	},
	components: {ModalInventory},
	mixins: [deletetable],
	data() {
		return {
			resource: "inventarios",
			isModalVisible: false,
			itemInventory: {},
			recordId: null,
		};
	},
	created() {
		this.$eventHub.$on('reloadData', () => {
			this.getData()
		});
		this.getData();
	},
	methods: {
		async GET_DATA(path) {
			const apiData = await this.$api.$get(path);
			return apiData;
		},
		getData(){
			this.$nextTick(async () => {
				try {
					await Promise.all([this.GET_DATA('inventarios/kardex/' + this.$route.params.id)])
					.then((response) => {
						this.itemInventory = response[0].data;
						this.$eventHub.$emit('reloadData')
					});
				} catch (error) {
					console.log(error);
				}
			});
		},
		openModal(id) {
			this.recordId = id;
			this.isModalVisible = true;
		},
		closeModal(){
			this.isModalVisible = false;
		},
		Delete(id){
			this.destroy(`/${this.resource}/${id}`)
			.then(() =>
				this.$eventHub.$emit('reloadData')
			)
		}
	}
};
</script>
  