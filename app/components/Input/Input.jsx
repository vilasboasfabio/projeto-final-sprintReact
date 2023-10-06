import styles from './Input.module.css'


const Input = ({tipo,texto,nome,on,valor}) =>{

    return(
<div >

<input
                className={styles.inputdescription}
                value={valor}
                type={tipo}
                name={nome}
                placeholder={texto}
                onChange={on}
                />

</div>

    )
}
export default Input;
