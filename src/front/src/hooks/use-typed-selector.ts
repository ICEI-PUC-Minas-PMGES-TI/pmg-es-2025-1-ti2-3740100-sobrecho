import { useSelector, TypedUseSelectorHook } from 'react-redux';

import { state } from '@/redux';

export const useTypedSelector: TypedUseSelectorHook<state> = useSelector;
