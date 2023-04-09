<template>
	<div>
	<TemplateAside/>
	<main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
		<TemplateNav/>
		<div class="container-fluid py-4">
			<slot name="body"/>
			<TemplateFooter/>
		</div>
	</main>
  </div>
</template>
<script>
	export default {
		name: 'AdminTemplate'
	}
</script>