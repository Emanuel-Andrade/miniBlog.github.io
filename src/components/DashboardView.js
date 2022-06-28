import style from './PostsDetails.module.css'
import { Link } from 'react-router-dom'
import { useDeleteDocument } from '../hooks/useDeleteDocument'


const DashboardView = ({post}) => {
  const {deleteDocument} = useDeleteDocument("Posts")



  return (
    <div className={style.post_detail} >
        <h3> {post.title} </h3>
        <img src={post.image} alt={post.title} />
        <p className={style.createdBy} > {post.createdBy} </p>
        <p className={ style.body }> {post.body} </p>
        <div className={style.tags} >
            { post.tags && post.tags.map(tag =>{
               return  <p key={tag} > <span>#</span>{tag}</p>
            })}
        </div >
            <div className={style.buttons} >
              <Link to={'/posts/'+post.id} className='btn btn-outline' > Ver  </Link>
              <Link to={'/posts/edit/'+post.id} className='btn btn-outline' > Editar  </Link>
              <button onClick={()=> deleteDocument(post.id)} className='btn btn-outline btn-danger' >Excluir  </button>
            </div>
           
    </div>
  )
}

export default DashboardView