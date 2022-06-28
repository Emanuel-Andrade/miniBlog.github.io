import style from './PostsDetails.module.css'

const PostsDetails = ({post}) => {
  
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
        </div>
    </div>
  )
}

export default PostsDetails