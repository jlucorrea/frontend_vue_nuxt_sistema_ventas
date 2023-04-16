<template>
<AdminTemplate >
	<div slot="body">
		<div class="row">
			<div class="col-12">
				<div class="card">
					<div class="card-header pb-0">
						<div class="d-lg-flex">
							<div>
								<h5 class="mb-0">Inventario</h5>
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
												<th><a class="dataTable-sorter">Producto</a></th>
												<th><a class="dataTable-sorter">Codigo</a></th>
												<th><a class="dataTable-sorter">Marca</a></th>
												<th><a class="dataTable-sorter">Categoria</a></th>
												<th><a class="dataTable-sorter">Stock</a></th>
												<th><a class="dataTable-sorter">Inversion</a></th>
												<th><a class="dataTable-sorter">Valorizado</a></th>
												<th><a class="dataTable-sorter">Ganancia</a></th>
												<th><a class="dataTable-sorter">Acciones</a></th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="(row,index) in records">
												<td class="text-sm">{{ index + 1 }}</td>
												<td class="text-sm">{{ row.nombre }}</td>
												<td class="text-sm">{{ row.barra }}</td>
												<td class="text-sm">{{ row.marca }}</td>
												<td class="text-sm">{{ row.categoria }}</td>
												<td class="text-sm">
													<span class="badge"
														:class="[row.stock <= row.stock_minimo ? 'badge-danger' : 'badge-success']">
														{{ row.stock }}
														{{ row.code_unidad }}
													</span>
												</td>
												<td class="text-sm">{{ Number(row.inversion).toFixed(2) }}</td>
												<td class="text-sm">{{ Number(row.valorizado).toFixed(2) }}</td>
												<td class="text-sm">{{ Number(row.ganancia).toFixed(2) }}</td>
												<td class="text-sm">
													<nuxt-link :to="url_kardex + row.id" class="nav-link" aria-expanded="false">
														<i class="fas fa-eye text-secondary" aria-hidden="true"></i>
													</nuxt-link>
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
	</div>
</AdminTemplate >
</template>
<script>
export default {
	name: 'IndexPage',
	head() {
		return {
			title: 'Inventario'
		}
	},
	data() {
		return {
			resource: 'inventarios',
			records: [],
			recordId: null,
			url_kardex: "/views/kardex/"
		}
	},
	created(){
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