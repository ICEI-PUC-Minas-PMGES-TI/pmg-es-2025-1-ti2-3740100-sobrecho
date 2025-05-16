import { auth, product } from '@/redux/reducers'; // Se estiver dando erro provavelmente tem que quebrar esse import aqui
import { combineReducers } from 'redux';

export const reducers = combineReducers({
	auth,
	product
});
