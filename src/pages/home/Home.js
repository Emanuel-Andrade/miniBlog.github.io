import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import style from './Home.module.css'
import { useFetchDocument } from '../../hooks/useFetchDocuments'
import PostsDetails from '../../components/PostsDetails'

const Home = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const { document:posts, loading} = useFetchDocument('Posts')

  const handleSubmit =(e)=>{
    e.preventDefault()

    if(query) return navigate('/search?q='+query)

  }

  return (
    <div>
      <h3> Publicações mais recentes </h3>
      <form onSubmit={handleSubmit} className={style.searchForm} >
        <input 
        type="text" 
        name="SearchTag" 
        onChange={e =>setQuery(e.target.value)}
        value={query}
        placeholder='Busque por tag' 
        required   />
        <button className='btn btn-dark' > Procurar </button>
      </form>
      <div className={style.nopost} >
        {loading && <p> Carregando </p>}
        {posts && posts.map( post => <h3> <PostsDetails key={post.id} post={post} /> </h3> )}
        { posts && posts.length === 0 &&
          <>
            <p> Ainda não há publicações aqui </p>
            <Link to='/' > Voltar </Link>
          </>
        }
      </div>
    </div>
  )
}

export default Home