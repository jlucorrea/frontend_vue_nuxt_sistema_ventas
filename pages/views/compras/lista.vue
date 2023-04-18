<template>
	<AdminTemplate>
		<div slot="body">
			<div class="row">
				<div class="col-12">
					<div class="card">
						<div class="card-header pb-0">
							<div class="d-lg-flex">
								<div>
									<h5 class="mb-0">Compras</h5>
								</div>
								<div class="ms-auto my-auto mt-lg-0 mt-4">
									<div class="ms-auto my-auto">
										<nuxt-link to="/views/compras" class="btn bg-gradient-primary btn-sm mb-0">+&nbsp; Compra</nuxt-link>
									</div>
								</div>
							</div>
						</div>
						<div class="card-body px-0 pb-0">
							<div class="table-responsive">
								<div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
									<div class="dataTable-container">
										<table class="table table-flush dataTable-table">
											<thead class="thead-light">
												<tr>
													<th>#</th>
													<th><a class="dataTable-sorter">Fecha</a></th>
													<th><a class="dataTable-sorter">PROVEEDOR</a></th>
													<th><a class="dataTable-sorter">TOTAL</a></th>
													<th><a class="dataTable-sorter">Acciones</a></th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(row,index) in records">
													<td class="text-sm">{{  index + 1 }}</td>
													<td class="text-sm">{{  row.fecha }}</td>
													<td class="text-sm">{{  row.customer.name }}</td>
													<td class="text-sm">{{ row.total }}</td>
													<td class="text-sm">
														<a href="javascript:;" data-bs-toggle="tooltip" @click="openModal(row.id)" data-bs-original-title="Visualizar Compra">
															<i class="fas fa-eye text-secondary" aria-hidden="true"></i>
														</a>
														<a href="javascript:;" data-bs-toggle="tooltip" @click="Delete(row.id)" data-bs-original-title="Eliminar Compra">
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
			<ModalsInfoPurchase :is-modal-visible.sync="isModalVisible" :recordId="recordId"></ModalsInfoPurchase>
		</div>
	</AdminTemplate>
</template>
<script>
import { deletetable } from '../../../plugins/deletetable';
	export default {
		head(){
			return{
				title: 'Compras'
			}
		},
		mixins: [deletetable],
		data(){
			return{
				resource: 'compras',
				records: [],
				isModalVisible: false,
				recordId: null
			}
		},
		created(){
			this.$eventHub.$on('reloadData', () => {
				this.getData()
			});
		},
		methods: {
			async GET_DATA(path){
				const apiData = await this.$api.$get(path);
				return apiData;
			},
			async getData(){
				try {
					await Promise.all([this.GET_DATA(this.resource)])
					.then((response) =>{
						this.records = response[0];
					})
				} catch (error) {
					console.log(error);
				}
			},
			openModal(recordId){
				this.recordId = recordId;
				this.isModalVisible = true;
			},
			closeModal(){
				this.isModalVisible = false;
			},
			async Delete(id){
				try {
					await this.destroy(`/${this.resource}/${id}`)
					.then(() => {
						this.$eventHub.$emit('reloadData')
					})
				} catch (error) {
					console.log(error)
				}
			}
		},
		mounted(){
			this.$nextTick(async () => {
				try {
					this.getData();
				} catch (error) {
					console.log(error);
				}
			})
		}
	}
</script>