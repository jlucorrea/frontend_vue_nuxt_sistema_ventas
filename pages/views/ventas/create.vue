<template>
	<AdminTemplate>
		<div slot="body">
			<div class="alert alert-warning text-center font-weight-bold" role="alert" v-if="!user.caja">
				<div class="text-white">
					<nuxt-link to="/views/cajas/lista" class="btn btn-sm text-white">Aperturar Caja</nuxt-link>
				</div>
			</div>
			<div class="row justify-content-end" v-else>
				<div class="col-12 col-sm-7">
					<div class="d-lg-flex">
						<div>
							<h5 class="mb-3">Nueva venta</h5>
						</div>
					</div>
					<div class="row">
						<div class="col-12">
							<div class="card bg-gradient-dark">
								<div class="card-header bg-transparent py-2 px-3">
									<div class="row">
										<div class="col-lg-4 col-md-6 col-12">
											<div class="input-group input-group-lg">
												<span class="input-group-text text-white bg-transparent border-0">
													<i class="ni ni-archive-2 text-lg" aria-hidden="true"></i>
												</span>
												<input v-model="buscar" type="text" class="form-control bg-transparent border-0 text-white" @keyup.enter="codeBar()" placeholder="Buscar..." />
											</div>
										</div>
										<div class="col-lg-6 col-md-6 col-12 my-auto ms-auto">
											<div class="input-group input-group-lg">
												<span class="input-group-text text-white bg-transparent border-0">
													<i class="ni ni-box-2 text-lg" aria-hidden="true"></i>
												</span>
												<select class="form-control bg-transparent border-0 text-white" v-model="marca">
													<option value="all" class="text-dark">Todos</option>
													<option class="text-dark" v-for="option in marcas" :value="option.nombre">{{ option.nombre }}</option>
												</select>
											</div>
										</div>
										<div class="d-flex mb-3">
											<div class="form form-check form-switch ms-auto">
												<input v-model="image" class="form-check-input" checked="" type="checkbox">
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-12 py-2" style="min-height: 60vh;max-height: 60vh; overflow-y: scroll; overflow-x: none;">
							<div class="row">
								<div class="col-3" v-for="item in articuloCategoria">
									<PosArticuloVenta v-if="image==true" :articulo="item" @AddArt="AddArt"></PosArticuloVenta>
									<PosArticuloVentaImage v-else :articulo="item" @AddArt="AddArt"></PosArticuloVentaImage>
								</div>
							</div>
						</div>
						<div class="col-xl-12">
							<div class="card">
								<div class="card-body d-flex p-3">
									<h6 class="my-auto">Categoría</h6>
									<div class="nav-wrapper position-relative ms-auto w-50">
										<ul class="nav nav-pills nav-fill p-1" role="tablist">
											<li class="nav-item active" role="presentation">
												<a class="nav-link mb-0 px-0 py-1" data-bs-toggle="tab" href="#cam1"
													role="tab" aria-controls="cam1" aria-selected="true">
												</a>
											</li>
										</ul>
									</div>
									<div class="dropdown pt-2">
										<a href="javascript:;" class="text-secondary ps-4" id="dropdownCam"
											data-bs-toggle="dropdown" aria-expanded="false">
											<i class="fas fa-ellipsis-v" aria-hidden="true"></i>
										</a>
										<ul class="dropdown-menu dropdown-menu-end me-sm-n4 px-2 py-3"
											aria-labelledby="dropdownCam" style="">
											<li>
												<a class="dropdown-item border-radius-md" @click="categoria='all'" href="javascript:;">Todo</a>
											</li>
											<li v-for="option in categorias">
												<a @click="categoria=option.nombre" class="dropdown-item border-radius-md" href="javascript:;">{{ option.nombre }}</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-5">
					<div class="card card-pricing">
						<div class="card-body text-center p-3">
							<div class="d-flex align-items-center px-2">
								<h6>CARRITO</h6><br>
							</div>
							<div class="d-flex align-items-center px-2">
								<h6>TOTAL: {{ this.form.total }}</h6>
							</div>
							<div class="table-responsive p-0" style="min-height: 30vh" v-if="form.items.length>0">
								<table class="table align-items-center justify-content-center mb-0">
									<thead>
										<tr>
											<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-start">
												Artículo
											</th>
											<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-start">
												Cant
											</th>
											<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-start">
												Precio
											</th>
											<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-start">
												Total
											</th>
											<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
											</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(row, i) in form.items">
											<td class="text-start">
												<p class="text-xxs font-weight-bold mb-0 text-start">
													{{ row.nombre }}
												</p>
											</td>
											<td class="text-start">
												<p class="text-xxs font-weight-bold mb-0 text-start">
													{{ row.cantidad }}
												</p>
											</td>
											<td class="text-start">
												<p class="text-xxs font-weight-bold mb-0 text-start">
													{{ Number(row.precio_unitario).toFixed(2) }}
												</p>
											</td>
											<td class="text-start">
												<p class="text-xxs font-weight-bold mb-0 text-start">
													{{ Number(row.precio_unitario * row.cantidad).toFixed(2) }}
												</p>
											</td>
											<td>
												<div class="input-group input-group-sm">
													<button class="btn btn-outline-primary mb-0 btn-sm" type="button" @click="openModal(row)">
														<i class="fas fa-pen"></i>
													</button>
													<button class="btn btn-outline-danger mb-0 btn-sm" type="button" @click="clickRemoteItem(i)">
														<i class="fas fa-times"></i>
													</button>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<button class="btn bg-gradient-dark w-100 mt-4 mb-0" @click="saveSales()">
								<i class="fas fa-save mx-2"></i> GUARDAR
							</button>
						</div>
					</div>
				</div>
				<div class="modal fade" id="AjusteModal" tabindex="-1" role="dialog"
					aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="exampleModalLabel">
									Editar artículo
								</h5>
								<button type="button" class="btn-close text-dark"
									data-bs-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<div class="row">
									<div class="col-12">
										<div class="form-group has-success">
											<label for="">Articulo</label>
											<input type="text" placeholder="" disabled class="form-control" />
										</div>
									</div>
								</div>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn bg-gradient-secondary w-100"
									data-bs-dismiss="modal">
									Cerrar
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ModalsPurchase :is-modal-visible.sync="isModalVisible" :newForm="newForm" @saveEditArticulo="saveEditArticulo"></ModalsPurchase>
		</div>
	</AdminTemplate>
