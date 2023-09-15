<script>
import { inRange, getErrors, areEqual } from "@/utilities/utilities.js";
import { employeeService } from "@/services/employeeService.js";
import AlertModal from "@/components/common/modals/AlertModal.vue";
import ConfirmModal from "@/components/common/modals/ConfirmModal.vue";

export default {
	data() {
		return {
			model: {
				firstName: null,
				lastName: null,
				birthDate: null,
			},
			defaultModel: {},
			errors: {},
		};
	},
	methods: {
		set(args) {
			this.model.firstName = args.firstName;
			this.model.lastName = args.lastName;
			this.model.birthDate = args.birthDate;
		},
		get() {
			// return clearEmptyProperties({
			// 	firstName: this.firstName,
			// 	lastName: this.lastName,
			// 	birthDate: this.birthDate,
			// });
			return structuredClone(this.model);
		},
		create() {
			employeeService.create(this.model).then((response) => {
				console.log(response);
				if (inRange(response.status, 200, 299)) {
				} else if (inRange(response.status, 400, 499)) {
					this.errors = getErrors(response.result.errors);
				} else if (inRange(response.status, 500, 599)) {
				}
			});
		},
		cancel() {
			if (this.hasChanged()) {
				this.$refs.discardChangesModal.raise();
				return;
			}
			this.back();
		},
		back() {
			this.$router.back();
		},
		hasChanged() {
			return !areEqual(this.model, this.defaultModel);
		},
	},
	mounted() {
		Object.assign(this.defaultModel, this.model);
	},
	components: {
		ConfirmModal,
	},
};
</script>

<template>
	<div
		class="container vh-100 d-flex flex-column justify-content-center"
		style="max-width: 900px"
	>
		<form @submit.prevent="create" class="card p-3">
			<div class="row p-3">
				<h4 class="pb-3">Create Employee</h4>
				<div class="col-6">
					<div class="form-floating">
						<input
							type="text"
							class="form-control"
							:class="{ 'is-invalid': errors.firstName }"
							id="firstName"
							v-model="model.firstName"
						/>
						<label for="firstName" class="text-dark"
							>First Name</label
						>
						<div :class="{ 'invalid-feedback': errors.firstName }">
							{{ errors.firstName && errors.firstName[0] }}
						</div>
					</div>
				</div>
				<div class="col-6">
					<div class="form-floating">
						<input
							type="text"
							class="form-control"
							:class="{ 'is-invalid': errors.lastName }"
							id="lastName"
							v-model="model.lastName"
						/>
						<label for="lastName" class="text-dark"
							>Last Name</label
						>
						<div :class="{ 'invalid-feedback': errors.lastName }">
							{{ errors.lastName && errors.lastName[0] }}
						</div>
					</div>
				</div>
			</div>
			<div class="row p-3">
				<div class="col-6">
					<div class="form-floating">
						<input
							type="date"
							class="form-control"
							:class="{ 'is-invalid': errors.birthDate }"
							id="birthDate"
							v-model="model.birthDate"
						/>
						<label for="birthDate" class="text-dark"
							>Birth Date</label
						>
						<div :class="{ 'invalid-feedback': errors.birthDate }">
							{{ errors.birthDate && errors.birthDate[0] }}
						</div>
					</div>
				</div>
			</div>
			<div class="hstack gap-3 m-3">
				<button
					type="button"
					class="btn ms-auto"
					:class="hasChanged() ? 'btn-danger' : ' btn-secondary'"
					@click="cancel"
					style="width: 120px"
				>
					Cancel
				</button>
				<button
					type="submit"
					class="btn btn-primary"
					:disabled="!hasChanged()"
					style="width: 120px"
				>
					Create
				</button>
			</div>
		</form>
	</div>

	<ConfirmModal
		ref="discardChangesModal"
		title="Discard changes"
		@confirm="back"
	>
		<p>Are you sure you want to discard changes?</p>
	</ConfirmModal>
</template>

<style scoped></style>
