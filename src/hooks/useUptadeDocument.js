import { useState, useReducer } from "react";
import db from '../firebase/config'
import { doc, updateDoc  } from "firebase/firestore";

const initialState={
    loading: null,
    error: null
}

const updateReducer = (state, action) =>{

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

    const [ response, dispatch] = useReducer(updateReducer, initialState)

    const [cancelled, setCancelled] =useState(false)

    const checkIfIsCancelledBeforeDispatch =(action)=>{
        if(cancelled) return;
        dispatch(action)
    }

    const updateDocument = async (uid, data) =>{
         checkIfIsCancelledBeforeDispatch({type:"LOADING"})

        try {
           
            const docRef = await doc(db, docCollection,uid)

            const updatedDoc = updateDoc(docRef,data)

            checkIfIsCancelledBeforeDispatch({
                type:"UPDATED_DOC", 
                payload: updatedDoc
            })
        } catch (error) {
            checkIfIsCancelledBeforeDispatch({type:"ERROR", payload:error.message})
        }


    }

    

return{
    updateDocument, response
}

}

