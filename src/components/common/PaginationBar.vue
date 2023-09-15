<script>
import { clamp, clearEmptyProperties } from "@/utilities/utilities.js";

export default {
	props: {
		pageSizeOptions: {
			default: [3, 6, 9],
		},
		sortByOptions: {},
		sortOrderOptions: {
			default: [
				{ value: "", name: "Ascending" },
				{ value: "desc", name: "Descending" },
			],
		},
	},
	emits: ["change"],
	data() {
		return {
			page: 0,
			pageSize: 0,
			sortBy: null,
			sortOrder: null,
			totalRows: 0,
			totalPages: 0,
		};
	},
	watch: {
		page: function (value) {
			this.setPage(value, 1, this.totalPages);
		},
	},
	mounted() {
		this.set({});
	},
	methods: {
		set(args) {
			this.setTotalPages(args.totalPages);
			this.setTotalRows(args.totalRows);
			this.setPage(args.page);
			this.setPageSize(args.pageSize);
			this.setSortBy(args.sortBy);
			this.setSortOrder(args.sortOrder);
		},
		setPage(value) {
			this.page = value ? clamp(value, 1, this.totalPages) : 1;
		},
		setPageSize(value) {
			this.pageSize = value
				? Math.max(value, 1)
				: this.pageSizeOptions[0];
		},
		setSortBy(value) {
			this.sortBy = value ? value : this.sortByOptions[0].value;
		},
		setSortOrder(value) {
			this.sortOrder = value ? value : this.sortOrderOptions[0].value;
		},
		setTotalPages(value) {
			this.totalPages = value ? Math.max(value, 1) : 1;
		},
		setTotalRows(value) {
			this.totalRows = value ? Math.max(value, 0) : 0;
		},
		get() {
			return clearEmptyProperties({
				page: this.page,
				pageSize: this.pageSize,
				sortBy: this.sortBy,
				sortOrder: this.sortOrder,
				totalPages: this.totalPages,
				totalRows: this.totalRows,
			});
		},
		nextPage($event) {
			this.setPage(this.page + 1);
			this.emitChange($event);
		},
		previousPage($event) {
			this.setPage(this.page - 1);
			this.emitChange($event);
		},
		startIndex() {
			return (this.page - 1) * parseInt(this.pageSize);
		},
		endIndex() {
			return Math.min(
				this.startIndex() + parseInt(this.pageSize),
				this.totalRows
			);
		},
		onChangePage($event) {
			this.emitChange($event);
		},
		onChangePageSize($event) {
			const currentValue = this.pageSize,
				newValue = parseInt($event.target.value);
			this.setPageSize(newValue);
			this.setTotalPages(
				Math.ceil((currentValue / newValue) * this.totalPages)
			);
			this.setPage(
				Math.ceil(((this.page - 1) * currentValue + 1) / newValue)
			);
			this.emitChange($event);
		},
		onChangeSort($event) {
			this.page = 1;
			this.emitChange($event);
		},
		emitChange($event) {
			this.$emit("change", $event, this.get());
		},
	},
};
</script>

<template>
	<div class="hstack gap-3 m-3">
		<button
			type="button"
			class="btn btn-outline-secondary"
			:disabled="page == 1"
			@click="previousPage"
		>
			&lt;
		</button>
		<input
			type="number"
			class="form-control"
			id="pageInput"
			v-model="page"
			@change.stop="onChangePage"
			style="width: 80px"
		/>
		<span>of {{ totalPages }}</span>
		<button
			type="button"
			class="btn btn-outline-secondary"
			:disabled="page == totalPages"
			@click="nextPage"
		>
			&gt;
		</button>
		<span v-if="totalRows">
			{{ startIndex() }} – {{ endIndex() }} of {{ totalRows }} rows</span
		>
		<span class="ms-auto">Sort by</span>
		<div class="input-group" style="width: 300px">
			<select
				class="form-select"
				v-model="sortBy"
				@change.stop="onChangeSort"
			>
				<option
					v-for="item in sortByOptions"
					:key="item.value"
					:value="item.value"
					value="{{ item.value }}"
				>
					{{ item.name }}
				</option>
			</select>
			<select
				class="form-select"
				v-model="sortOrder"
				@change.stop="onChangeSort"
			>
				<option
					v-for="item in sortOrderOptions"
					:key="item.value"
					:value="item.value"
				>
					{{ item.name }}
				</option>
			</select>
		</div>
		<span>Page size</span>
		<select
			class="form-select"
			:value="pageSize"
			@change.stop="onChangePageSize"
			style="width: 80px"
		>
			<option v-for="item in pageSizeOptions" :key="item" :value="item">
				{{ item }}
			</option>
		</select>
	</div>
	<hr class="m-0" />
</template>

<style scoped></style>
