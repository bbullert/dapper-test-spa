<script>
import { inRange } from "@/utilities/utilities.js";
import { employeeService } from "@/services/employeeService.js";
import AlertModal from "@/components/common/modals/AlertModal.vue";
import ConfirmModal from "@/components/common/modals/ConfirmModal.vue";

export default {
	data() {
		return {
			model: {
				id: null,
				firstName: null,
				lastName: null,
				birthDate: null,
			},
		};
	},
	methods: {
		set(args) {
			this.model.id = args.id;
			this.model.firstName = args.firstName;
			this.model.lastName = args.lastName;
			this.model.birthDate = args.birthDate;
		},
		get() {
			return structuredClone(this.model);
		},
		back() {
			this.$router.back();
		},
		remove() {
			this.$refs.deleteConfirmModal.raise();
		},
		edit() {
			this.$router.push("/employees/" + this.model.id + "/edit");
		},
		deleteConfirm() {
			employeeService.delete(this.model.id).then((response) => {
				console.log(response);
				if (inRange(response.status, 200, 299)) {
					this.back();
				} else if (inRange(response.status, 400, 499)) {
				} else if (inRange(response.status, 500, 599)) {
				}
			});
		},
	},
	mounted() {
		const id = this.$route.params.id;
		if (parseInt(id) != id) {
			this.$refs.notFoundModal.raise();
			return;
		}

		employeeService.get(id).then((response) => {
			console.log(response);
			if (inRange(response.status, 200, 299)) {
				if (!response.result) {
					this.$refs.notFoundModal.raise();
					return;
				}
				this.model = response.result;
				this.model.birthDate = response.result.birthDate.split("T")[0];
			} else if (inRange(response.status, 400, 499)) {
			} else if (inRange(response.status, 500, 599)) {
			}
		});
	},
	components: {
		AlertModal,
		ConfirmModal,
	},
};
</script>

<template>
	<div
		class="container vh-100 d-flex flex-column justify-content-center"
		style="max-width: 900px"
	>
		<form @submit.prevent="edit" class="card p-3">
			<div class="row p-3">
				<h4 class="pb-3">Employee Details</h4>
				<div class="col-6">
					<div>
						<small>Id</small>
						<p>{{ model.id }}</p>
					</div>
				</div>
				<div class="col-6">
					<div>
						<small>First Name</small>
						<p>{{ model.firstName }}</p>
					</div>
				</div>
			</div>
			<div class="row p-3">
				<div class="col-6">
					<div>
						<small>Last Name</small>
						<p>{{ model.lastName }}</p>
					</div>
				</div>
				<div class="col-6">
					<div>
						<small>Birth Date</small>
						<p>{{ model.birthDate }}</p>
					</div>
				</div>
			</div>
			<div class="hstack gap-3 m-3">
				<button
					type="button"
					class="btn btn-secondary"
					@click="back"
					style="width: 120px"
				>
					Back
				</button>
				<button
					type="button"
					class="btn btn-danger ms-auto"
					@click="remove"
					style="width: 120px"
				>
					Delete
				</button>
				<button
					type="submit"
					class="btn btn-primary"
					style="width: 120px"
				>
					Edit
				</button>
			</div>
		</form>
	</div>

	<AlertModal ref="notFoundModal" title="Employee not found" @ok="back">
		<p>Invalid employee identificator</p>
	</AlertModal>
	<ConfirmModal
		ref="deleteConfirmModal"
		title="Delete an employee"
		@confirm="deleteConfirm"
	>
		<p>
			Are you sure you want to delete employee
			<b>{{ model.firstName }} {{ model.lastName }}</b
			>?
		</p>
	</ConfirmModal>
</template>

<style scoped></style>
