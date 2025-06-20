import { AnyAction } from 'redux-saga';

import {
	IDashboardAdminCards,
	IDashboardAdminChart,
	IDashboardSellerCards,
	IDashboardSellerChart
} from '@/redux/types';

export interface IDashboardState {
	seller: {
		cards: {
			loading: boolean;
			data: IDashboardSellerCards;
		};
		chart: {
			loading: boolean;
			data: IDashboardSellerChart[];
		};
	};
	admin: {
		cards: {
			loading: boolean;
			data: IDashboardAdminCards;
		};
		chart: {
			loading: boolean;
			data: IDashboardAdminChart[];
		};
	};
}

export interface IDashboardTypes {
	DASHBOARD_SELLER_CARDS_REQUEST: string;
	DASHBOARD_SELLER_CARDS_SUCCESS: string;
	DASHBOARD_SELLER_CARDS_FAILURE: string;

	DASHBOARD_SELLER_CHART_REQUEST: string;
	DASHBOARD_SELLER_CHART_SUCCESS: string;
	DASHBOARD_SELLER_CHART_FAILURE: string;

	DASHBOARD_ADMIN_CARDS_REQUEST: string;
	DASHBOARD_ADMIN_CARDS_SUCCESS: string;
	DASHBOARD_ADMIN_CARDS_FAILURE: string;

	DASHBOARD_ADMIN_CHART_REQUEST: string;
	DASHBOARD_ADMIN_CHART_SUCCESS: string;
	DASHBOARD_ADMIN_CHART_FAILURE: string;
}

export interface IDashboardSellerCardsRequestAction extends AnyAction {
	payload: {
		storeId: string;
	};
}
export interface IDashboardSellerCardsSuccessAction extends AnyAction {
	payload: IDashboardSellerCards;
}
export interface IDashboardSellerCardsFailureAction extends AnyAction {}

export interface IDashboardSellerChartRequestAction extends AnyAction {
	payload: {
		storeId: string;
	};
}
export interface IDashboardSellerChartSuccessAction extends AnyAction {
	payload: IDashboardSellerChart[];
}
export interface IDashboardSellerChartFailureAction extends AnyAction {}

export interface IDashboardAdminCardsRequestAction extends AnyAction {}
export interface IDashboardAdminCardsSuccessAction extends AnyAction {
	payload: IDashboardAdminCards;
}
export interface IDashboardAdminCardsFailureAction extends AnyAction {}

export interface IDashboardAdminChartRequestAction extends AnyAction {}
export interface IDashboardAdminChartSuccessAction extends AnyAction {
	payload: IDashboardAdminChart[];
}
export interface IDashboardAdminChartFailureAction extends AnyAction {}

export interface IDashboardCreators {
	dashboardSellerCardsRequest: (
		payload: IDashboardSellerCardsRequestAction['payload']
	) => IDashboardSellerCardsRequestAction;
	dashboardSellerCardsSuccess: (
		payload: IDashboardSellerCardsSuccessAction['payload']
	) => IDashboardSellerCardsSuccessAction;
	dashboardSellerCardsFailure: () => IDashboardSellerCardsFailureAction;

	dashboardSellerChartRequest: (
		payload: IDashboardSellerChartRequestAction['payload']
	) => IDashboardSellerChartRequestAction;
	dashboardSellerChartSuccess: (
		payload: IDashboardSellerChartSuccessAction['payload']
	) => IDashboardSellerChartSuccessAction;
	dashboardSellerChartFailure: () => IDashboardSellerChartFailureAction;

	dashboardAdminCardsRequest: () => IDashboardAdminCardsRequestAction;
	dashboardAdminCardsSuccess: (
		payload: IDashboardAdminCardsSuccessAction['payload']
	) => IDashboardAdminCardsSuccessAction;
	dashboardAdminCardsFailure: () => IDashboardAdminCardsFailureAction;

	dashboardAdminChartRequest: () => IDashboardAdminChartRequestAction;
	dashboardAdminChartSuccess: (
		payload: IDashboardAdminChartSuccessAction['payload']
	) => IDashboardAdminChartSuccessAction;
	dashboardAdminChartFailure: () => IDashboardAdminChartFailureAction;
}
