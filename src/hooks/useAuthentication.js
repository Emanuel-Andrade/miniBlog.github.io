import {db} from '../firebase/config'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const useAuthentication = () =>{

    const [ error, setError ] = useState(null)
    const [ loading, setLoading ] = useState(null)

    const auth = getAuth()

    // cleanUp
    const [ cancelled, setCancelled ] =  useState(false)

    function checkIfIsCancelled(){
        if(cancelled) return
    }
    const logOut = ()=>{
        checkIfIsCancelled()

        signOut(auth)
    }

    const login = async (data)=>{
        checkIfIsCancelled()
        setLoading(true)
        setError(false)
        
        try {
            await signInWithEmailAndPassword(auth,data.email,data.password)
            setLoading(false)
            
        } catch (error) {
            if(error) setError('Houve um error, por favor tente mais tarde')
            if(error.message.includes("user-not-found")) setError('Usuário não encontrado')
            if(error.message.includes("wrong-password")) setError('Senha incorreta')
            
            setLoading(false)
        }
    }

    const createUser = async (data) =>{
        
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try {

            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user,{ displayName: data.name })

            setLoading(false)
            return user

        } catch (error) {

            console.log(error.message)
            console.log( typeof error.message)

            if(error.message) setError("Ocorreu um error, por favor tente mais tarde")
            if(error.message.includes("email-already")) setError("Email já cadastrado")
            if(error.message.includes("Password")) setError("Senha necessita conter pelo menos 6 caractres")
            setLoading(false)    
        }
        
    }
    useEffect(()=>{
        return ()=> setCancelled(true)
    }, [])
    return {
        auth,
        createUser,
        loading,
        error,
        logOut,
        login
    }
}