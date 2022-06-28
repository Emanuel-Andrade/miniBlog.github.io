import { useState, useEffect } from "react";
import db from '../firebase/config'
import { doc,getDoc } from "firebase/firestore";

export const useFetchDocument = (docColletion,id ) => {

    const [document, setDocument] = useState([])
    const [loading, setLoading] = useState('')
    const [error, setError] = useState('')
    const [cancelled, setCancelled] = useState(false)


    useEffect( ()=>{

        async function loadDocument(){            
            if(cancelled) return
            setLoading(true)

            try {
                const docRef = await doc(db,docColletion,id)
                const snapDoc = await getDoc(docRef)

                setDocument(snapDoc.data())
                setLoading(false)
            } catch (error) {
                console.log(error)
                setError(error.message)
                setLoading(false)
            }

        }
        loadDocument()
    },[docColletion, id, cancelled])

    useEffect(()=>{
        return ()=> setCancelled(true)
    },[])
    useEffect(()=>{
        return ()=> setCancelled(false)
    },[docColletion,id,cancelled])
    return { document, loading,error}
}