</template>
<script>
import { deletetable } from "../../../plugins/deletetable.js"
export default {
	name: 'IndexPage',
	head() {
		return {
			title: 'Ventas'
		}
	},
	mixins: [deletetable],
	data() {
		return {
			resource: 'ventas',
			records: [],
			isModalVisible: false,
			categorias: [],
			marcas: [],
			articulos: [],
			buscar: '',
			marca: 'all',
			categoria: 'all',
			image: true,
			newForm: {
				id: '',
				nombre: '',
				cantidad: null,
				total: 0
			},
			form: {
				sucursal_id: 1,
				document_type_id: 2,
				customer_id: 1,
				customer: '',
				currency_type_id: 'PEN',
				status_paid: 1,
				tipo_cambio: 3.856,
				total_igv: 0,
				total_value: 0,
				total: 0,
				items: [],
				caja_id: null
			},
			user:{}
		}
	},
	methods: {
		async GET_DATA(path) {
			const apiData = await this.$api.$get(path);
			return apiData;
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
		},
		async getData(){
			try {
				await Promise.all([this.GET_DATA('categorias'),this.GET_DATA('marcas'),this.GET_DATA('inventarios')])
				.then((response) => {
					this.categorias = response[0].data;
					this.marcas = response[1].data;
					this.articulos = response[2].data;
				})
			} catch (error) {
				console.log(error);
			}
		},
		AddArt(data){
			let indice = this.form.items.findIndex((el) => el.id == data.id);
			if(indice==-1){
				this.form.items.unshift({
					id: data.id,
					nombre: data.nombre,
					cantidad: 1,
					stock: data.stock,
					precio_unitario: data.venta,
					total: data.venta
				});
			}else{
				const exitArticulo = this.form.items[indice];
				if(exitArticulo.cantidad +1 > exitArticulo.stock){
					this.$message.error('No cuenta con stock suficiente');
					return false;
				}else{
					exitArticulo.cantidad += 1;
					this.form.items[indice] = exitArticulo;
				}
			}
			this.calculateTotal();
		},
		clickRemoteItem(i){
			this.form.items.splice(i, 1);
			this.calculateTotal();
		},
		codeBar(){
			let code = this.buscar;
			let buscarRegistro = this.articuloCategoria.filter((el) => el.barra == code);
			if(buscarRegistro.length > 0){
				this.AddArt(buscarRegistro[0])
				this.buscar = ''
			}
		},
		openModal(param) {
			this.isModalVisible = true;
			this.newForm.id = param.id;
			this.newForm.nombre = param.nombre;
			this.newForm.cantidad = param.cantidad;
			this.newForm.total = param.total;
		},
		closeModal() {
			this.isModalVisible = false;
		},
		saveEditArticulo(param){
			const findIndex = this.form.items.findIndex(pro => pro.id === param.id);
			const articuloExit = this.form.items[findIndex];
			articuloExit.nombre = param.nombre,
			articuloExit.cantidad = param.cantidad;
			articuloExit.precio_unitario = param.total,
			articuloExit.total = param.total;
			this.form.items[findIndex] = articuloExit;
			this.closeModal();
			this.calculateTotal();
		},
		calculateTotal(){
			let total = this.totalPago;
            let total_value = total / 1.18;
            this.form.total_igv = parseFloat(total_value * 0.18).toFixed(2)
            this.form.total_value = parseFloat(total_value).toFixed(2)
			this.form.total = parseFloat(total).toFixed(2)
		},
		async saveSales() {
			try {
				this.form.caja_id = this.user.caja.id;
				await this.$api.$post(this.resource, this.form)
					.then(response => {
						if (response.success) {
							this.$message.success(response.message)
							this.form.items = [];
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
		}
	},
	computed:{
		articuloFilter(){
			let buscar = this.buscar
			if(buscar!=''){
				return this.articulos.filter((a) => {
					let nombre = a.nombre!=null ? a.nombre : '';
					let barra = a.barra!=null ? a.barra : '';
					return nombre.toLowerCase().indexOf(buscar.toLowerCase()) != -1 || barra.toLowerCase().indexOf(buscar.toLowerCase()) != -1
				})
			}
			return this.articulos;
		},
		articuloMarca(){
			let marca = this.marca
			if(marca!='all'){
				return this.articuloFilter.filter((a) => {
					return a.marca == marca;
				})
			}
			return this.articuloFilter;
		},
		articuloCategoria(){
			let categoria = this.categoria
			if(categoria!='all'){
				return this.articuloMarca.filter((a) => {
					return a.categoria == categoria;
				})
			}
			return this.articuloMarca;
		},
		totalPago(){
			return this.form.items.reduce((a,b) => a+(b.cantidad*b.total),0);
		}
	},
	mounted(){
		let user = localStorage.getItem('userAuth');
		this.user = JSON.parse(user);
		this.$nextTick(async () => {
			try{
				this.getData();
				this.getCaja();
			} catch(error){
				console.log(error);
			}
		});
	}
}
</script>