import { all, delay, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'sonner';

import { DashboardCreators, DashboardTypes } from '@/redux/reducers';
import {
	IDashboardSellerCardsRequestAction,
	IDashboardSellerChartRequestAction
} from '@/redux/states';
import { IDashboardAdminCards, IDashboardSellerCards } from '@/redux/types';

function* dashboardSellerCardsRequest({ payload }: IDashboardSellerCardsRequestAction) {
	const data: IDashboardSellerCards = {
		totalRevenue: {
			value: 3280.0,
			percentual: 8.3
		},
		productsQuantity: {
			value: 82,
			percentual: 2.5
		},
		storeRating: {
			value: 4.6,
			percentual: 1.1
		},
		revenuePerProduct: {
			value: 40.0,
			percentual: 3.7
		}
	};
	try {
		// const { data } = yield call(api.get, `/dashboard/seller/${payload.storeId}/cards`);
		void payload;
		yield delay(2000);
		yield put(DashboardCreators.dashboardSellerCardsSuccess(data));
	} catch (error) {
		yield put(DashboardCreators.dashboardSellerCardsFailure());
		toast.error(String(error));
	}
}

function* dashboardSellerChartRequest({ payload }: IDashboardSellerChartRequestAction) {
	const mock = [
		{ date: '2024-04-01', revenue: 1497 },
		{ date: '2024-04-02', revenue: 2014 },
		{ date: '2024-04-03', revenue: 1342 },
		{ date: '2024-04-04', revenue: 1099 },
		{ date: '2024-04-05', revenue: 1533 },
		{ date: '2024-04-06', revenue: 1894 },
		{ date: '2024-04-07', revenue: 1702 },
		{ date: '2024-04-08', revenue: 1426 },
		{ date: '2024-04-09', revenue: 1671 },
		{ date: '2024-04-10', revenue: 2090 },
		{ date: '2024-04-11', revenue: 1564 },
		{ date: '2024-04-12', revenue: 1229 },
		{ date: '2024-04-13', revenue: 1801 },
		{ date: '2024-04-14', revenue: 1982 },
		{ date: '2024-04-15', revenue: 1357 },
		{ date: '2024-04-16', revenue: 1016 },
		{ date: '2024-04-17', revenue: 1748 },
		{ date: '2024-04-18', revenue: 1480 },
		{ date: '2024-04-19', revenue: 2073 },
		{ date: '2024-04-20', revenue: 1642 },
		{ date: '2024-04-21', revenue: 1367 },
		{ date: '2024-04-22', revenue: 1554 },
		{ date: '2024-04-23', revenue: 1277 },
		{ date: '2024-04-24', revenue: 1842 },
		{ date: '2024-04-25', revenue: 1210 },
		{ date: '2024-04-26', revenue: 2256 },
		{ date: '2024-04-27', revenue: 1755 },
		{ date: '2024-04-28', revenue: 1638 },
		{ date: '2024-04-29', revenue: 1463 },
		{ date: '2024-04-30', revenue: 1871 },
		{ date: '2024-05-01', revenue: 1102 },
		{ date: '2024-05-02', revenue: 1544 },
		{ date: '2024-05-03', revenue: 1989 },
		{ date: '2024-05-04', revenue: 1178 },
		{ date: '2024-05-05', revenue: 2250 },
		{ date: '2024-05-06', revenue: 1316 },
		{ date: '2024-05-07', revenue: 2047 },
		{ date: '2024-05-08', revenue: 1428 },
		{ date: '2024-05-09', revenue: 1285 },
		{ date: '2024-05-10', revenue: 1599 },
		{ date: '2024-05-11', revenue: 1006 },
		{ date: '2024-05-12', revenue: 1920 },
		{ date: '2024-05-13', revenue: 1706 },
		{ date: '2024-05-14', revenue: 2101 },
		{ date: '2024-05-15', revenue: 1242 },
		{ date: '2024-05-16', revenue: 2314 },
		{ date: '2024-05-17', revenue: 1937 },
		{ date: '2024-05-18', revenue: 2182 },
		{ date: '2024-05-19', revenue: 1164 },
		{ date: '2024-05-20', revenue: 1493 },
		{ date: '2024-05-21', revenue: 1027 },
		{ date: '2024-05-22', revenue: 1330 },
		{ date: '2024-05-23', revenue: 1630 },
		{ date: '2024-05-24', revenue: 1407 },
		{ date: '2024-05-25', revenue: 1991 },
		{ date: '2024-05-26', revenue: 2287 },
		{ date: '2024-05-27', revenue: 1704 },
		{ date: '2024-05-28', revenue: 1809 },
		{ date: '2024-05-29', revenue: 1555 },
		{ date: '2024-05-30', revenue: 1231 },
		{ date: '2024-05-31', revenue: 1933 },
		{ date: '2024-06-01', revenue: 2219 },
		{ date: '2024-06-02', revenue: 1240 },
		{ date: '2024-06-03', revenue: 1332 },
		{ date: '2024-06-04', revenue: 1675 },
		{ date: '2024-06-05', revenue: 1843 },
		{ date: '2024-06-06', revenue: 2106 },
		{ date: '2024-06-07', revenue: 1902 },
		{ date: '2024-06-08', revenue: 1093 },
		{ date: '2024-06-09', revenue: 1466 },
		{ date: '2024-06-10', revenue: 1714 },
		{ date: '2024-06-11', revenue: 1346 },
		{ date: '2024-06-12', revenue: 1609 },
		{ date: '2024-06-13', revenue: 2273 },
		{ date: '2024-06-14', revenue: 1388 },
		{ date: '2024-06-15', revenue: 1916 },
		{ date: '2024-06-16', revenue: 1577 },
		{ date: '2024-06-17', revenue: 1421 },
		{ date: '2024-06-18', revenue: 1183 },
		{ date: '2024-06-19', revenue: 2122 },
		{ date: '2024-06-20', revenue: 1300 },
		{ date: '2024-06-21', revenue: 1693 },
		{ date: '2024-06-22', revenue: 2065 },
		{ date: '2024-06-23', revenue: 1451 },
		{ date: '2024-06-24', revenue: 1740 },
		{ date: '2024-06-25', revenue: 1874 },
		{ date: '2024-06-26', revenue: 1615 },
		{ date: '2024-06-27', revenue: 1233 },
		{ date: '2024-06-28', revenue: 1380 },
		{ date: '2024-06-29', revenue: 1529 },
		{ date: '2024-06-30', revenue: 1807 }
	];
	try {
		// const { data } = yield call(api.get, `/dashboard/seller/${payload.storeId}/chart`);
		void payload;
		yield delay(2000);
		yield put(DashboardCreators.dashboardSellerChartSuccess(mock));
	} catch (error) {
		yield put(DashboardCreators.dashboardSellerChartFailure());
		toast.error(String(error));
	}
}

function* dashboardAdminCardsRequest() {
	const data: IDashboardAdminCards = {
		totalRevenue: {
			value: 98250.0,
			percentual: 7.8
		},
		percentageOfSellers: {
			value: 18.2,
			percentual: 1.5
		},
		averageRevenuePerSeller: {
			value: 2764.71,
			percentual: -2.4
		},
		averageOrderValue: {
			value: 164.95,
			percentual: 3.9
		}
	};
	try {
		// const { data } = yield call(api.get, `/dashboard/admin/cards`);
		yield delay(2000);
		yield put(DashboardCreators.dashboardAdminCardsSuccess(data));
	} catch (error) {
		yield put(DashboardCreators.dashboardAdminCardsFailure());
		toast.error(String(error));
	}
}

function* dashboardAdminChartRequest() {
	const mock = [
		{ date: '2024-04-01', user: 222, seller: 150 },
		{ date: '2024-04-02', user: 97, seller: 180 },
		{ date: '2024-04-03', user: 167, seller: 120 },
		{ date: '2024-04-04', user: 242, seller: 260 },
		{ date: '2024-04-05', user: 373, seller: 290 },
		{ date: '2024-04-06', user: 301, seller: 340 },
		{ date: '2024-04-07', user: 245, seller: 180 },
		{ date: '2024-04-08', user: 409, seller: 320 },
		{ date: '2024-04-09', user: 59, seller: 110 },
		{ date: '2024-04-10', user: 261, seller: 190 },
		{ date: '2024-04-11', user: 327, seller: 350 },
		{ date: '2024-04-12', user: 292, seller: 210 },
		{ date: '2024-04-13', user: 342, seller: 380 },
		{ date: '2024-04-14', user: 137, seller: 220 },
		{ date: '2024-04-15', user: 120, seller: 170 },
		{ date: '2024-04-16', user: 138, seller: 190 },
		{ date: '2024-04-17', user: 446, seller: 360 },
		{ date: '2024-04-18', user: 364, seller: 410 },
		{ date: '2024-04-19', user: 243, seller: 180 },
		{ date: '2024-04-20', user: 89, seller: 150 },
		{ date: '2024-04-21', user: 137, seller: 200 },
		{ date: '2024-04-22', user: 224, seller: 170 },
		{ date: '2024-04-23', user: 138, seller: 230 },
		{ date: '2024-04-24', user: 387, seller: 290 },
		{ date: '2024-04-25', user: 215, seller: 250 },
		{ date: '2024-04-26', user: 75, seller: 130 },
		{ date: '2024-04-27', user: 383, seller: 420 },
		{ date: '2024-04-28', user: 122, seller: 180 },
		{ date: '2024-04-29', user: 315, seller: 240 },
		{ date: '2024-04-30', user: 454, seller: 380 },
		{ date: '2024-05-01', user: 165, seller: 220 },
		{ date: '2024-05-02', user: 293, seller: 310 },
		{ date: '2024-05-03', user: 247, seller: 190 },
		{ date: '2024-05-04', user: 385, seller: 420 },
		{ date: '2024-05-05', user: 481, seller: 390 },
		{ date: '2024-05-06', user: 498, seller: 520 },
		{ date: '2024-05-07', user: 388, seller: 300 },
		{ date: '2024-05-08', user: 149, seller: 210 },
		{ date: '2024-05-09', user: 227, seller: 180 },
		{ date: '2024-05-10', user: 293, seller: 330 },
		{ date: '2024-05-11', user: 335, seller: 270 },
		{ date: '2024-05-12', user: 197, seller: 240 },
		{ date: '2024-05-13', user: 197, seller: 160 },
		{ date: '2024-05-14', user: 448, seller: 490 },
		{ date: '2024-05-15', user: 473, seller: 380 },
		{ date: '2024-05-16', user: 338, seller: 400 },
		{ date: '2024-05-17', user: 499, seller: 420 },
		{ date: '2024-05-18', user: 315, seller: 350 },
		{ date: '2024-05-19', user: 235, seller: 180 },
		{ date: '2024-05-20', user: 177, seller: 230 },
		{ date: '2024-05-21', user: 82, seller: 140 },
		{ date: '2024-05-22', user: 81, seller: 120 },
		{ date: '2024-05-23', user: 252, seller: 290 },
		{ date: '2024-05-24', user: 294, seller: 220 },
		{ date: '2024-05-25', user: 201, seller: 250 },
		{ date: '2024-05-26', user: 213, seller: 170 },
		{ date: '2024-05-27', user: 420, seller: 460 },
		{ date: '2024-05-28', user: 233, seller: 190 },
		{ date: '2024-05-29', user: 78, seller: 130 },
		{ date: '2024-05-30', user: 340, seller: 280 },
		{ date: '2024-05-31', user: 178, seller: 230 },
		{ date: '2024-06-01', user: 178, seller: 200 },
		{ date: '2024-06-02', user: 470, seller: 410 },
		{ date: '2024-06-03', user: 103, seller: 160 },
		{ date: '2024-06-04', user: 439, seller: 380 },
		{ date: '2024-06-05', user: 88, seller: 140 },
		{ date: '2024-06-06', user: 294, seller: 250 },
		{ date: '2024-06-07', user: 323, seller: 370 },
		{ date: '2024-06-08', user: 385, seller: 320 },
		{ date: '2024-06-09', user: 438, seller: 480 },
		{ date: '2024-06-10', user: 155, seller: 200 },
		{ date: '2024-06-11', user: 92, seller: 150 },
		{ date: '2024-06-12', user: 492, seller: 420 },
		{ date: '2024-06-13', user: 81, seller: 130 },
		{ date: '2024-06-14', user: 426, seller: 380 },
		{ date: '2024-06-15', user: 307, seller: 350 },
		{ date: '2024-06-16', user: 371, seller: 310 },
		{ date: '2024-06-17', user: 475, seller: 520 },
		{ date: '2024-06-18', user: 107, seller: 170 },
		{ date: '2024-06-19', user: 341, seller: 290 },
		{ date: '2024-06-20', user: 408, seller: 450 },
		{ date: '2024-06-21', user: 169, seller: 210 },
		{ date: '2024-06-22', user: 317, seller: 270 },
		{ date: '2024-06-23', user: 480, seller: 530 },
		{ date: '2024-06-24', user: 132, seller: 180 },
		{ date: '2024-06-25', user: 141, seller: 190 },
		{ date: '2024-06-26', user: 434, seller: 380 },
		{ date: '2024-06-27', user: 448, seller: 490 },
		{ date: '2024-06-28', user: 149, seller: 200 },
		{ date: '2024-06-29', user: 103, seller: 160 },
		{ date: '2024-06-30', user: 446, seller: 400 }
	];
	try {
		// const { data } = yield call(api.post, '/dashboard/admin/chart');
		yield delay(2000);
		yield put(DashboardCreators.dashboardAdminChartSuccess(mock));
	} catch (error) {
		yield put(DashboardCreators.dashboardAdminChartFailure());
		toast.error(String(error));
	}
}

export const dashboard = all([
	takeLatest(DashboardTypes.DASHBOARD_SELLER_CARDS_REQUEST, dashboardSellerCardsRequest),
	takeLatest(DashboardTypes.DASHBOARD_SELLER_CHART_REQUEST, dashboardSellerChartRequest),
	takeLatest(DashboardTypes.DASHBOARD_ADMIN_CARDS_REQUEST, dashboardAdminCardsRequest),
	takeLatest(DashboardTypes.DASHBOARD_ADMIN_CHART_REQUEST, dashboardAdminChartRequest)
]);
