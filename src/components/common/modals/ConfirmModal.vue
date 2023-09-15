<script>
import Modal from "@/components/common/modals/Modal.vue";

export default {
	props: {
		title: {},
	},
	emits: ["confirm", "cancel"],
	methods: {
		raise() {
			this.$refs.modalRef.show();
		},
		confirm($event) {
			this.$refs.modalRef.hide();
			this.$emit("confirm", $event);
		},
		cancel($event) {
			this.$refs.modalRef.hide();
			this.$emit("cancel", $event);
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
					class="btn btn-secondary"
					@click="cancel"
					style="width: 100px"
				>
					Cancel
				</button>
				<button
					type="button"
					class="btn btn-primary"
					@click="confirm"
					style="width: 100px"
				>
					Confirm
				</button>
			</div>
		</div>
	</Modal>
</template>

<style scoped></style>
