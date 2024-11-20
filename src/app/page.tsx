'use client'

import styled from '@emotion/styled'
import { Box, Button, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import Markdown from 'react-markdown'

const StyledPaper = styled(Paper)`
	padding: 2rem;
	margin: 2rem;
`

const StyledResponseContainer = styled(Box)`
	border: 2px solid #999;
	border-radius: 0.25rem;
	padding: 1rem;
`

export default function Home() {
	const [question, setQuestion] = useState('')
	const [answer, setAnswer] = useState('')

	const questionHandler = (ev: any) => {
		ev.preventDefault()

		setQuestion(ev.target.value)
	}

	const searchClickHandler = async () => {
		const resp = await fetch('http://localhost:8080/dev/chat', {
			method: 'POST',
			body: JSON.stringify({ query: question })
		})

		const respJson = await resp.json()

		if (respJson?.length) {
			setAnswer(respJson[0].response)
		}
	}

	const resetClickHandler = () => {
		setQuestion('')
	}

	return (
		<Box>
			<StyledPaper elevation={5}>
				<StyledResponseContainer>
					<Markdown>{answer}</Markdown>
				</StyledResponseContainer>
			</StyledPaper>
			<StyledPaper elevation={5}>
				<Box>
					<TextField
						label="Enter your question about Outlands"
						onChange={questionHandler}
						fullWidth
						value={question}
					/>
				</Box>
				<Box>
					<Button onClick={searchClickHandler}>Search</Button>
					<Button onClick={resetClickHandler}>Reset</Button>
				</Box>
			</StyledPaper>
		</Box>
	)
}