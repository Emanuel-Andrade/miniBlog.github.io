import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'

// CSS
 import style from './Login.module.css'

const Home = () => {
  const [ email,setEmail ] =useState('')
  const [ password,setPassword ] =useState('')
  const [ error,setError ] =useState(false)

  const { login,loading, error: authError  } = useAuthentication()

  const handleSubmit = async (e)=>{
    e.preventDefault()

    setError(false)
    const user = {
      email,
      password
    }
    

    login(user)
    setEmail('')
    setPassword('')
  }
  useEffect(
    ()=> {
      if(authError) setError(authError)
    }
  ,[authError])

  return (
    <div>
      <h1>Faça o login</h1>
      <p> Comece a compartilhar sua história </p>
      <form onSubmit={handleSubmit} >
        {error && <p className='error'> {error} </p> }
        <label >
          <span> Email: </span>
          <input type="email" 
                name="email" 
                placeholder='email@email.com' 
                required 
                value={email}
                onChange={e=> setEmail(e.target.value) }/>
        </label>
        <label >
          <span> Senha: </span>
          <input type="password" 
                name="password"
                autoComplete='on' 
                placeholder='*******'
                required 
                value={password}
                onChange={e=> setPassword(e.target.value) }/>
        </label>
        { !loading && <button className='btn btn-dark'> Entrar </button> }
        { loading && <button className='btn ' disabled> Logando </button> }
      </form>
    </div>
  )
}

export default Home