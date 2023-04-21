<template>
	<el-dialog :title="titleDialog" :visible="isModalVisible" @close="close" @open="create" append-to-body>
		<div class="modal-body">
			<div class="row">

			</div>
		</div>
	</el-dialog>
</template>
<script>
	export default {
		props: {
			isModalVisible: {
				type: Boolean,
				required: true
			},
			formulario:{
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				titleDialog: null,
				resource: 'cajas',
				formData: { ...this.formulario }
			}
		},
		created(){
			this.initForm();
		},
		methods: {
			initForm(){
			},
			create(){

			},
			close(){
				this.$emit('update:isModalVisible', false)
				this.initForm()
			}
		}
	}
</script>