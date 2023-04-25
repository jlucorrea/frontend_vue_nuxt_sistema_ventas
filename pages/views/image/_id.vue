<template>
	<div>
		<AdminTemplate>
			<div slot="body">
				<div class="row justify-content-center">
					<div class="col-sm-4 col-12">
						<div class="card">
							<div class="card-header">
								<h3>Actualizar</h3>
							</div>
							<div class="card-body">
								<div class="form-control dropzone" id="fileDrop">
									<div class="fallback">
										<input name="file" type="file" multiple />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-sm-8 col-12">
						<div class="card">
							<div class="card-header">
								<h3>Actualizar</h3>
							</div>
							<div class="card-body">
								<ul class="list-group">
									<li v-for="image in form.articuloimage" class="list-group-item border-0 d-flex align-items-center px-0 mb-2">
										<div class="avatar me-3">
											<img :src="image.url" alt="image" class="border-radius-lg shadow">
										</div>
										<a class="btn btn-link pe-3 ps-0 mb-0 ms-auto" href="javascript:void(0);" @click="Delete(image.id)">Eliminar</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</AdminTemplate>
	</div>
</template>
  
<script>
import Dropzone from 'dropzone';
import { deletetable } from "../../../plugins/deletetable.js"
export default {
	name: "IndexPage",
	head() {
		return {
			title: 'Articulo',
		};
	},
	mixins: [deletetable],
	data() {
		return {
			myDropzone: null,
			form: {},
			apiUrl: "articuloImages/articulos"
		};
	},
	mounted() {
		this.$nextTick(async () => {
			Dropzone.autoDiscover = false;
			try {
				this.getData();
			} catch (e) {
				console.log(e);
			} finally {
				let url = this.$api.url + 'articuloImages/articulos/' + this.$route.params.id
				this.myDropzone = new Dropzone('div#fileDrop', {
					dictDefaultMessage: 'Arrastra y suelta archivos aquí',
					url: url,
					headers: {
						'Authorization': '',
						'Cache-Control': null,
						'X-Requested-With': null
					}
				});
				this.myDropzone.on('success', () => {
					this.getData();
				});
				this.myDropzone.on("complete", function (file) {
					this.removeFile(file);
				});
			}
		});
	},
	methods: {
		async GET_DATA(path) {
			const res = await this.$api.$get(path);
			return res;
		},
		async getData(){
			await Promise.all([
				this.GET_DATA(this.apiUrl + "/" + this.$route.params.id)
			]).then((response) => {
				this.form = response[0];
			});
		},
		Delete(id){
			this.destroy(`/${this.apiUrl}/delete/${id}`)
			.then(() =>
				this.getData()
			)
		}
	},
};
</script>