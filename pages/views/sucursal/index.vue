<template>
	<AdminTemplate >
		<div slot="body">
			<div class="row">
				<div class="col-12">
					<div class="card">
						<div class="card-header pb-0">
							<div class="d-lg-flex">
								<div>
									<h5 class="mb-0">Sucursal</h5>
								</div>
								<div class="ms-auto my-auto mt-lg-0 mt-4">
									<div class="ms-auto my-auto">
										<!-- <a @click.prevent="openModal()" class="btn bg-gradient-primary btn-sm mb-0" target="_blank">+&nbsp; Sucursal</a> -->
									</div>
								</div>
							</div>
						</div>
						<div class="card-body px-0 pb-0">
							<div class="table-responsive">
								<div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
									<div class="dataTable-container">
										<table class="table table-flush dataTable-table" id="products-list">
											<thead class="thead-light">
												<tr>
													<th>#</th>
													<th><a class="dataTable-sorter">Cod.</a></th>
													<th><a class="dataTable-sorter">Nombre</a></th>
													<th><a class="dataTable-sorter">Dirección</a></th>
													<th><a class="dataTable-sorter">Impresora</a></th>
													<th><a class="dataTable-sorter">Url</a></th>
													<th><a class="dataTable-sorter">Estado</a></th>
													<th><a class="dataTable-sorter">Acciones</a></th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(row,index) in records">
													<td class="text-sm">{{  index + 1 }}</td>
													<td class="text-sm">{{  row.codigo }}</td>
													<td class="text-sm">{{  row.nombre }}</td>
													<td class="text-sm">{{  row.direccion }}</td>
													<td class="text-sm">{{  row.impresora }}</td>
													<td class="text-sm">{{  row.impresora_url }}</td>
													<td>
														<span class="badge badge-danger badge-sm" v-if="row.estado == 0">Eliminado</span>
														<span class="badge badge-success badge-sm" v-else>Activo</span>
													</td>
													<td class="text-sm">
														<a href="javascript:;" @click.prevent="openModal(row)" class="mx-3" data-bs-toggle="tooltip" data-bs-original-title="Editar Sucursal">
															<i class="fas fa-edit text-secondary" aria-hidden="true"></i>
														</a>
														<a href="javascript:;" data-bs-toggle="tooltip" @click="Delete(row.id)" data-bs-original-title="Eliminar Sucursal">
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
				<ModalsFormSucursal :is-modal-visible.sync="isModalVisible" :formulario="form"></ModalsFormSucursal>
			</div>
		</div>
	</AdminTemplate>
</template>
<script>
import { deletetable } from "../../../plugins/deletetable.js"
export default {
	name: 'IndexPage',
	head() {
		return {
			title: 'Sucursal'
		}
	},
	mixins: [deletetable],
	data() {
		return {
			titleResource: 'Sucursal',
			resource: 'sucursales',
			records: [],
			isModalVisible: false,
			recordId: null,
			form: {}
		}
	},
	created(){
		this.$eventHub.$on('reloadData', () => {
			this.getData()
		});
		this.getData();
	},
	methods: {
		openModal(param  = null) {
			const formData = param ? { ...param } : {};
			this.form = formData;
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
		},
		async GET_DATA(path) {
			const apiData = await this.$api.$get(path);
			return apiData;
		},
		getData(){
			this.$nextTick(async () => {
				try {
					await Promise.all([this.GET_DATA(this.resource)])
					.then(response => {
						this.records = response[0];
					});
				} catch (error) {
					console.log(error);
				}
			});
		}
	}
}
</script>