import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Home = (props) => {
  const [user, setUser] = useState(null)

  const getUser = async () => {
    const res = await axios.get('/auth/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    setUser(res.data)
  }

  useEffect(() => {
    getUser()
  }, [])

  const signout = () => {
    localStorage.removeItem('token')
    props.history.push('/signin')
  }

  if (!localStorage.getItem('token')) props.history.push('/signin')

  return (
    <div>
      <p>welcome {user && user.name} </p>
      <button onClick={signout}>sign out</button>
    </div>
  )
}

export default Home
