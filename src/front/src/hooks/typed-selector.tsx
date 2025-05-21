import { useSelector, TypedUseSelectorHook } from 'react-redux';

import { IRootState } from '@/redux/types';

export const useTypedSelector: TypedUseSelectorHook<IRootState> = useSelector;
