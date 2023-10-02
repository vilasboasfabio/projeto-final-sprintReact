'use client';
import Header from '@/app/components/header/Header'
import Footer from '@/app/components/footer/Footer'
import styles from './page.module.css'
import { useState } from 'react'
import Clouthing from '../models/Clouthing'
import ClouthingList from '../models/ListClouthing'
import Mensage from './components/error/Mensage';
import ClothingCard from './components/clouthingCard/ClouthingCard';

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
      
      // Atualizar despesas com novo valor
      setExpenses(prevExpenses => prevExpenses + expenseValue);
    } else {
      // Adicionar um novo item
      if (isAnyInputEmpty() || verifyValue() || !verifyImgUrl()) {
        return;
      } else {

        //mostra mensagem de sucesso, falando qual peça foi adicionada e por quanto
        setMessageData({ type: 'success', text: `${clouth.vestuary} adicionada por R$ ${clouth.price}` });
        setList(prevList => [...prevList, clouth]);
        clouthList.add(clouth);
        setTimeout(() => {
          // Limpar mensagem de sucesso
          setMessageData({ type: '', text: '' });
        }, 3000);
      }
  
      // Atualizar despesas
      setExpenses(prevExpenses => prevExpenses + expenseValue);
    }
  
    // Adicionar transação de despesa
    setTransactions(prevTransactions => [...prevTransactions, { type: 'Despesa', value: expenseValue }]);
  
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
    //remover a despesa respectiva gerada pela peça excluida
    const removedItem = list[index];
    const expenseValue = removedItem.price * 0.8;
    setExpenses(prevExpenses => prevExpenses - expenseValue);
  }

  const editClouth = (index) => {
    // Preencher os campos com os dados do item
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
    
    // Atualizar lucro
    setProfit(prevProfit => prevProfit + parseFloat(soldItem.price));
    
    // Adicionar transação de lucro
    setTransactions(prevTransactions => [...prevTransactions, { type: 'Entrada', value: parseFloat(soldItem.price) }]);
  
    // Tornar o card transparente por 4 segundos
    setTransparentIndices(prev => new Set([...prev, index]));

    //mostra mensagem mostrando o nome da peça que foi vendida e por quanto
    setMessageData({ type: 'success', text: `${soldItem.vestuary} vendida por R$ ${soldItem.price}` });
   
    // Remover o card depois de 4 segundos
    setTimeout(() => {
      setTransparentIndices(prev => {
        prev.delete(index);
        return new Set([...prev]);
      });
      setList(prevList => prevList.filter((_item, i) => i !== index));
    clouthList.remove(index);
    }, 4000); // 4 segundos
    setTimeout(() => {
      // Limpar mensagem de sucesso
      setMessageData({ type: '', text: '' });
    }, 4000);
  
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

  
  function verifyImgUrl() {
    if (image.includes('https') || (image.includes('.jpg') || image.includes('.png') || image.includes('.jpeg'))) {
      return true;
    }else{
      setMessageData({ type: 'error', text: 'URL inválida' });
      console.log('URL inválida');
      setTimeout(() => {

        setMessageData({ type: '', text: '' });
      }, 3000);
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
                <ClothingCard
                  key={index}
                  index={index}
                  item={item}
                  removeClouth={removeClouth}
                  editClouth={editClouth}
                  sellClouth={sellClouth}
                  isTransparent={transparentIndices.has(index)}
                />
              )
            ))
          }

        </article>
      </main>
      )}
        {visibleSection === 'fluxo' && (
        <main className={styles.flow}>
          <article className={styles.expensesCard}>
            <h2>Despesas Totais: </h2>
            <p>R$ {expenses.toFixed(2)}</p>
          </article>
          <article className={styles.profitsCard}>
            <h2>Receitas Totais: </h2>
            <p>R$ {profit.toFixed(2)}</p>
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

