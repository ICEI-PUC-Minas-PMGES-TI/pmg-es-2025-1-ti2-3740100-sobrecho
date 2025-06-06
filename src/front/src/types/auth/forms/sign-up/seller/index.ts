export type SellerSignUpFormType = {
	name: string;
	email: string;
	password: string;
	birthdate: string;
	phone: string;
	document: string;
	store: {
		name: string;
		description: string;
		image?: File;
	};
};
