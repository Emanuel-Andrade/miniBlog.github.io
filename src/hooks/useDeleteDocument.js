import { useState, useReducer } from "react";
import db from '../firebase/config'
import { doc, deleteDoc  } from "firebase/firestore";

const initialState={
    loading: null,
    error: null
}

const deleteReducer = (state, action) =>{

    switch(action.type){
        case "LOADING":
            return { loading:true, error: false }
        case "DELETED_DOC":
            return { loading:false, error: false }
        case "ERROR":
            return { loading:false, error: action.payload }
        default:
            return state
    }

}

export const useDeleteDocument = (docCollection) =>{

    const [ response, dispatch] = useReducer(deleteReducer,initialState)

    const [cancelled, setCancelled] =useState(false)

    const checkIfIsCancelledBeforeDispatch =(action)=>{
        if(cancelled) return;
        dispatch(action)
    }

    const deleteDocument = async id =>{
         checkIfIsCancelledBeforeDispatch({type:"LOADING"})

        try {
           
            const deletedDocument = await deleteDoc(doc(db,docCollection,id))

            checkIfIsCancelledBeforeDispatch({
                type:"DELETED_DOC", 
                payload:deletedDocument
            })
        } catch (error) {
            checkIfIsCancelledBeforeDispatch({type:"ERROR", payload:error.message})
        }


    }

    

return{
    deleteDocument, response
}

}

