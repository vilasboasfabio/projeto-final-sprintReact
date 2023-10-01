'use client';
import Header from '@/app/components/header/Header'
import Footer from '@/app/components/footer/Footer'
import styles from './page.module.css'
import { useState } from 'react'
import Clouthing from '../models/Clouthing'
import ClouthingList from '../models/ListClouthing'
import Mensage from './components/error/Mensage';

export default function Home() {
  const [vestuary, setVestuary] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState('');
  const [color, setColor] = useState('');
  const [list, setList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [transparentIndices, setTransparentIndices] = useState(new Set());
  const [visibleSection, setVisibleSection] = useState('acervo'); // 'acervo' ou 'fluxo'
  const [expenses, setExpenses] = useState(0);
  const [profit, setProfit] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [messageData, setMessageData] = useState({ type: '', text: '' });


  const clouthList = new ClouthingList();

  const addOrEditClouth = () => {
    const clouth = new Clouthing(vestuary, size, price, brand, image, color);
    const expenseValue = price * 0.8; // 80% do preço registrado, representando o custo
  
    if (editingIndex !== false) {
      // Estamos editando um item
      const newList = [...list];
      // Subtrair o custo do item antigo das despesas
      const oldExpenseValue = newList[editingIndex].price * 0.8;
      setExpenses(prevExpenses => prevExpenses - oldExpenseValue);
  
      newList[editingIndex] = clouth;
      setList(newList);
      setEditingIndex(false);
      setIsEditing(false);  // Sair do modo de edição
    } else {
      // Adicionar um novo item
      if (isAnyInputEmpty() || verifyValue()) {
        return;
      }else{
        setMessageData({ type: 'success', text: 'Peça adicionada com sucesso' });
      setList(prevList => [...prevList, clouth]);
      clouthList.add(clouth);
      setTimeout(() => {
        // Limpar mensagem de sucesso
        setMessageData({ type: '', text: '' });
      }, 3000);
    }
  }
  
    // Atualizar despesas
    setExpenses(prevExpenses => prevExpenses + expenseValue);
  
    // Adicionar transação de despesa
    setTransactions(prevTransactions => [...prevTransactions, { type: 'Despesa', value: expenseValue }]);
  
    console.log(list);
    console.log(clouthList);

    // ... código para limpar campos
    setVestuary('');
    setSize('');
    setPrice('');
    setBrand('');
    setImage('');
    setColor('');


  };

  const removeClouth = (index) => {
    setList(prevList => prevList.filter((_item, i) => i !== index));
    clouthList.remove(index);
    console.log(list);
    console.log(clouthList);
  }

  const editClouth = (index) => {
    setIsEditing(true);
    setEditingIndex(index);

    const clouth = list[index];
    setVestuary(clouth.vestuary);
    setSize(clouth.size);
    setPrice(clouth.price);
    setBrand(clouth.brand);
    setImage(clouth.image);
    setColor(clouth.color);
  };

  //deixar o card com transparencia quando clicar no botão de vender, depois de 6 segundos ele some

  const sellClouth = (index) => {
    const soldItem = list[index];
  
    // Remover item da lista
    setList(prevList => prevList.filter((_item, i) => i !== index));
    clouthList.remove(index);
  
    // Atualizar lucro
    setProfit(prevProfit => prevProfit + parseFloat(soldItem.price));
  
    // Adicionar transação de lucro
    setTransactions(prevTransactions => [...prevTransactions, { type: 'Entrada', value: parseFloat(soldItem.price) }]);
    setTimeout(() => {
      setTransparentIndices(prev => {
        prev.delete(index);
        return new Set([...prev]);
      });
      removeClouth(index);
    }, 6000); // 6 segundos
  };

  function isAnyInputEmpty() {
   if (vestuary === '' || size === '' || price === '' || brand === '' || image === '' || color === '') {
    setMessageData({ type: 'error', text: 'Preencha todos os campos' });
    console.log('Preencha todos os campos');
    setTimeout(() => {
      // Limpar mensagem de erro
      setMessageData({ type: '', text: '' });
    }, 3000);

     return true;
   }else{
     return false;
   }
  }
  
  function verifyValue() {
    if (price < 0) {
      setMessageData({ type: 'error', text: 'O valor não pode ser negativo' });
      console.log('O valor não pode ser negativo');
      setTimeout(() => {
        // Limpar mensagem de erro
        setMessageData({ type: '', text: '' });
      }, 3000);
      return true;
    }else{
      return false;
    }
  }
  
  const showAcervo = () => {
    setVisibleSection('acervo');
  }

  const showFluxo = () => {
    setVisibleSection('fluxo');
  }

  return (

    < >
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <Header />
      <div className={styles.controlButtons}>
        <button  className={styles.showF} onClick={showFluxo}>Ver Fluxo de Caixa</button>
        <button  onClick={showAcervo}>Ver Acervo de Peças</button>
      </div>
      <h2 className={styles.mainTitle}>VS Closet</h2>

      {visibleSection === 'acervo' && (
      <main className={styles.content}>
        <article className={styles.vestuary_form}>

          <label htmlFor="vestuary">Vestuário</label>
          <input value={vestuary} type="text" id="vestuary" name="vestuary" placeholder="Vestuário" onChange={(event) => { setVestuary(event.target.value) }}></input>
          <label htmlFor="size">Tamanho</label>
          <input value={size} type="text" id="size" name="size" placeholder="Tamanho" onChange={(event) => { setSize(event.target.value) }}></input>
          <label htmlFor="price">Preço</label>
          <input value={price} type="number" id="price" name="price" placeholder="Preço" onChange={(event) => { setPrice(event.target.value) }}></input>
          <label htmlFor="brand">Marca</label>
          <input value={brand} type="text" id="brand" name="brand" placeholder="Marca" onChange={(event) => { setBrand(event.target.value) }}></input>
          <label htmlFor="image">Imagem</label>
          <input value={image} type="text" id="image" name="image" placeholder="Imagem" onChange={(event) => { setImage(event.target.value) }}></input>
          <label htmlFor="color">Cor</label>
          <input value={color} type="text" id="color" name="color" placeholder="Cor" onChange={(event) => { setColor(event.target.value) }}></input>




          <button type="button" onClick={addOrEditClouth}>
            {editingIndex !== false ? 'Atualizar' : 'Enviar'}
          </button>
          { messageData.text && <Mensage type={messageData.type} text={messageData.text} /> }

        </article>
        <hr className={styles.line1} />
        <article className={styles.showVestuary} >
          <h2>Acervo de Peças:</h2>
          {
            list.map((item, index) => (
              (isEditing && editingIndex === index) ? null : (
                <div key={index} className={`${styles.card} ${transparentIndices.has(index) ? styles.transparent : ''}`}>
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
              )
            ))
          }

        </article>
      </main>
      )}
        {visibleSection === 'fluxo' && (
        <main className={styles.flow}>
          <article className={styles.expensesCard}>
            <h2>Despesas Totais: R$ {expenses.toFixed(2)}</h2>
          </article>
          <article className={styles.profitsCard}>
            <h2>Receitas Totais: R$ {profit.toFixed(2)}</h2>
            <div className={styles.courent}>
            <h3>Saldo Atual: R$ {(profit - expenses).toFixed(2)}</h3>
            </div>
          </article>
          <article className={styles.transactionsCard}>
            <h2>Transações:</h2>
            <ul>
              {transactions.map((trans, index) => (
                <p key={index}>{trans.type}: R$ {trans.value.toFixed(2)}</p>
              ))}
            </ul>
          </article>
        </main>
      )}

      <Footer />

    </>
  )
}

