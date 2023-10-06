
import styles from './Button.module.css'
//componentizar os botões

const Button = ({ text, onClick, color }) => {
    return (
        <button className={styles.button} onClick={onClick} style={{ backgroundColor: color }}>{text}</button>
    )
}

export default Button;
