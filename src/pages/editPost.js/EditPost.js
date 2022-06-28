import { useState, useEffect  } from 'react'
import { useNavigate, useParams  } from 'react-router-dom'
import { useInsertDoc } from '../../hooks/useInsertDoc'
import { useAuthContext } from '../../contexts/AuthContext'
import {useFetchDocument} from '../../hooks/useFetchDocument'
import style from './EditPost.module.css'




const EditPost= () => {
  const {id} = useParams()
  const {document:post} =  useFetchDocument('Posts', id)
  console.log(post.title)
  const [ title, setTitle] = useState(post.title)
  const [ image , setImage] = useState("")
  const [ body , setBody] = useState("Não há descrição para este post")
  const [ tags , setTags] = useState('Não há tags para este post')
  const [ error , setError] = useState("")
  const { insertDocument, response } = useInsertDoc('Posts')
  const {user} = useAuthContext()
  const Navigate = useNavigate()

    useEffect( ()=>{
      setTitle(post.title)
      setImage(post.image)
      setBody(post.body)
      if(!post.body) setBody("Não há descrição neste post")
      setTags(post.tags)
    },[id, post])
  
  const useHandleSubmit = (e) =>{

    setTitle(post.title)
  }

  return (
    <div>
     { post && 
     <>
     
     <h1> Edit seu post </h1>
      <form onSubmit={useHandleSubmit}>
      {response.error && <p className='error'> {response.error} </p> }
      {error && <p className='error'> {error} </p> }
        <label >
          <span> Título </span>
          <input 
          type="text" 
          name='title' 
          required 
          placeholder='Escreva seu titulo' 
          onChange={e =>setTitle(e.target.value)} 
          value={title}/>
        </label>

        <label >
          <span> URL da imagem </span>
          <input 
          type="text" 
          name='image' 
          required 
          placeholder='Coloque a url da sua imagem' 
          onChange={e =>setImage(e.target.value)} 
          value={image}/>
        </label>

        <img src={post.image} alt={post.title} className={style.image_preview} />

        <label >
          <span> Descrição </span>
          <textarea 
          type='text-area' 
          name='body'  
          placeholder='Descreva seu post (opcional)' 
          onChange={e =>setBody(e.target.value)} 
          value={body}>
            </textarea>
        </label>

        <label >
          <span> Tags </span>
          <input 
          type='text' 
          name='tags'  
          placeholder='Coloque as tags separadas por vírgulas (opcional)' 
          onChange={e =>setTags(e.target.value)} 
          value={tags}/>
        </label>

        { !response.loading && <button className='btn btn-outline'> Editar </button> }
        { response.loading && <button className='btn ' disabled> Editando </button> }

      </form>

     
     
     </>
    }
    </div>
  )
}

export default EditPost