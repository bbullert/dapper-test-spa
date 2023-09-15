import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/about",
			name: "about",
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import("../views/AboutView.vue"),
		},
		{
			path: "/employees",
			name: "employeeList",
			component: () => import("../views/employee/EmployeeView.vue"),
		},
		{
			path: "/employees/:id",
			name: "employeeDetails",
			component: () =>
				import("../views/employee/EmployeeDetailsView.vue"),
		},
		{
			path: "/employees/:id/edit",
			name: "employeeEdit",
			component: () => import("../views/employee/EmployeeEditView.vue"),
		},
		{
			path: "/employees/create",
			name: "employeeCreate",
			component: () => import("../views/employee/EmployeeCreateView.vue"),
		},
	],
});

export default router;
