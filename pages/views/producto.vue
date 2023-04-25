<template>
<AdminTemplate >
	<div slot="body">
		<div class="row">
			<div class="col-12">
				<div class="card">
					<div class="card-header pb-0">
						<div class="d-lg-flex">
							<div>
								<h5 class="mb-0">Productos</h5>
							</div>
							<div class="ms-auto my-auto mt-lg-0 mt-4">
								<div class="ms-auto my-auto">
									<a @click.prevent="openModal()" class="btn bg-gradient-primary btn-sm mb-0" target="_blank">+&nbsp; Producto</a>
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
												<th><a class="dataTable-sorter">SKU</a></th>
												<th><a class="dataTable-sorter">Producto</a></th>
												<th><a class="dataTable-sorter">Categoria</a></th>
												<th><a class="dataTable-sorter">Precio</a></th>
												<th><a class="dataTable-sorter">Estado</a></th>
												<th><a class="dataTable-sorter">Acciones</a></th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="(row,index) in records">
												<td class="text-sm">{{  index + 1 }}</td>
												<td class="text-sm">{{  row.barra }}</td>
												<td class="text-sm">{{  row.nombre }}</td>
												<td class="text-sm">{{ row.categoria }}</td>
												<td class="text-sm">{{ row.venta }}</td>
												<td>
													<span class="badge badge-danger badge-sm" v-if="row.estado == 0">Eliminado</span>
													<span class="badge badge-success badge-sm" v-else>Activo</span>
												</td>
												<td class="text-sm">
													<a href="javascript:;" @click.prevent="openModal(row.id)" class="mx-3" data-bs-toggle="tooltip" data-bs-original-title="Editar producto">
														<i class="fas fa-edit text-secondary" aria-hidden="true"></i>
													</a>
													<nuxt-link :to="url_image + row.id" class="mx-3" data-bs-toggle="tooltip" data-bs-original-title="Editar producto">
														<i class="fas fa-image text-secondary" aria-hidden="true"></i>
													</nuxt-link>
													<a href="javascript:;" data-bs-toggle="tooltip" @click="Delete(row.id)" data-bs-original-title="Eliminar producto">
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
			<ModalsNewProduct :isModalVisible.sync="isModalVisible" :recordId="recordId"></ModalsNewProduct>
		</div>
	</div>
</AdminTemplate >
</template>
<script>
import { deletetable } from "../../plugins/deletetable.js"

export default {
	name: 'IndexPage',
	head() {
		return {
			title: 'Producto'
		}
	},
	mixins: [deletetable],
	data() {
		return {
			resource: 'articulos',
			records: [],
			url_image: "/views/image/",
			isModalVisible: false,
			recordId: null
		}
	},
	created(){
		this.$eventHub.$on('reloadData', () => {
			this.getData()
		});
		this.getData();
	},
	methods: {
		openModal(recordId = null) {
			this.recordId = recordId;
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
						this.records = response[0].data;
					});
				} catch (error) {
					console.log(error);
				}
			});
		}
	}
}
</script>