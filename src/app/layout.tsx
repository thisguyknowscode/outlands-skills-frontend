'use client'

import styled from '@emotion/styled'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const StyledBody = styled.body`
		padding: 2rem;
		margin: 0;
		background-color: #999;
		font-family: roboto;
		font-size: 16px;
	`

	return (
		<html lang="en">
			<StyledBody>
				{children}
			</StyledBody>
		</html>
	)
}
