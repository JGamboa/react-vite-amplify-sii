const validateName = (value, validationResponse) => {
	if (value.length < 3) {
		return {
			hasError: true,
			errorMessage: 'Nombre debería tener minimo 3 caracteres',
		};
	}
	return validationResponse;
};

const validateIdentityCard = (value, validationResponse) => {
	if (value.length < 3) {
		return {
			hasError: true,
			errorMessage: 'El rut debería tener minimo 3 caracteres',
		};
	}
	return validationResponse;
};

const validateSiiPassword = (value, validationResponse) => {
	if (value.length == 0) {
		return {
			hasError: true,
			errorMessage: 'La contraseña debe estar presente',
		};
	}
	return validationResponse;
};

export default {
	name: validateName,
	identityCard: validateIdentityCard,
	siiPassword: validateSiiPassword,
};
