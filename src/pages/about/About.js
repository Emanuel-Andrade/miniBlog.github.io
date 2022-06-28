import {Link} from 'react-router-dom'
// CSS
import style from './About.module.css'

const About = () => {
  return (
    <div className={style.about} >
        <h2> Sobre o Mini<span>Blog</span> </h2>
        <p> Este projeto é feito de React no front-end e Firebase no back-end. </p>
        <Link to='/posts/create' className='btn btn-outline' > Criar post </Link>
    </div>
  )
}

export default About