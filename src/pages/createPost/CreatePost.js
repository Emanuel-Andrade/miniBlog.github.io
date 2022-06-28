import { useState  } from 'react'
import { useNavigate  } from 'react-router-dom'
import style from './CreatePost.module.css'
import { useInsertDoc } from '../../hooks/useInsertDoc'
import { useAuthContext } from '../../contexts/AuthContext'
const CreatePost = () => {
  const [ title, setTitle] = useState("")
  const [ image , setImage] = useState("")
  const [ body , setBody] = useState("")
  const [ tags , setTags] = useState('')
  const [ error , setError] = useState("")
  const { insertDocument, response } = useInsertDoc('Posts')
  const {user} = useAuthContext()
  const Navigate = useNavigate()

  
  const handleSubmit = (e) =>{
    e.preventDefault()
    
    try {
      new URL(image)
    } catch (error) {
      return setError('A imagem precisa ser em URL')
    }

    if(!title || !Image) return setError('Campos Título e Imagem não podem ficar vazios')

    let tagsArray =[]
    if(tags) tagsArray = tags.split(',').map( tag => tag.trim().toLowerCase())
    
    const newPost = {
      tags:tagsArray,
      title,
      body,
      image,
      uid: user.uid,
      createdBy: user.displayName
    }
    insertDocument(newPost)
    Navigate('/')
  }

  return (
    <div>
      <h1> Criar post </h1>
      <p> Crie seu novo post com um momento ou memória. </p>
      <form onSubmit={handleSubmit}>
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

        { !response.loading && <button className='btn btn-outline'> Criar </button> }
        { response.loading && <button className='btn ' disabled> Criando </button> }

      </form>

    </div>
  )
}

export default CreatePost