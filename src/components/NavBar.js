import React from 'react'
import { NavLink } from 'react-router-dom'

import { useAuthentication } from '../hooks/useAuthentication'
import { useAuthContext } from '../contexts/AuthContext'
import style from './NavBar.module.css'
const NavBar =()=>{

    const{ user} = useAuthContext()
    const {logOut} = useAuthentication() 
    return(
        <div className={style.navbar} >
            <NavLink className={style.brand} to='/' > Mini<span>Blog</span> </NavLink>
            <ul className={style.link_list} > 
                <li><NavLink className={ ({isActive}) => isActive ? style.active :'' } to='/'> Home </NavLink></li>
                { !user && <li><NavLink className={ ({isActive}) => isActive ? style.active :'' } to='/login'> Entrar </NavLink></li> }
                { !user && <li><NavLink className={ ({isActive}) => isActive ? style.active :'' } to='/register'> Cadastro </NavLink></li> }
                { user && <li><NavLink className={ ({isActive}) => isActive ? style.active :'' } to='/posts/create'> Novo Post </NavLink></li> }
                { user && <li><NavLink className={ ({isActive}) => isActive ? style.active :'' } to='/dashboard'> Dashboard </NavLink></li> }
                <li><NavLink className={ ({isActive}) => isActive ? style.active :'' } to='/about'> Sobre </NavLink></li>
                { user && <li> <button onClick={logOut} > Sair </button> </li> }
            </ul>
        </div>
    )

}

export default NavBar