
import styles from './header.module.css';
import NavLink from '../navlink/NavLink';
import { AiFillGithub } from 'react-icons/ai';
import { BsInstagram } from 'react-icons/bs'
import Link from 'next/link';
import Image from 'next/image';
import { BiMenuAltLeft } from 'react-icons/bi';



const Header = () => {


    return (

        <>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <div className={styles.header}>

                <div className={styles.div_menu}>
                    <BiMenuAltLeft size={40} className={styles.iconMenu} />
                </div>

                <div className={styles.div_icons}>
                    <Link href="https://linktr.ee/samue.pinheiro.senai564" className={styles.link}><AiFillGithub size={30} className={styles.icons} /></Link>
                    <Link href="https://linktr.ee/samuel.pinheiro24;" className={styles.link}><BsInstagram size={25} className={styles.iconInsta} /></Link>
                </div>
                <div className={styles.div_text}>
                    <div className={styles.links}>
                        <NavLink rota={'/'} texto={'Exemplo'} />
                        <NavLink rota={'/teste'} texto={'Exemplo'} />

                    </div>
                    <div className={styles.div_img}>
                        <Image src="/aaaa.jpeg" alt="Logo" width={100} height={50} className={styles.logo} />
                    </div>
                    <div className={styles.links1}>
                        <NavLink rota={'/'} texto={'Exemplo'} />

                        <NavLink rota={'/cascata'} texto={'Exemplo'} />

                    </div>
                </div>

            </div>

            <div className={styles.div_menu2}>
                <section className={styles.div_links}>
                    <NavLink rota={'/'} texto={'Exemplo'} />
                    <NavLink rota={'/teste'} texto={'Exemplo'} />
                    <NavLink rota={'/'} texto={'Exemplo'} />
                    <NavLink rota={'/teste'} texto={'Exemplo'} />
                    <NavLink rota={'/'} texto={'Exemplo'} />
                    <NavLink rota={'/teste'} texto={'Exemplo'} />
                </section>
            </div>
        </>


    )
}
export default Header
