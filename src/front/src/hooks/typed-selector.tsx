import { useSelector, TypedUseSelectorHook } from 'react-redux';

import { IApplicationState } from '@/redux/types';

export const useTypedSelector: TypedUseSelectorHook<IApplicationState> = useSelector;
