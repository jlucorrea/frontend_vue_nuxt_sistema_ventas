<template>
	<AdminTemplate >
		<div slot="body">
			<div class="row">
				<div class="col-12">
					<div class="card">
						<div class="card-header pb-0">
							<div class="d-lg-flex">
								<div>
									<h5 class="mb-0">Cajas</h5>
								</div>
								<div class="ms-auto my-auto mt-lg-0 mt-4">
									<div class="ms-auto my-auto" v-if="!user.caja">
										<a @click.prevent="openModal(user)" class="btn bg-gradient-primary btn-sm mb-0" target="_blank">+&nbsp; Aperturas Caja</a>
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
													<th><a class="dataTable-sorter">Fecha</a></th>
													<th><a class="dataTable-sorter">Usuario</a></th>
													<th><a class="dataTable-sorter">Total</a></th>
													<th><a class="dataTable-sorter">Estado</a></th>
													<th><a class="dataTable-sorter">Acciones</a></th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(row,index) in records">
													<td class="text-sm">{{  index + 1 }}</td>
													<td class="text-sm">{{ row.fecha }}</td>
													<td class="text-sm">{{ row.user.nombre }}</td>
													<td class="text-sm">{{ Number(row.total).toFixed(2) }}</td>
													<td>
														<span class="badge badge-danger badge-sm" v-if="row.estado == 0">Cerrada</span>
														<span class="badge badge-success badge-sm" v-else>Abierta</span>
													</td>
													<td class="text-sm">
														<nuxtLink to="/views/cajas/caja" class="btn btn-sm btn-success mx-3" v-if="row.estado == 1">Ver / Cerrar</nuxtLink>
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
				<ModalsAperturaCaja :is-modal-apertura.sync="isModalApertura" :formUser="form"></ModalsAperturaCaja>
			</div>
		</div>
	</AdminTemplate>
</template>
<script>
export default {
	name: 'IndexPage',
	head() {
		return {
			title: 'Cajas'
		}
	},
	data() {
		return {
			resource: 'cajas',
			records: [],
			isModalApertura: false,
			user: {},
			form: {}
		}
	},
	created(){
		this.$eventHub.$on('reloadData', () => {
			Promise.all([this.GET_DATA(this.resource)])
			.then(response => {
				this.records = response[0].data;
			});
			this.getCaja();
		});
	},
	methods: {
		async GET_DATA(path) {
			const apiData = await this.$api.$get(path);
			return apiData;
		},
		openModal(param) {
			const formData = param ? { ...param } : {};
			this.form = formData;
			this.isModalApertura = true;
		},
		async getCaja(){
			try {
				await this.$api.$get(`cajas/record/`+ this.user.id)
				.then((response) => {
					if (response) {
						this.user.caja = response;
					} else {
						console.log("La respuesta no contiene datos");
					}
				})
			} catch (error) {
				console.log(error);
			}
		}
	},
	mounted(){
		let user = localStorage.getItem('userAuth');
		this.user = JSON.parse(user);
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
</script>