<script>
import Modal from "@/components/common/modals/Modal.vue";

export default {
	props: {
		title: {},
	},
	emits: ["ok"],
	methods: {
		raise() {
			this.$refs.modalRef.show();
		},
		ok($event) {
			this.$refs.modalRef.hide();
			this.$emit("ok", $event);
		},
	},
	components: {
		Modal,
	},
};
</script>

<template>
	<Modal ref="modalRef">
		<div class="card p-3" style="width: 420px; min-height: 240px">
			<div class="hstack gap-3 m-3">
				<h5 class="">{{ title }}</h5>
			</div>
			<div class="hstack gap-3 mx-3 flex-fill align-items-start">
				<slot></slot>
			</div>
			<div class="hstack gap-3 m-3 justify-content-center">
				<button
					type="button"
					class="btn btn-primary"
					@click="ok"
					style="width: 100px"
				>
					Ok
				</button>
			</div>
		</div>
	</Modal>
</template>

<style scoped></style>
