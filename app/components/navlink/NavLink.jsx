import Link from "next/link";

import styles from "./NavLink.module.css";

const NavLink = ({rota, texto}) => {
    return (
        <div className={styles.somelink}>
      <Link href={rota} className={styles.text}>{texto}</Link>
        </div>
    );
    }

export default NavLink;