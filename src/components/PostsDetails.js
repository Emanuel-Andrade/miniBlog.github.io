import style from './PostsDetails.module.css'

import {Link} from 'react-router-dom'

const PostsDetails = ({post}) => {
  
  return (
    <div className={style.post_detail} >
        <img src={post.image} alt={post.title} />
        <h3> {post.title} </h3>
        <p className={style.createdBy} > {post.createdBy} </p>
        <div className={style.tags} >
            { post.tags.map(tag =>{
               return  <p key={tag} > <span>#</span>{tag}</p>
            })}
        </div>
        <Link to={`posts/${post.id}`} className='btn btn-outline' > Ler </Link>
    </div>
  )
}

export default PostsDetails