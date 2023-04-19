export const deletetable = {
    methods: {
        destroy(url) {
            return new Promise((resolve) => {
				this.$confirm('Eliminar Registro?', 'Eliminar', {
					confirmButtonText: 'OK',
					cancelButtonText: 'Cancel',
					type: 'warning',
					center: true,
					customClass: 'my-custom-class'
				  }).then(() => {
					this.$api.$post(url,{ '_method': 'DELETE'})
					.then(res => {
						if(res.success) {
							this.$message.success(res.message)
							resolve()
						}
					}).catch(error => {
						if (error) {
							this.$message.error('Error al intentar eliminar');
						} else {
							console.log(error.data.message)
						}
					})
				}).catch(error => {
                    console.log(error)
                });
            })
		}
    }
}