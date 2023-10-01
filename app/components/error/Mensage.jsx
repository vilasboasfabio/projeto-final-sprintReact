
import styles from './mensage.module.css'


const Mensage = ({ type, text }) => {
    return (
        <>
            <div className={styles[type]}>
                <p>{text}</p>
            </div>
        </>
    )
}

export default Mensage