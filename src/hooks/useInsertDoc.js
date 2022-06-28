    import { useState, useReducer } from "react";
import db from '../firebase/config'
import { collection, addDoc,Timestamp  } from "firebase/firestore";

const initialState={
    loading: null,
    error: null
}

const insertReducer = (state, action) =>{

    switch(action.type){
        case "LOADING":
            return { loading:true, error: false }
        case "INSERTED_DOC":
            return { loading:false, error: false }
        case "ERROR":
            return { loading:false, error: action.payload }
        default:
            return state
    }

}

export const useInsertDoc = (docCollection) =>{

    const [ response, dispatch] = useReducer(insertReducer,initialState)

    const [cancelled, setCancelled] =useState(false)

    const checkIfIsCancelledBeforeDispatch =(action)=>{
        if(cancelled) return;
        dispatch(action)
    }

    const insertDocument = async document =>{
         checkIfIsCancelledBeforeDispatch({type:"LOADING"})

        try {
           
            const newDocument ={ ...document, createdAt:Timestamp.now() }
           
            const insertedDocument = await addDoc(
                collection(db,docCollection),
                newDocument
            )

            checkIfIsCancelledBeforeDispatch({
                type:"INSERTED_DOC", 
                payload:insertedDocument
            })
        } catch (error) {
            checkIfIsCancelledBeforeDispatch({type:"ERROR", payload:error.message})
        }


    }

    

return{
    insertDocument, response
}

}

