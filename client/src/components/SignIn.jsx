import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const SignIn = (props) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    error: null,
  })

  const { email, password, error } = data

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setData({ ...data, error: null })
      const res = await axios.post(
        '/auth/signin',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      localStorage.setItem('token', res.data.token)
      props.history.push('/')
    } catch (error) {
      setData({ ...setData, error: error.response.data.error })
    }
  }

  return (
    <div>
      <h4>sign in to your account</h4>
      <div>
        <form>
          <div>
            <label htmlFor='email'>email</label>
            <input
              type='email'
              name='email'
              value={email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='password'>password</label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={handleChange}
            />
          </div>
          {error ? <p>{error}</p> : null}
          <div>
            <button onClick={handleSubmit}>sign in</button>
          </div>
          <p>
            not a user? <Link to='/signup'>sign up</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignIn
