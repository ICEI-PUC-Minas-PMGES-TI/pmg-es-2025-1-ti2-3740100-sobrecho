export interface IDashboardSellerCards {
	totalRevenue: {
		value: number;
		percentual: number;
	};
	productsQuantity: {
		value: number;
		percentual: number;
	};
	storeRating: {
		value: number;
		percentual: number;
	};
	revenuePerProduct: {
		value: number;
		percentual: number;
	};
}

export interface IDashboardSellerChart {
	date: string;
	revenue: number;
}

export interface IDashboardAdminCards {
	totalRevenue: {
		value: number;
		percentual: number;
	};
	percentageOfSellers: {
		value: number;
		percentual: number;
	};
	averageRevenuePerSeller: {
		value: number;
		percentual: number;
	};
	averageOrderValue: {
		value: number;
		percentual: number;
	};
}

export interface IDashboardAdminChart {
	date: string;
	user: number;
	seller: number;
}
