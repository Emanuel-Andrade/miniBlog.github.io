import './Posts.module.css'

import { useParams, Link } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import PostDetails from '../../components/PostDetails'

const Posts = () => {
  const {id} = useParams()
  const { document: post, loading } = useFetchDocument('Posts',id)
  return (
    <div>
        <div >
        {loading && <p> Carregando </p>}
        {post && <h3> <PostDetails key={post.uid} post={post} /> </h3> }
      </div>
    </div>
  )
}

export default Posts