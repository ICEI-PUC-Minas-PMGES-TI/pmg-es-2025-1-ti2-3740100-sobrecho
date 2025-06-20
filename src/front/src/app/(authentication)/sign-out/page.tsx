'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '@/hooks';
import { AuthCreators } from '@/redux/reducers';

export default function Page() {
	const router = useRouter();
	const dispatch = useDispatch();

	const { signed } = useTypedSelector((state) => state.auth);

	useEffect(() => {
		if (!signed) {
			router.push('/sign-in');
		} else {
			dispatch(AuthCreators.authSignOut());
		}
	}, [signed, router, dispatch]);
}
