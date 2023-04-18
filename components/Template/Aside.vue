<template>
	<aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 "
		id="sidenav-main">
		<div class="sidenav-header">
			<i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
				aria-hidden="true" id="iconSidenav"></i>
			<a class="navbar-brand m-0"
				href=" https://demos.creative-tim.com/soft-ui-dashboard-pro/pages/dashboards/default.html "
				target="_blank">
				<span class="ms-1 font-weight-bold">Facturacion POS</span>
			</a>
		</div>
		<hr class="horizontal dark mt-0">
		<div class="collapse navbar-collapse  w-auto h-auto" id="sidenav-collapse-main">
			<ul class="navbar-nav">
				<li class="nav-item">
					<a href="#dashboardsExamples" class="nav-link" aria-controls="dashboardsExamples" role="button" aria-expanded="false">
						<div class="icon-sm shadow border-radius-md text-center d-flex align-items-center justify-content-center  me-2">
							<i class="ni ni-app text-lg opacity-10" aria-hidden="true"></i>
						</div>
						<span class="nav-link-text ms-1">Principal</span>
					</a>
				</li>
				<li class="nav-item mt-3">
					<h6 class="ps-4  ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Producto</h6>
				</li>
				<li class="nav-item">
					<a data-bs-toggle="collapse" href="#pageProducto" class="nav-link " aria-controls="pageProducto"
						role="button" aria-expanded="false">
						<div class="icon-sm shadow border-radius-md text-center d-flex align-items-center justify-content-center  me-2">
							<i class="ni ni-tag text-lg opacity-10" aria-hidden="true"></i>
						</div>
						<span class="nav-link-text ms-1">Producto</span>
					</a>
					<div class="collapse " id="pageProducto">
						<ul class="nav ms-4 ps-3">
							<li class="nav-item ">
								<nuxt-link to="/views/categoria" class="nav-link" aria-expanded="false">Categoria</nuxt-link>
							</li>
							<li class="nav-item ">
								<nuxt-link to="/views/marca" class="nav-link" aria-expanded="false">Marca</nuxt-link>
							</li>
							<li class="nav-item ">
								<nuxtLink to='/views/medida' class="nav-link" aria-expanded="false">Medida</nuxtLink>
							</li>
							<li class="nav-item ">
								<nuxtLink to='/views/producto' class="nav-link" aria-expanded="false">Producto</nuxtLink>
							</li>
						</ul>
					</div>
				</li>
				<li class="nav-item">
					<a data-bs-toggle="collapse" href="#pageCompras" class="nav-link " aria-controls="pageCompras"
						role="button" aria-expanded="false">
						<div class="icon-sm shadow border-radius-md text-center d-flex align-items-center justify-content-center  me-2">
							<i class="ni ni-cart text-lg opacity-10" aria-hidden="true"></i>
						</div>
						<span class="nav-link-text ms-1">Compras</span>
					</a>
					<div class="collapse " id="pageCompras">
						<ul class="nav ms-4 ps-3">
							<li class="nav-item ">
								<nuxt-link to="/views/compras" class="nav-link" aria-expanded="false">Nueva compra</nuxt-link>
							</li>
							<li class="nav-item ">
								<nuxt-link to="/views/compras/lista" class="nav-link" aria-expanded="false">Compras</nuxt-link>
							</li>
						</ul>
					</div>
				</li>
				<li class="nav-item">
					<a data-bs-toggle="collapse" href="#pageInventario" class="nav-link " aria-controls="pageInventario"
						role="button" aria-expanded="false">
						<div class="icon-sm shadow border-radius-md text-center d-flex align-items-center justify-content-center  me-2">
							<i class="ni ni-archive-2 text-lg opacity-10" aria-hidden="true"></i>
						</div>
						<span class="nav-link-text ms-1">Inventario</span>
					</a>
					<div class="collapse " id="pageInventario">
						<ul class="nav ms-4 ps-3">
							<li class="nav-item ">
								<nuxt-link to="/views/inventario" class="nav-link" aria-expanded="false">Inventario</nuxt-link>
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</div>
	</aside>
</template>
<script>
	export default{
		name: 'BaseAside'
	}
</script>