import styles from './Button.module.css'

const Button = (props) => {

    if (props.importance === 'primary') {
        return (
            <button className={`${styles.button} ${styles.primary}`}>{props.text}</button>
        )
    } else {
        return (
            <button className={`${styles.button} ${styles.secondary}`}>{props.text}</button>
        )
    }
}

export default Button;