
import styles from './Hello.module.css';

const Hello = ({name, email}) => {
    return (
        <div className={styles.container}>
                <div className={styles.profile}>
                    <p className={styles.welcome}>{name}</p>
                    <p className={styles.useremail}>{email}</p>
                </div>
            </div>
    )
    }

export default Hello;

