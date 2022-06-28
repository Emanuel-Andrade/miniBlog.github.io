import style from './Search.module.css'

// Hooks
import { useFetchDocument } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'
import { Link , useNavigate} from 'react-router-dom'
import { useState } from 'react'
// Components
import PostsDetails from '../../components/PostsDetails'


const Search = () => {
  const query =useQuery()
  const [SearchTag, setSearchTag] = useState('')
  const search = query.get('q')
  const navigate =useNavigate()
  const { document:posts, loading} = useFetchDocument('Posts',search)
  
  const handleSubmit =(e)=>{
    e.preventDefault()
  
      if(SearchTag) return navigate('/search?q='+SearchTag)
      setSearchTag('')
  
    }



  return (
    <div>
        <h1> Search </h1>
        <h3> Publicações mais recentes </h3>
      <form onSubmit={handleSubmit} className={style.searchForm} >
        <input 
        type="text" 
        name="SearchTag" 
        onChange={e =>setSearchTag(e.target.value)}
        value={SearchTag}
        placeholder='Busque por tag' 
        required   />
        <button className='btn btn-dark' > Procurar </button>
      </form>

        <div>
          {loading && <p> Carregando </p>}
          {posts && posts.map( post => <h3> <PostsDetails key={post.id} post={post} /> </h3> )}
          {posts && posts.length === 0 &&
          <>
            <p> Ainda não há publicações aqui </p>
            <Link to='/' className='btn btn-outline' > Voltar </Link>
          </>
          }
      </div>
    </div>
  )
}

export default Search