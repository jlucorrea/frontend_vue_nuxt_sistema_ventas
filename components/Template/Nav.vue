<template>
	<nav class="navbar navbar-main navbar-expand-lg position-sticky mt-4 top-1 px-0 mx-4 shadow-none border-radius-xl z-index-sticky" id="navbarBlur" data-scroll="true">
		<div class="container-fluid py-1 px-3">
			<div class="sidenav-toggler sidenav-toggler-inner d-xl-block d-none ">
				<a href="javascript:;" class="nav-link text-body p-0">
					<div class="sidenav-toggler-inner">
						<i class="sidenav-toggler-line"></i>
						<i class="sidenav-toggler-line"></i>
						<i class="sidenav-toggler-line"></i>
					</div>
				</a>
			</div>
			<div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
				<div class="ms-md-auto pe-md-3 d-flex align-items-center"></div>
				<ul class="navbar-nav  justify-content-end">
					<li class="nav-item d-flex align-items-center">
						<a href="javascript:void(0)" @click="logout()" class="nav-link text-body font-weight-bold px-0">
							<i class="fa fa-user me-sm-1"></i>
							<span class="d-sm-inline d-none">{{ user.nombre }}</span>
						</a>
					</li>
					<li class="nav-item d-xl-none ps-3 d-flex align-items-center">
						<a href="javascript:;" class="nav-link text-body p-0" id="iconNavbarSidenav">
							<div class="sidenav-toggler-inner">
								<i class="sidenav-toggler-line"></i>
								<i class="sidenav-toggler-line"></i>
								<i class="sidenav-toggler-line"></i>
							</div>
						</a>
					</li>
					<li class="nav-item px-3 d-flex align-items-center">
						<a href="javascript:;" class="nav-link text-body p-0">
							<i class="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
						</a>
					</li>
					<li class="nav-item dropdown pe-2 d-flex align-items-center">
						<a href="javascript:;" class="nav-link text-body p-0" id="dropdownMenuButton"
							data-bs-toggle="dropdown" aria-expanded="false">
							<i class="fa fa-bell cursor-pointer"></i>
						</a>
						<ul class="dropdown-menu dropdown-menu-end px-2 py-3 me-sm-n4"
							aria-labelledby="dropdownMenuButton">
							<li class="mb-2">
								<a class="dropdown-item border-radius-md" href="javascript:;">
									<div class="d-flex py-1">
										<div class="my-auto">
											<img src="/assets/img/team-2.jpg" class="avatar avatar-sm  me-3 "
												alt="user image">
										</div>
										<div class="d-flex flex-column justify-content-center">
											<h6 class="text-sm font-weight-normal mb-1">
												<span class="font-weight-bold">New message</span> from Laur
											</h6>
											<p class="text-xs text-secondary mb-0">
												<i class="fa fa-clock me-1"></i>
												13 minutes ago
											</p>
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
	methods:{
		logout(){
			localStorage.removeItem('userAuth');
			this.$router.push('/auth/login');
		}
	},
	mounted() {
		this.$nextTick(() => {
			let user = localStorage.getItem('userAuth');
			this.user = JSON.parse(user);
		})
	}
}
</script>