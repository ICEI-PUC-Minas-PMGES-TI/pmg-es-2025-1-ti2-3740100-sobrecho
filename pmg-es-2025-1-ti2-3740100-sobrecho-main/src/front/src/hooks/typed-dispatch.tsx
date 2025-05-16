import { useDispatch } from 'react-redux';

import store from '@/redux';

type AppDispatchType = typeof store.dispatch;

export const useTypedDispatch: () => AppDispatchType = useDispatch;
