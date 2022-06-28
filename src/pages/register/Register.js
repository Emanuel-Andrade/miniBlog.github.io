import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'


const Register = () => {

  const [ name,setName ] =useState('')
  const [ email,setEmail ] =useState('')
  const [ password,setPassword ] =useState('')
  const [ passwordConfirm,setPasswordConfirm ] =useState('')
  const [ error,setError ] =useState(false)

  const { createUser, loading, error: authError  } = useAuthentication()

  const handleSubmit = async (e)=>{
    e.preventDefault()

    setError(false)
    if(password !== passwordConfirm)  return setError('As senhas precisam ser iguais');
    const user = {
      name,
      email,
      password
    }

    const res = await createUser(user)

    setName('')
    setEmail('')
    setPassword('')
    setPasswordConfirm('')


  }
  useEffect(
    ()=> {
      if(authError) setError(authError)
    }
  ,[authError])


  return (
    <div>
      <h1>Cadastre-se</h1>
      <p> Comece a compartilhar sua história </p>
      <form onSubmit={handleSubmit} >
        {error && <p className='error'> {error} </p> }
        <label >
          <span> Nome: </span>
          <input type="text" 
                name="name" 
                placeholder='João Silva' 
                required 
                value={name}
                onChange={e=> setName(e.target.value) } />
        </label>
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
        <label >
          <span> confirme a senha: </span>
          <input type="password" 
                name="passwordConfirm"
                autoComplete='on' 
                placeholder='********' 
                required 
                value={ passwordConfirm }
                onChange={e=> setPasswordConfirm(e.target.value) }/>
        </label>
        { !loading && <button className='btn btn-dark'> Cadastrar </button> }
        { loading && <button className='btn ' disabled> Cadastrando </button> }
      </form>
    </div>
  )
}

export default Register