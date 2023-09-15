export const clamp = function (value, min, max) {
	return Math.max(Math.min(value, max), min);
};

export const inRange = function (value, min, max) {
	return value >= min && value <= max;
};

export const clearEmptyProperties = function (obj) {
	for (const property in obj) {
		if (!obj[property]) delete obj[property];
	}
	return obj;
};

export const getErrors = function (errors) {
	let model = {};
	for (const error of errors) {
		const property =
			error.name.charAt(0).toLowerCase() + error.name.slice(1);
		model[property] = error.messages;
		if (model[property] && model[property].length == 0)
			delete model[property];
	}
	return model;
};

export const copy = function (model) {
	return JSON.parse(JSON.stringify(model));
};

// export const hasChanged2 = function (model, defaultModel) {
// 	for (const property in model) {
// 		if (model[property] != defaultModel[property]) return true;
// 	}
// 	return false;
// };
export const areEqual = function (model1, model2) {
	return JSON.stringify(model1) === JSON.stringify(model2);
};
