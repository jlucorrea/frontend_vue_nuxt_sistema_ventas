<template>
	<div>
		<div class="row">
			<div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
				<div class="card">
					<div class="card-body p-3">
						<div class="row">
							<div class="col-8">
								<div class="numbers">
									<p class="text-sm mb-0 text-capitalize font-weight-bold">
										Articulos
									</p>
									<h5 class="font-weight-bolder mb-0">
										{{ dashboard.articulos }}
										<span class="text-success text-sm font-weight-bolder"></span>
									</h5>
								</div>
							</div>
							<div class="col-4 text-end">
								<div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
									<i class="ni ni-money-coins text-lg opacity-10" aria-hidden="true"></i>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
				<div class="card">
					<div class="card-body p-3">
						<div class="row">
							<div class="col-8">
								<div class="numbers">
									<p class="text-sm mb-0 text-capitalize font-weight-bold">
										Usuarios
									</p>
									<h5 class="font-weight-bolder mb-0">
										{{ dashboard.users }}
										<span class="text-success text-sm font-weight-bolder"></span>
									</h5>
								</div>
							</div>
							<div class="col-4 text-end">
								<div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
									<i class="ni ni-world text-lg opacity-10" aria-hidden="true"></i>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
				<div class="card">
					<div class="card-body p-3">
						<div class="row">
							<div class="col-8">
								<div class="numbers">
									<p class="text-sm mb-0 text-capitalize font-weight-bold">
										Compras
									</p>
									<h5 class="font-weight-bolder mb-0">
										{{ Number(dashboard.compras).toFixed(2) }}
										<span class="text-danger text-sm font-weight-bolder"></span>
									</h5>
								</div>
							</div>
							<div class="col-4 text-end">
								<div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
									<i class="ni ni-paper-diploma text-lg opacity-10" aria-hidden="true"></i>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-xl-3 col-sm-6">
				<div class="card">
					<div class="card-body p-3">
						<div class="row">
							<div class="col-8">
								<div class="numbers">
									<p class="text-sm mb-0 text-capitalize font-weight-bold">
										Ventas
									</p>
									<h5 class="font-weight-bolder mb-0">
										{{ Number(dashboard.ventas).toFixed(2) }}
										<span class="text-success text-sm font-weight-bolder"></span>
									</h5>
								</div>
							</div>
							<div class="col-4 text-end">
								<div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
									<i class="ni ni-cart text-lg opacity-10" aria-hidden="true"></i>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row mt-4">
			<div class="col-lg-12">
				<div class="card z-index-2">
					<div class="card-header pb-0">
						<h6>Ventas y compras</h6>
					</div>
					<div class="card-body p-3">
						<div class="chart">
							<canvas id="chart-line" class="chart-canvas" height="300"></canvas>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "IndexPage",
	head() {
		return {
			title: "Index",
		};
	},
	data() {
		return {
			resource: 'dashboard',
			user: {},
			dashboard: {}
		}
	},
	methods: {
		async GET_DATA(path) {
			const apiData = await this.$api.$get(path);
			return apiData;
		},

	},
	mounted() {
		this.$nextTick(() => {
			let user = localStorage.getItem('userAuth')
			this.user = JSON.parse(user);

			this.$nextTick(async () => {
				await Promise.all([this.GET_DATA(this.resource)])
				.then(response => {
					this.dashboard = response[0];
				});
				try {
					let self = this;
					var ctx2 = document.getElementById("chart-line").getContext("2d");
					var gradientStroke1 = ctx2.createLinearGradient(0, 230, 0, 50);
					gradientStroke1.addColorStop(1, "rgba(203,12,159,0.2)");
					gradientStroke1.addColorStop(0.2, "rgba(72,72,176,0.0)");
					gradientStroke1.addColorStop(0, "rgba(203,12,159,0)"); //purple colors

					var gradientStroke2 = ctx2.createLinearGradient(0, 230, 0, 50);

					gradientStroke2.addColorStop(1, "rgba(20,23,39,0.2)");
					gradientStroke2.addColorStop(0.2, "rgba(72,72,176,0.0)");

					new Chart(ctx2, {
						type: "line",
						data: {
							labels: self.dashboard.meses.map((m) => m.mes),
							datasets: [
								{
									label: "Ventas",
									tension: 0.4,
									borderWidth: 0,
									pointRadius: 0,
									borderColor: "#cb0c9f",
									borderWidth: 3,
									backgroundColor: gradientStroke1,
									fill: true,
									data: self.dashboard.meses.map((m) => m.total),
									maxBarThickness: 6,
								},
								{
									label: "Compras",
									tension: 0.4,
									borderWidth: 0,
									pointRadius: 0,
									borderColor: "#78FECF",
									borderWidth: 3,
									backgroundColor: gradientStroke1,
									fill: true,
									data: self.dashboard.meses2.map((m) => m.total),
									maxBarThickness: 6,
								}
							],
						},
						options: {
							responsive: true,
							maintainAspectRatio: false,
							plugins: {
								legend: {
									display: false,
								},
							},
							interaction: {
								intersect: false,
								mode: "index",
							},
							scales: {
								y: {
									grid: {
										drawBorder: false,
										display: true,
										drawOnChartArea: true,
										drawTicks: false,
										borderDash: [5, 5],
									},
									ticks: {
										display: true,
										padding: 10,
										color: "#b2b9bf",
										font: {
											size: 11,
											family: "Open Sans",
											style: "normal",
											lineHeight: 2,
										},
									},
								},
								x: {
									grid: {
										drawBorder: false,
										display: false,
										drawOnChartArea: false,
										drawTicks: false,
										borderDash: [5, 5],
									},
									ticks: {
										display: true,
										color: "#b2b9bf",
										padding: 20,
										font: {
											size: 11,
											family: "Open Sans",
											style: "normal",
											lineHeight: 2,
										},
									},
								},
							},
						},
					});
				} catch (error) {
					console.log(error)
				}
			});
		})
	}
};
</script>