import React, {useState} from 'react'
import {Typography, withStyles, Button} from '@material-ui/core'
import axios from 'axios'

export const Login = (props) => {
	const [creds, setCreds] = useState({username: "", password: ""})

	const handleChange = e => {
		const target = e.target.id
		console.log(target)
		const value = e.target.value
		const object = {}
		object[`${target}`]= value
		const copy = {...creds, ...object}
		setCreds(copy)
	}

	const handleLogin = () => {
		axios
		.post('https://csbuildtwo.herokuapp.com/api/token/', creds)
			.then(res => {
				console.log(res.data.access)
				window.localStorage.setItem('JWT', `${res.data.access}`)
				window.localStorage.setItem('Token', `${res.data.backtoken}`)
				props.handleLogin()
			})
			.catch(err => {
				console.log(err)
			})
	}

	return (
		<div className="container">
			<Typography className="title" variant="h2">
				Login
			</Typography>
			<div className="formCont">
				<div className="username">
					<label className="label" htmlFor="username">Username: </label>
					<input id="username" className="input" type="text" onChange={handleChange} />
				</div>
				<div className="password">
					<label className="label" htmlFor="password">Password: </label>
					<input id="password" className="input" type="password" onChange={handleChange} />
				</div>
				<Button onClick={handleLogin}>Login</Button>
			</div>
		</div>
	)
}


