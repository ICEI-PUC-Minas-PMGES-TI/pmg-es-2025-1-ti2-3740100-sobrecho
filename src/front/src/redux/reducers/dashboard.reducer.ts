import { createActions, createReducer } from 'reduxsauce';

import {
	IDashboardAdminCardsSuccessAction,
	IDashboardAdminChartSuccessAction,
	IDashboardCreators,
	IDashboardSellerCardsSuccessAction,
	IDashboardSellerChartSuccessAction,
	IDashboardState,
	IDashboardTypes
} from '@/redux/states';
import {
	IDashboardAdminCards,
	IDashboardAdminChart,
	IDashboardSellerCards,
	IDashboardSellerChart
} from '@/redux/types';

const INITIAL_STATE: IDashboardState = {
	seller: {
		cards: {
			loading: false,
			data: {} as IDashboardSellerCards
		},
		chart: {
			loading: false,
			data: [] as IDashboardSellerChart[]
		}
	},
	admin: {
		cards: {
			loading: false,
			data: {} as IDashboardAdminCards
		},
		chart: {
			loading: false,
			data: [] as IDashboardAdminChart[]
		}
	}
};

export const { Creators: DashboardCreators, Types: DashboardTypes } = createActions<
	IDashboardTypes,
	IDashboardCreators
>({
	dashboardSellerCardsRequest: ['payload'],
	dashboardSellerCardsSuccess: ['payload'],
	dashboardSellerCardsFailure: [],

	dashboardSellerChartRequest: ['payload'],
	dashboardSellerChartSuccess: ['payload'],
	dashboardSellerChartFailure: [],

	dashboardAdminCardsRequest: ['payload'],
	dashboardAdminCardsSuccess: ['payload'],
	dashboardAdminCardsFailure: [],

	dashboardAdminChartRequest: ['payload'],
	dashboardAdminChartSuccess: ['payload'],
	dashboardAdminChartFailure: []
});

const dashboardSellerCardsRequest = (state = INITIAL_STATE): IDashboardState => ({
	...state,
	seller: {
		...state.seller,
		cards: {
			...state.seller.cards,
			loading: true
		}
	}
});
const dashboardSellerCardsSuccess = (
	state = INITIAL_STATE,
	{ payload }: IDashboardSellerCardsSuccessAction
): IDashboardState => ({
	...state,
	seller: {
		...state.seller,
		cards: {
			...state.seller.cards,
			loading: false,
			data: payload
		}
	}
});
const dashboardSellerCardsFailure = (state = INITIAL_STATE): IDashboardState => ({
	...state,
	seller: {
		...state.seller,
		cards: {
			...state.seller.cards,
			loading: false
		}
	}
});

const dashboardSellerChartRequest = (state = INITIAL_STATE): IDashboardState => ({
	...state,
	seller: {
		...state.seller,
		chart: {
			...state.seller.chart,
			loading: true
		}
	}
});
const dashboardSellerChartSuccess = (
	state = INITIAL_STATE,
	{ payload }: IDashboardSellerChartSuccessAction
): IDashboardState => ({
	...state,
	seller: {
		...state.seller,
		chart: {
			...state.seller.chart,
			loading: false,
			data: payload
		}
	}
});
const dashboardSellerChartFailure = (state = INITIAL_STATE): IDashboardState => ({
	...state,
	seller: {
		...state.seller,
		chart: {
			...state.seller.chart,
			loading: false
		}
	}
});

const dashboardAdminCardsRequest = (state = INITIAL_STATE): IDashboardState => ({
	...state,
	admin: {
		...state.admin,
		cards: {
			...state.admin.cards,
			loading: true
		}
	}
});
const dashboardAdminCardsSuccess = (
	state = INITIAL_STATE,
	{ payload }: IDashboardAdminCardsSuccessAction
): IDashboardState => ({
	...state,
	admin: {
		...state.admin,
		cards: {
			...state.admin.cards,
			loading: false,
			data: payload
		}
	}
});
const dashboardAdminCardsFailure = (state = INITIAL_STATE): IDashboardState => ({
	...state,
	admin: {
		...state.admin,
		cards: {
			...state.admin.cards,
			loading: false
		}
	}
});

const dashboardAdminChartRequest = (state = INITIAL_STATE): IDashboardState => ({
	...state,
	admin: {
		...state.admin,
		chart: {
			...state.admin.chart,
			loading: true
		}
	}
});
const dashboardAdminChartSuccess = (
	state = INITIAL_STATE,
	{ payload }: IDashboardAdminChartSuccessAction
): IDashboardState => ({
	...state,
	admin: {
		...state.admin,
		chart: {
			...state.admin.chart,
			loading: false,
			data: payload
		}
	}
});
const dashboardAdminChartFailure = (state = INITIAL_STATE): IDashboardState => ({
	...state,
	admin: {
		...state.admin,
		chart: {
			...state.admin.chart,
			loading: false
		}
	}
});

export const dashboard = createReducer(INITIAL_STATE, {
	[DashboardTypes.DASHBOARD_SELLER_CARDS_REQUEST]: dashboardSellerCardsRequest,
	[DashboardTypes.DASHBOARD_SELLER_CARDS_SUCCESS]: dashboardSellerCardsSuccess,
	[DashboardTypes.DASHBOARD_SELLER_CARDS_FAILURE]: dashboardSellerCardsFailure,

	[DashboardTypes.DASHBOARD_SELLER_CHART_REQUEST]: dashboardSellerChartRequest,
	[DashboardTypes.DASHBOARD_SELLER_CHART_SUCCESS]: dashboardSellerChartSuccess,
	[DashboardTypes.DASHBOARD_SELLER_CHART_FAILURE]: dashboardSellerChartFailure,

	[DashboardTypes.DASHBOARD_ADMIN_CARDS_REQUEST]: dashboardAdminCardsRequest,
	[DashboardTypes.DASHBOARD_ADMIN_CARDS_SUCCESS]: dashboardAdminCardsSuccess,
	[DashboardTypes.DASHBOARD_ADMIN_CARDS_FAILURE]: dashboardAdminCardsFailure,

	[DashboardTypes.DASHBOARD_ADMIN_CHART_REQUEST]: dashboardAdminChartRequest,
	[DashboardTypes.DASHBOARD_ADMIN_CHART_SUCCESS]: dashboardAdminChartSuccess,
	[DashboardTypes.DASHBOARD_ADMIN_CHART_FAILURE]: dashboardAdminChartFailure
});
