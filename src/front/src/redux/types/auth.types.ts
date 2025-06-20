export type IUser =
	| {
			role: 'ROLE_USER' | 'ROLE_ADMIN';
			id: string;
			name: string;
			email: string;
	  }
	| {
			role: 'ROLE_SELLER';
			id: string;
			name: string;
			email: string;
			store: {
				id: string;
				name: string;
				description: string;
				image: string;
			};
	  };

export type ISession = {
	tokens: {
		refresh: string;
		refresh_expires_at: string;
		access: string;
		access_expires_at: string;
	};
	user: IUser;
};
