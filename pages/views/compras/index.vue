<template>
	<AdminTemplate>
		<div slot="body">
			<div class="row justify-content-end">
				<div class="col-12 col-sm-7">
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
									</div>
								</div>
							</div>
						</div>
						<div class="col-12 py-2" style="min-height: 60vh;max-height: 60vh; overflow-y: scroll; overflow-x: none;">
							<div class="row">
								<div class="col-3" v-for="item in articuloCategoria">
									<PosArticulo :articulo="item" @AddArt="AddArt"></PosArticulo>
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
						<div class="card-header bg-gradient-dark text-center pt-4 pb-5 position-relative">
							<div class="z-index-1 position-relative">
								<h1 class="text-white mt-2 mb-0"><small></small>{{ this.form.total }}</h1>
								<h6 class="text-white">Total</h6>
							</div>
						</div>
						<div class="position-relative mt-n5" style="height: 50px">
							<div class="position-absolute w-100">
								<svg class="waves waves-sm" xmlns="http://www.w3.org/2000/svg"
									xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 40"
									preserveAspectRatio="none" shape-rendering="auto">
									<defs>
										<path id="card-wave"
											d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z">
										</path>
									</defs>
									<g class="moving-waves">
										<use xlink:href="#card-wave" x="48" y="-1" fill="rgba(255,255,255,0.30"></use>
										<use xlink:href="#card-wave" x="48" y="3" fill="rgba(255,255,255,0.35)"></use>
										<use xlink:href="#card-wave" x="48" y="5" fill="rgba(255,255,255,0.25)"></use>
										<use xlink:href="#card-wave" x="48" y="8" fill="rgba(255,255,255,0.20)"></use>
										<use xlink:href="#card-wave" x="48" y="13" fill="rgba(255,255,255,0.15)"></use>
										<use xlink:href="#card-wave" x="48" y="16" fill="rgba(255,255,255,0.99)"></use>
									</g>
								</svg>
							</div>
						</div>
						<div class="card-body text-center p-3">
							<div class="d-flex align-items-center px-2">
								<h6>CARRITO</h6>
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
							<button class="btn bg-gradient-dark w-100 mt-4 mb-0" @click="savePurchase()">
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
			title: 'Compras'
		}
	},
	mixins: [deletetable],
	data() {
		return {
			resource: 'compras',
			records: [],
			isModalVisible: false,
			categorias: [],
			marcas: [],
			articulos: [],
			buscar: '',
			marca: 'all',
			categoria: 'all',
			newForm: {
				id: '',
				nombre: '',
				cantidad: null,
				total: 0
			},
			form: {
				sucursal_id: 1,
				document_type_id: '01',
				customer_id: 1,
				customer: '',
				currency_type_id: 'PEN',
				total_igv: 0,
				total_value: 0,
				total: 0,
				items: [],
			}
		}
	},
	created() {
		
	},
	methods: {
		async GET_DATA(path) {
			const apiData = await this.$api.$get(path);
			return apiData;
		},
		async getData(){
			try {
				await Promise.all([this.GET_DATA('categorias'),this.GET_DATA('marcas'),this.GET_DATA('articulos')])
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
				this.form.items.unshift({id: data.id, nombre: data.nombre, cantidad: 1, precio_unitario: data.compra, total: data.compra});
			}else{
				const exitArticulo = this.form.items[indice];
				exitArticulo.cantidad += 1;
				this.form.items[indice] = exitArticulo;
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
		async savePurchase() {
			try {
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
		},

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
		this.$nextTick(async () => {
			try{
				this.getData();
			} catch(error){
				console.log(error);
			}
		});
	}
}
</script>