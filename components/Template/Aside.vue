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
					<a data-bs-toggle="collapse" href="#dashboardsExamples" class="nav-link "
						aria-controls="dashboardsExamples" role="button" aria-expanded="false">
						<div class="icon-sm shadow border-radius-md text-center d-flex align-items-center justify-content-center  me-2">
							<i class="ni ni-istanbul text-lg opacity-10" aria-hidden="true"></i>
						</div>
						<span class="nav-link-text ms-1">Dashboards</span>
					</a>
					<div class="collapse " id="dashboardsExamples">
						<ul class="nav ms-4 ps-3">
							<li class="nav-item ">
								<a class="nav-link " href="../../pages/dashboards/default.html">
									<span class="sidenav-mini-icon"> D </span>
									<span class="sidenav-normal"> Default </span>
								</a>
							</li>
						</ul>
					</div>
				</li>
				<li class="nav-item mt-3">
					<h6 class="ps-4  ms-2 text-uppercase text-xs font-weight-bolder opacity-6">PAGES</h6>
				</li>
				<li class="nav-item">
					<a data-bs-toggle="collapse" href="#pagesExamples" class="nav-link " aria-controls="pagesExamples"
						role="button" aria-expanded="false">
						<div class="icon-sm shadow border-radius-md text-center d-flex align-items-center justify-content-center  me-2">
							<i class="ni ni-building text-lg opacity-10" aria-hidden="true"></i>
						</div>
						<span class="nav-link-text ms-1">Pages</span>
					</a>
					<div class="collapse " id="pagesExamples">
						<ul class="nav ms-4 ps-3">
							<li class="nav-item ">
								<a class="nav-link " data-bs-toggle="collapse" aria-expanded="false"
									href="#profileExample">
									<span class="sidenav-mini-icon"> P </span>
									<span class="sidenav-normal"> Profile <b class="caret"></b></span>
								</a>
								<div class="collapse " id="profileExample">
									<ul class="nav nav-sm flex-column">
										<li class="nav-item">
											<a class="nav-link " href="../../pages/pages/profile/overview.html">
												<span class="sidenav-mini-icon text-xs"> P </span>
												<span class="sidenav-normal"> Profile Overview </span>
											</a>
										</li>
										<li class="nav-item">
											<a class="nav-link " href="../../pages/pages/profile/teams.html">
												<span class="sidenav-mini-icon text-xs"> T </span>
												<span class="sidenav-normal"> Teams </span>
											</a>
										</li>
										<li class="nav-item">
											<a class="nav-link " href="../../pages/pages/profile/projects.html">
												<span class="sidenav-mini-icon text-xs"> A </span>
												<span class="sidenav-normal"> All Projects </span>
											</a>
										</li>
									</ul>
								</div>
							</li>
							<li class="nav-item ">
								<a class="nav-link " data-bs-toggle="collapse" aria-expanded="false" href="#usersExample">
									<span class="sidenav-mini-icon"> U </span>
									<span class="sidenav-normal"> Users <b class="caret"></b></span>
								</a>
								<div class="collapse " id="usersExample">
									<ul class="nav nav-sm flex-column">
										<li class="nav-item">
											<a class="nav-link " href="../../pages/pages/users/reports.html">
												<span class="sidenav-mini-icon text-xs"> R </span>
												<span class="sidenav-normal"> Reports </span>
											</a>
										</li>
										<li class="nav-item">
											<a class="nav-link " href="../../pages/pages/users/new-user.html">
												<span class="sidenav-mini-icon text-xs"> N </span>
												<span class="sidenav-normal"> New User </span>
											</a>
										</li>
									</ul>
								</div>
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