import { useState, useEffect } from "react";
import db from '../firebase/config'
import { collection, orderBy, query, onSnapshot, where, QuerySnapshot } from "firebase/firestore";

export const useFetchDocument = (docColletion, search = null, uid = null) => {

    const [document, setDocument] = useState([])
    const [loading, setLoading] = useState('')
    const [error, setError] = useState('')
    const [cancelled, setCancelled] = useState(false)


    useEffect( ()=>{

        async function loadData(){

             if(cancelled) return
    
            setLoading(true)
            const collectionRef = await collection(db,docColletion)

            try {
                let q;

                if(search) {
                    q = await query(collectionRef, where("tags", "array-contains", search ) , orderBy("createdAt", "desc"))
                } else if(uid){
                    q = await query(collectionRef, where("uid",'==', uid ) , orderBy("createdAt", "desc"))
                } else {
                    q = await query(collectionRef, orderBy("createdAt", "desc"))
                }
                await onSnapshot(q, (QuerySnapshot) =>{
                    setDocument(
                        QuerySnapshot.docs.map(doc =>({
                            id: doc.id,
                            ...doc.data()
                        }))
                        )
                    })
                    setLoading(false)
                } catch (error) {
                setError(error.message)
                setLoading(false)
            }
        }
        loadData()
    },[docColletion,search,uid, cancelled])

    useEffect(()=>{
        return ()=> setCancelled(true)
    },[])
    useEffect(()=>{
        return ()=> setCancelled(false)
    },[docColletion,search,uid,cancelled])
    return { document, loading,error}
}