<template>
	<aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 ps ps--active-y"
		id="sidenav-main">
		<div class="sidenav-header">
			<i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
				aria-hidden="true" id="iconSidenav"></i>
			<nuxt-link to="/" class="navbar-brand m-0">
				<span class="ms-1 font-weight-bold">Facturacion POS</span>
			</nuxt-link>
		</div>
		<hr class="horizontal dark mt-0">
		<div class="collapse navbar-collapse  w-auto h-auto" id="sidenav-collapse-main">
			<ul class="navbar-nav">
				<li class="nav-item">
					<nuxt-link to="/" class="nav-link">
						<div class="icon-sm shadow border-radius-md text-center d-flex align-items-center justify-content-center">
							<i width="12px" height="12px" class="ni ni-app text-lg opacity-10" aria-hidden="true"></i>
						</div>
						<span class="nav-link-text ms-1">Principal</span>
					</nuxt-link>
				</li>
				<li class="nav-item">
					<a data-bs-toggle="collapse" href="#pageProducto" class="nav-link " aria-controls="pageProducto"
						role="button" aria-expanded="false">
						<div class="icon-sm shadow border-radius-md text-center d-flex align-items-center justify-content-center">
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
					<a data-bs-toggle="collapse" href="#pageCaja" class="nav-link " aria-controls="pageCaja"
						role="button" aria-expanded="false">
						<div class="icon-sm shadow border-radius-md text-center d-flex align-items-center justify-content-center">
							<i class="ni ni-box-2 text-lg opacity-10" aria-hidden="true"></i>
						</div>
						<span class="nav-link-text ms-1">Cajas</span>
					</a>
					<div class="collapse " id="pageCaja">
						<ul class="nav ms-4 ps-3">
							<li class="nav-item ">
								<nuxt-link to="/views/cajas/caja" class="nav-link" aria-expanded="false">Caja</nuxt-link>
							</li>
							<li class="nav-item ">
								<nuxt-link to="/views/cajas/lista" class="nav-link" aria-expanded="false">Lista</nuxt-link>
							</li>
						</ul>
					</div>
				</li>
				<li class="nav-item">
					<a data-bs-toggle="collapse" href="#pageCompras" class="nav-link " aria-controls="pageCompras"
						role="button" aria-expanded="false">
						<div class="icon-sm shadow border-radius-md text-center d-flex align-items-center justify-content-center">
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
					<a data-bs-toggle="collapse" href="#pageVentas" class="nav-link " aria-controls="pageVentas"
						role="button" aria-expanded="false">
						<div class="icon-sm shadow border-radius-md text-center d-flex align-items-center justify-content-center">
							<i class="ni ni-bag-17 text-lg opacity-10" aria-hidden="true"></i>
						</div>
						<span class="nav-link-text ms-1">Ventas</span>
					</a>
					<div class="collapse " id="pageVentas">
						<ul class="nav ms-4 ps-3">
							<li class="nav-item ">
								<nuxt-link to="/views/ventas/create" class="nav-link" aria-expanded="false">Nueva Venta</nuxt-link>
							</li>
							<li class="nav-item ">
								<nuxt-link to="/views/ventas" class="nav-link" aria-expanded="false">Ventas</nuxt-link>
							</li>
						</ul>
					</div>
				</li>
				<li class="nav-item">
					<a data-bs-toggle="collapse" href="#pageUser" class="nav-link " aria-controls="pageUser"
						role="button" aria-expanded="false">
						<div class="icon-sm shadow border-radius-md text-center d-flex align-items-center justify-content-center">
							<i class="ni ni-single-02 text-lg opacity-10" aria-hidden="true"></i>
						</div>
						<span class="nav-link-text ms-1">Usuarios</span>
					</a>
					<div class="collapse " id="pageUser">
						<ul class="nav ms-4 ps-3">
							<li class="nav-item ">
								<nuxt-link to="/views/usuarios" class="nav-link" aria-expanded="false">Usuario</nuxt-link>
							</li>
						</ul>
					</div>
				</li>
				<li class="nav-item">
					<a data-bs-toggle="collapse" href="#pageInventario" class="nav-link " aria-controls="pageInventario"
						role="button" aria-expanded="false">
						<div class="icon-sm shadow border-radius-md text-center d-flex align-items-center justify-content-center">
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
				<li class="nav-item">
					<a data-bs-toggle="collapse" href="#pageSucursal" class="nav-link " aria-controls="pageSucursal"
						role="button" aria-expanded="false">
						<div class="icon-sm shadow border-radius-md text-center d-flex align-items-center justify-content-center">
							<i class="ni ni-building text-lg opacity-10" aria-hidden="true"></i>
						</div>
						<span class="nav-link-text ms-1">Sucursal</span>
					</a>
					<div class="collapse " id="pageSucursal">
						<ul class="nav ms-4 ps-3">
							<li class="nav-item ">
								<nuxt-link to="/views/sucursal" class="nav-link" aria-expanded="false">Sucursal</nuxt-link>
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</div>
	</aside>
</template>