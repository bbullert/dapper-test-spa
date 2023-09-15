<script>
export default {
	data() {
		return {
			isRaised: false,
		};
	},
	methods: {
		show() {
			this.isRaised = true;
		},
		hide() {
			this.isRaised = false;
		},
	},
};
</script>

<template>
	<div class="modal-layer" :class="{ raised: isRaised }">
		<slot></slot>
	</div>
</template>

<style scoped>
.modal-layer {
	position: fixed;
	justify-content: center;
	align-items: center;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 99999;
	background: rgba(0, 0, 0, 0.6);
	display: none;
}
.modal-layer.raised {
	display: flex;
}
</style>
