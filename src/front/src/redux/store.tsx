import { reducers, sagas, state } from '@/redux';
import { applyMiddleware, legacy_createStore as createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const store: Store<state> = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

export default store;
