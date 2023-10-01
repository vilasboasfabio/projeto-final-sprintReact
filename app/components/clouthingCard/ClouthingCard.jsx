import styles from './ClouthingCard.module.css'


const ClothingCard = ({ item, index, removeClouth, editClouth, sellClouth, isTransparent }) => {
  return (
    <div className={`${styles.card} ${isTransparent ? styles.transparent : ''}`}>
      <h2>{item.vestuary}</h2>
      <div className={styles.buttons}>
        <button type="button" onClick={() => removeClouth(index)}>Excluir</button>
        <button type="button" onClick={() => editClouth(index)}>Editar</button>
        <button type="button" onClick={() => sellClouth(index)}>Vender</button>
      </div>
      <div className={styles.line2}>##</div>
      <p>Marca: {item.brand}</p>
      <p>Tamanho: {item.size}</p>
      <p>Cor: {item.color}</p>
      <img src={item.image} alt="imagem do produto" />
      <div className={styles.line2}>##</div>
      <p>Valor: R$ {item.price}</p>
    </div>
  );
};

export default ClothingCard;
