'use client';

import { RedocStandalone } from 'redoc';

export default function SwaggerDocsPage() {
	return (
		<RedocStandalone
			specUrl="/swagger/swagger.yaml"
			options={{
				nativeScrollbars: true,
				theme: { colors: { primary: { main: '#4F46E5' } } } // azul do Tailwind
			}}
		/>
	);
}
