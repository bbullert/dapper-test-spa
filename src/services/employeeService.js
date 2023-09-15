const API = "https://localhost:5001/api/";

export const employeeService = {
	get: function (id) {
		return fetch(API + "employees/" + id)
			.then((response) => response.text())
			.then((data) => {
				return Promise.resolve(data ? JSON.parse(data) : {});
			})
			.catch((failure) => {
				return Promise.reject(failure);
			});
	},
	search: function (params) {
		return fetch(
			API + "employees?" + new URLSearchParams(params).toString()
		)
			.then((response) => response.text())
			.then((data) => {
				return Promise.resolve(data ? JSON.parse(data) : {});
			})
			.catch((failure) => {
				return Promise.reject(failure);
			});
	},
	create: function (model) {
		return fetch(API + "employees", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(model),
		})
			.then((response) => response.text())
			.then((data) => {
				return Promise.resolve(data ? JSON.parse(data) : {});
			})
			.catch((failure) => {
				return Promise.reject(failure);
			});
	},
	patch: function (id, model) {
		return fetch(API + "employees/" + id, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(model),
		})
			.then((response) => response.text())
			.then((data) => {
				return Promise.resolve(data ? JSON.parse(data) : {});
			})
			.catch((failure) => {
				return Promise.reject(failure);
			});
	},
	delete: function (id) {
		return fetch(API + "employees/" + id, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.text())
			.then((data) => {
				return Promise.resolve(data ? JSON.parse(data) : {});
			})
			.catch((failure) => {
				return Promise.reject(failure);
			});
	},
	deleteRange: function (ids) {
		return fetch(API + "employees/bulk", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ids: ids }),
		})
			.then((response) => response.text())
			.then((data) => {
				return Promise.resolve(data ? JSON.parse(data) : {});
			})
			.catch((failure) => {
				return Promise.reject(failure);
			});
	},
};
