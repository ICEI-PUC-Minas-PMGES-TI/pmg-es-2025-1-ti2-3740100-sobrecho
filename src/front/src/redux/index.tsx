import { reducers } from '@/redux/reducers';
import { sagas } from '@/redux/sagas';
import { IRootState } from '@/redux/types';
import { applyMiddleware, legacy_createStore as createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const store: Store<IRootState> = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

export default store;
