'use client';

import { Provider } from 'react-redux';

import { store } from '@/redux';

export function ReduxProvider({ children }: React.PropsWithChildren) {
	return <Provider store={store}>{children}</Provider>;
}
