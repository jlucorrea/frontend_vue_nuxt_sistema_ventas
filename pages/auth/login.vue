<template>
	<div>
		<main class="main-content main-content-bg mt-0 ps">
			<section>
				<div class="page-header min-vh-75">
					<div class="container">
						<div class="row">
							<div class="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
								<div class="card card-plain bg-white mt-8">
									<div class="card-header pb-0 text-start">
										<h3 class="font-weight-bolder text-info text-gradient">Bienvenido</h3>
										<p class="mb-0">Ingresar usuario y contraseña</p>
									</div>
									<div class="card-body">
										<form role="form" class="text-start">
											<label>Usuario</label>
											<div class="mb-3">
												<input type="email" v-model="form.email" class="form-control" placeholder="Email" aria-label="Email">
											</div>
											<label>Contraseña</label>
											<div class="mb-3">
												<input type="password" v-model="form.password" class="form-control" placeholder="Password" aria-label="Password">
											</div>
											<div class="text-center">
												<button type="button" class="btn bg-gradient-info w-100 mt-4 mb-0" @click="login()">Iniciar Sessión</button>
											</div>
										</form>
									</div>
								</div>
							</div>
							<div class="col-md-6">
								<div class="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
									<div class="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6" style="background-image:url('../../../assets/img/curved-images/curved9.jpg')"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	</div>
</template>
<script>
export default {
	data() {
		return {
			resource: 'login',
			form:{}
		}
	},
	created(){
		this.initForm();
	},
	methods: {
		initForm(){
			this.form = {
				email: null,
				password: null
			}
		},
		async login(){
			try {
				const res = await this.$api.$post(`${this.resource}`, this.form);
				let user = res;
				if(user.hasOwnProperty('errors')){
					this.$message.error('Datos incorrectos');
				}else{
					localStorage.setItem('userAuth', JSON.stringify(user));
					this.$router.push('/');
					console.log(res);
				}
			} catch (error) {
				console.log(error);
				this.$message.error('No se puede inicar sesion');
			}
		}
	}
}
</script>