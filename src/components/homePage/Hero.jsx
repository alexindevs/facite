import styles from './Hero.module.css';
import heroImg from '../../images/heroImg.jpg'
import Button from '../reusable/Button'
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className={styles.hero}>
            <div className={styles.left}>
                <h1 className={styles.title}>Boost Productivity with Facite!</h1>
                <p>Take control of your to-do list and achieve your goals. Effortlessly prioritize, track, and complete your tasks.</p>
                <Link to="/signin">
                    <Button importance="primary" text="Get Started"/>
                </Link>
                <Button importance="secondary" text="See more"/>
            </div>
            <div className={styles.right}>
                <img src={heroImg} alt="" className={styles.heroImg} />
            </div>
        </div>
    )
}

export default Hero;