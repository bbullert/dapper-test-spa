<script>
import { copy, clearEmptyProperties, areEqual } from "@/utilities/utilities.js";

export default {
	emits: ["apply", "clear"],
	data() {
		return {
			filter: {
				id: null,
				firstName: null,
				lastName: null,
				birthDateFrom: null,
				birthDateTo: null,
			},
			defaultFilter: {},
		};
	},
	methods: {
		set(args) {
			this.filter = {
				id: args.id ?? null,
				firstName: args.firstName ?? null,
				lastName: args.lastName ?? null,
				birthDateFrom: args.birthDateFrom ?? null,
				birthDateTo: args.birthDateTo ?? null,
			};
		},
		get() {
			return clearEmptyProperties(copy(this.filter));
		},
		apply($event) {
			this.$emit("apply", $event, this.get());
		},
		clear($event) {
			this.set({});
			this.$emit("clear", $event);
		},
		hasChanged() {
			return !areEqual(this.filter, this.defaultFilter);
		},
	},
	mounted() {
		this.defaultFilter = copy(this.filter);
	},
};
</script>

<template>
	<form @submit.prevent="apply">
		<div class="row p-3">
			<div class="col-2">
				<div class="form-floating">
					<input
						type="number"
						class="form-control"
						id="idFilter"
						v-model="filter.id"
					/>
					<label for="idFilter" class="text-dark">Id</label>
				</div>
			</div>
			<div class="col-3">
				<div class="form-floating">
					<input
						type="text"
						class="form-control"
						id="firstNameFilter"
						v-model="filter.firstName"
					/>
					<label for="firstNameFilter" class="text-dark"
						>First Name</label
					>
				</div>
			</div>
			<div class="col-3">
				<div class="form-floating">
					<input
						type="text"
						class="form-control"
						id="lastNameFilter"
						v-model="filter.lastName"
					/>
					<label for="lastNameFilter" class="text-dark"
						>Last Name</label
					>
				</div>
			</div>
			<div class="col-4">
				<div class="input-group">
					<div class="form-floating">
						<input
							type="date"
							class="form-control"
							id="birthDateFromFilter"
							v-model="filter.birthDateFrom"
						/>
						<label for="birthDateFromFilter" class="text-dark"
							>Birth Date – From</label
						>
					</div>
					<div class="form-floating">
						<input
							type="date"
							class="form-control"
							id="birthDateToFilter"
							v-model="filter.birthDateTo"
						/>
						<label for="birthDateToFilter" class="text-dark"
							>To</label
						>
					</div>
				</div>
			</div>
		</div>
		<div class="hstack gap-3 m-3">
			<button
				type="button"
				class="btn btn-secondary ms-auto"
				@click="clear"
				:disabled="!hasChanged()"
				style="width: 120px"
			>
				Clear
			</button>
			<button
				type="submit"
				class="btn btn-primary"
				:disabled="!hasChanged()"
				style="width: 120px"
			>
				Apply
			</button>
		</div>
	</form>
	<hr class="m-0" />
</template>

<style scoped></style>
