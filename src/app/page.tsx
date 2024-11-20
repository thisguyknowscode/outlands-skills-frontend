'use client'

import styled from '@emotion/styled'
import { Box, Button, LinearProgress, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import Markdown from 'react-markdown'

const StyledPaper = styled(Paper)`
	padding: 2rem;
	margin: 2rem;
`

const StyledResponseContainer = styled(Box)`
	border: 2px solid #999;
	border-radius: 0.25rem;
	min-height: 8rem;
	padding: 0.5rem 1rem;
`

const StyledHeadline = styled.h1`
	margin: 2rem;
	margin-top: 0;
	padding: 0;
	color: white;
	text-shadow: 0 0 6px rgba(0, 0, 0, 0.75);
`

const StyledLinearProgress = styled(LinearProgress)`
	top: 3.75rem;
`

export default function Home() {
	const [question, setQuestion] = useState('')
	const [answer, setAnswer] = useState('Ask a question, get an answer.')
	const [loading, setLoading] = useState(false)

	const questionHandler = (ev: any) => {
		setQuestion(ev.target.value)
	}

	const searchClickHandler = async () => {
		setLoading(true)
		setAnswer('')

		try {
			const resp = await fetch('http://localhost:8080/dev/chat', {
				method: 'POST',
				body: JSON.stringify({ query: question })
			})

			const respJson = await resp.json()

			if (respJson?.length) {
				setAnswer(respJson[0].response)
			}
		} catch (err) {
			setAnswer('Oh no! Something went wrong. I\'m on it.')

			console.error('searchClickHandler', err)
		}

		setLoading(false)
	}

	const resetClickHandler = () => {
		setQuestion('')
		setAnswer('')
	}

	return (
		<Box>
			<StyledHeadline>Outlands Skills AI</StyledHeadline>
			<StyledPaper elevation={5}>
				<StyledResponseContainer>
					{loading ? <StyledLinearProgress /> : (<Markdown>{answer}</Markdown>)}
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