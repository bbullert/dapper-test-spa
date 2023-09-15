<script>
import { inRange } from "@/utilities/utilities.js";
import { employeeService } from "@/services/employeeService.js";
import EmployeeFilter from "./EmployeeFilter.vue";
import PaginationBar from "../common/PaginationBar.vue";
import ConfirmModal from "@/components/common/modals/ConfirmModal.vue";
import Table from "@/components/common/Table.vue";

export default {
	data() {
		return {
			data: {},
			heads: ["Id", "First Name", "Last Name", "Birth Date"],
			cols: ["id", "firstName", "lastName", "birthDateString"],
			filter: {},
			isFilterEnabled: false,
			pagination: {},
			sortByOptions: [
				{ value: "id", name: "Id" },
				{ value: "firstName", name: "First Name" },
				{ value: "lastName", name: "Last Name" },
				{ value: "birthDate", name: "Birth Date" },
			],
		};
	},
	methods: {
		search() {
			let params = {
				...this.pagination,
				...this.filter,
			};
			delete params.totalPages;
			delete params.totalRows;
			// const params = {
			// 	...this.filter,
			// 	page: this.pagination.page,
			// 	pageSize: this.pagination.pageSize,
			// 	sortBy: this.pagination.sortBy,
			// 	sortOrder: this.pagination.sortOrder,
			// };
			// this.$refs.listRef.beforeLoad();
			this.$refs.listRef.unload();

			employeeService.search(params).then((response) => {
				console.log(response);
				if (inRange(response.status, 200, 299)) {
					this.pagination.totalPages = response.result.totalPages;
					this.pagination.totalRows = response.result.totalRows;
					this.data = response.result;

					this.$refs.topPaginationBar.set(this.pagination);
					this.$refs.bottomPaginationBar.set(this.pagination);
					this.$refs.listRef.load();

					this.$router.push(this.toPath(params));
				} else if (inRange(response.status, 400, 499)) {
					this.$root.$refs.errorModal.raise(response.details);
				} else if (inRange(response.status, 500, 599)) {
					this.$root.$refs.errorModal.raise(response.details);
				}
			});
		},
		toPath(args) {
			let path = this.$route.path;
			const query = new URLSearchParams(args).toString();
			if (query) path += "?" + query;
			return path;
		},
		onFilterApply($event, filter) {
			this.filter = filter;
			this.pagination.page = 1;
			this.search();
		},
		onFilterClear($event) {
			this.filter = {};
			this.pagination.page = 1;
			this.search();
		},
		onPaginationChange($event, pagination) {
			this.pagination = pagination;
			this.search();
		},
		onClickFilters($event) {
			this.isFilterEnabled = !this.isFilterEnabled;
		},
		goToAddEmployee($event) {
			this.$router.push({ name: "employeeCreate" });
		},
		getSelectedItems() {
			return this.data.rows?.filter((x) => x.selected) ?? [];
		},
		deleteSelected() {
			this.$refs.deleteConfirmModal.raise();
		},
		deleteConfirm() {
			const ids = this.getSelectedItems().map((x) => x.id);
			employeeService.deleteRange(ids).then((response) => {
				if (inRange(response.status, 200, 299)) {
					if (ids.length == this.data.rows.length)
						this.pagination.page = Math.max(
							this.pagination.page - 1,
							1
						);
					this.search();
				} else if (inRange(response.status, 400, 499)) {
					this.$root.$refs.errorModal.raise(response.details);
				} else if (inRange(response.status, 500, 599)) {
					this.$root.$refs.errorModal.raise(response.details);
				}
			});
		},
		seeDetails($event, id) {
			this.$router.push("/employees/" + id);
		},
	},
	mounted() {
		this.$refs.filterRef.set(this.$route.query);
		this.$refs.topPaginationBar.set(this.$route.query);
		this.$refs.bottomPaginationBar.set(this.$route.query);

		this.filter = this.$refs.filterRef.get();
		this.pagination = this.$refs.topPaginationBar.get();

		this.search();
	},
	components: {
		EmployeeFilter,
		PaginationBar,
		Table,
		ConfirmModal,
	},
};
</script>

<template>
	<section>
		<div class="hstack gap-3 m-3">
			<button
				type="button"
				class="btn btn-primary"
				@click="goToAddEmployee()"
				style="width: 120px"
			>
				Add
			</button>
			<button
				type="button"
				class="btn btn-danger"
				@click="deleteSelected()"
				:disabled="getSelectedItems().length == 0"
				style="width: 120px"
			>
				Delete
			</button>
			<button
				type="button"
				class="btn btn-secondary ms-auto"
				:class="{ active: isFilterEnabled }"
				@click="onClickFilters()"
				style="width: 120px"
			>
				Filters
			</button>
		</div>
		<hr class="m-0" />
	</section>
	<section :class="{ 'd-none': isFilterEnabled }">
		<EmployeeFilter
			ref="filterRef"
			@apply="($event, filter) => onFilterApply($event, filter)"
			@clear="($event, filter) => onFilterClear($event, filter)"
		></EmployeeFilter>
	</section>
	<section>
		<PaginationBar
			ref="topPaginationBar"
			:sortByOptions="sortByOptions"
			@change="
				($event, pagination) => onPaginationChange($event, pagination)
			"
		></PaginationBar>
	</section>
	<section class="flex-column d-flex flex-fill">
		<!-- <EmployeeList ref="listRef" :data="data"></EmployeeList> -->
		<Table
			ref="listRef"
			:heads="heads"
			:cols="cols"
			:data="data"
			@click="($event, id) => seeDetails($event, id)"
		></Table>
	</section>
	<section>
		<PaginationBar
			ref="bottomPaginationBar"
			:sortByOptions="sortByOptions"
			@change="
				($event, pagination) => onPaginationChange($event, pagination)
			"
		></PaginationBar>
	</section>

	<ConfirmModal
		ref="deleteConfirmModal"
		title="Delete employees"
		@confirm="deleteConfirm"
	>
		<p>
			Are you sure you want to delete
			<b>{{ getSelectedItems().length }}</b> employees?
		</p>
	</ConfirmModal>
</template>

<style scoped></style>
