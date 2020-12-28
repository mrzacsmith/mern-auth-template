import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const SignUp = (props) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    error: null,
  })

  const { name, email, password, error } = data

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setData({ ...data, error: null })
      await axios.post(
        '/auth/signup',
        { name, email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      props.history.push('/signin')
    } catch (error) {
      setData({ ...data, error: error.response.data.error })
    }
  }

  return (
    <div className=''>
      <h4 className=''>create an account</h4>
      <div className=''>
        <form>
          <div>
            <label htmlFor='name'>name</label>
            <input
              type='text'
              name='name'
              value={name}
              onChange={handleChange}
            />
          </div>
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
            <button onClick={handleSubmit}>sign up</button>
          </div>
          <p>
            Already a user? <Link to='/signin'>sign in</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignUp
