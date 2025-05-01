import { Provider } from 'react-redux';

import store from '@/redux';

interface IReduxProviderProps {
	children: React.ReactNode;
}

export function ReduxProvider({ children }: IReduxProviderProps) {
	return <Provider store={store}>{children}</Provider>;
}
