

import styles from './footer.module.css';



 const Footer = () =>{
    return (
        <div className={styles.footer}>
            <section className={styles.texts}>
                <div className={styles.text}>
                    <h3>Lorem</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum natus, recusandae odio voluptas, dolores officiis neque maiores quidem, at placeat debitis! Veniam natus, dolorem quisquam repudiandae reiciendis enim qui voluptate!</p>
                </div>
                <div className={styles.text}>
                <h3>Lorem</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum natus, recusandae odio voluptas, dolores officiis neque maiores quidem, at placeat debitis! Veniam natus, dolorem quisquam repudiandae reiciendis enim qui voluptate!</p>
                </div>
                <div className={styles.text}>
                <h3>Lorem</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum natus, recusandae odio voluptas, dolores officiis neque maiores quidem, at placeat debitis! Veniam natus, dolorem quisquam repudiandae reiciendis enim qui voluptate!</p>
                </div>

            </section>
            <hr className={styles.hr}/>

            <section className={styles.copyrights}>
                <h3>Elite Coders</h3>

                <p>© 2023 - Todos os direitos reservados</p>
             
            </section>
        </div>
    )
}

export default Footer;

