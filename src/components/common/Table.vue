<script>
export default {
	props: {
		data: {},
		heads: { type: Array },
		cols: { type: Array },
	},
	emits: ["click"],
	data() {
		return {
			isLoading: false,
			selectAll: false,
		};
	},
	methods: {
		unload() {
			this.isLoading = true;
			this.selectAll = false;
		},
		load() {
			this.isLoading = false;
		},
		onClickItem($event, id) {
			this.$emit("click", $event, id);
		},
	},
	watch: {
		selectAll: function (value) {
			for (const item of this.data.rows) {
				item.selected = value;
			}
		},
	},
};
</script>

<template>
	<div
		v-if="isLoading"
		class="d-flex flex-fill justify-content-center align-items-center"
	>
		<div class="spinner-border text-secondary" role="status"></div>
	</div>
	<table v-else-if="data.rows" class="table mb-auto">
		<thead>
			<tr>
				<th scope="col" style="width: 42px">
					<input
						class="form-check-input"
						type="checkbox"
						v-model="selectAll"
					/>
				</th>
				<th v-for="head in heads" scope="col">{{ head }}</th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="item in data.rows"
				@click="($event) => onClickItem($event, item.id)"
			>
				<td scope="col" style="width: 42px" @click.stop>
					<input
						class="form-check-input"
						type="checkbox"
						v-model="item.selected"
					/>
				</td>
				<td v-for="col in cols" scope="col">{{ item[col] }}</td>
			</tr>
		</tbody>
	</table>
	<hr class="m-0" />
</template>

<style scoped>
th {
	font-weight: 600;
}
tbody tr {
	cursor: pointer;
}
tbody tr:hover {
	background: #f4f4f4;
}
td {
	background: transparent;
}
</style>
