import style from './Dashboard.module.css'

import { Link } from 'react-router-dom'

import {useAuthContext} from '../../contexts/AuthContext'
import { useFetchDocument } from '../../hooks/useFetchDocuments'

import DashboardView from '../../components/DashboardView'

const Dashboard = () => {
  const {user} = useAuthContext()
  const {uid} =user
  const {document: posts, loading} = useFetchDocument("Posts",null,uid)


  return (
    <div>
      <h2 className={style.title} > Olá, <span> {user.displayName} </span> </h2>
      <p className={style.subtitle} > Gerencie seus posts aqui </p>
      {posts && posts.length === 0 && <div> 
          <p> Ainda não há postagens suas  </p>
          <Link to={'/posts/create'} className='btn' > Criar post </Link>
        </div> }
      { posts &&
        <div >
                  {loading && <p> Carregando </p>}
        {posts && posts.map( post => <h3> <DashboardView key={post.id} post={post} /> </h3> )}
        </div>

      }
    </div>
  )
}

export default Dashboard