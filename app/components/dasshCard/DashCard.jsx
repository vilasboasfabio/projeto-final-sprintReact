import styles from './DashCrad.module.css';

//componentizar os banners do dashcard

const DashCard = ({ title, value, color }) => {
    return (
        <div className={styles.cardSaldo} style={{ backgroundColor: color }}>
            <p className={styles.cardTitle}>{title}</p>
            <p className={styles.cardValue}>€ {value}</p>
        </div>
    )
}

export default DashCard;