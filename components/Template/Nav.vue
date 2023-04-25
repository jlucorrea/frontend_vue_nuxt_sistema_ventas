<template>
	<nav class="navbar navbar-main navbar-expand-lg position-sticky mt-4 top-1 px-0 mx-4 shadow-none border-radius-xl z-index-sticky blur shadow-blur"
		id="navbarBlur" data-scroll="true">
		<div class="container-fluid py-1 px-3">
			<div class="sidenav-toggler sidenav-toggler-inner d-xl-block d-none ">
				<a href="javascript:;" @click="SideToggle()" class="nav-link text-body p-0">
					<div class="sidenav-toggler-inner">
						<i class="sidenav-toggler-line"></i>
						<i class="sidenav-toggler-line"></i>
						<i class="sidenav-toggler-line"></i>
					</div>
				</a>
			</div>
			<div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 collapse-nb" id="navbar">
				<div class="ms-md-auto pe-md-3 d-flex align-items-center"></div>
				<ul class="navbar-nav  justify-content-end">
					<li class="nav-item d-flex align-items-center flex-row">
						<a href="javascript:void(0)" class="nav-link text-body font-weight-bold px-0">
							<i class="fa fa-user me-sm-1"></i>
							<span class="d-sm-inline d-none">{{ user.nombre }}</span>
						</a>
					</li>
					<li class="nav-item d-xl-none ps-3 d-flex align-items-center">
						<a href="javascript:;" class="nav-link text-body p-0" @click="hideSideNav()" id="iconNavbarSidenav">
							<div class="sidenav-toggler-inner">
								<i class="sidenav-toggler-line"></i>
								<i class="sidenav-toggler-line"></i>
								<i class="sidenav-toggler-line"></i>
							</div>
						</a>
					</li>
					<li class="nav-item dropdown px-3 d-flex align-items-center">
						<a href="javascript:;" class="nav-link text-body p-0" id="dropdownMenuButton"
							data-bs-toggle="dropdown" aria-expanded="false">
							<i class="fa fa-cog cursor-pointer"></i>
						</a>
						<ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
							<li>
								<a class="dropdown-item border-radius-md" href="javascript:;" @click="logout()">
									<div class="d-flex py-1">
										<div class="d-flex flex-column justify-content-center">
											<h6 class="text-sm font-weight-normal">
												<i class="fa fa-lock"></i> <span class="font-weight-bold"> Cerrar
													Sesssion</span>
											</h6>
										</div>
									</div>
								</a>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>
<script>
export default {
	data() {
		return {
			user: {}
		}
	},
	methods: {
		logout() {
			localStorage.removeItem('userAuth');
			this.$router.push('/auth/login');
		},
		SideToggle() {
			let body = document.body
			body.classList.add("g-sidenav-show", "bg-gray-100");
			body.classList.contains("g-sidenav-hidden") ? body.classList.remove("g-sidenav-hidden") : body.classList.add("g-sidenav-hidden");
		},
		hideSideNav() {
			let side = document.getElementById('sidenav-main')
			side.classList.contains("d-none") ? side.classList.remove("d-none") : side.classList.add("d-none");
		}
	},
	mounted() {
		this.$nextTick(() => {
			let user = localStorage.getItem('userAuth');
			this.user = JSON.parse(user);
			let body = document.body
			body.classList.add('g-sidenav-show');
			if (window.innerWidth <= 767) {
				document.getElementById('navbar').classList.add('collapse-nb')
				body.classList.add('g-sidenav-pinned')
				document.getElementById('iconSidenav').classList.remove('d-none')
				document.getElementById('sidenav-main').classList.add('bg-white')
			}
		})
	}
}
</script>
<style>
.side_togle {
	cursor: pointer;
}

.navbar-vertical.navbar-expand-xs .navbar-collapse {
	overflow: hidden;
}

.navbar-vertical.navbar-expand-xs.fixed-start {
	overflow: hidden;
}

.flex-row {
	flex-direction: row;
}

.collapse-nb {
	display: block !important;
}

#iconNavbarSidenav {
	cursor: pointer;
}
</style>