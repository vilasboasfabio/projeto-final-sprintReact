"use client"
import { useState } from 'react'
import styles from './page.module.css'
import TransactionsList from '@/models/TransactionsList'
import Transaction from '@/models/Transaction'

import DashCard from '../components/dasshCard/DashCard'
import Button from '../components/button/Button'
import TransactionList from '../components/TransactionsList/TransactionList'
import Input from '../components/Input/Input'
import Hello from '../components/Hello/Hello'



const listTransaction = new TransactionsList();

function Finances() {
    // Inputs
    const [value, setValue] = useState('')
    const [description, setDescription] = useState('')

    //Dados da classe 
    const [list, setList] = useState(listTransaction.historic)
    const [balance, setBalance] = useState(listTransaction.balance)
    const [expense, setExpense] = useState(listTransaction.expenses)
    const [recept, setRecept] = useState(listTransaction.recepts)

    // Edição
    const [flag, setFlag] = useState(0)
    const [editButton, setEditButton] = useState(false)

    const addrecept = () => {

        listTransaction.add(value, description, "recept");

        setValues()

    }
    // console.log("Recept ajouté")
    console.log(listTransaction.historic)


    const addexpense = () => {

        listTransaction.add(value, description, "expense");


        setValues()

    }

    const deleteTransaction = (id) => {

        listTransaction.remove(id)
        setValues()
    }

    function setValues() {

        setDescription('')
        setValue('')

        setBalance(listTransaction.balance)
        setExpense(listTransaction.expenses)
        setRecept(listTransaction.recepts)
        setList(listTransaction.historic)
    }

    const edit = (id) => {

        setEditButton(true)
        setFlag(id)

        const item = listTransaction.historic.find(item => item.id == id)

        setDescription(item.description)
        setValue(item.value)
    }

    const update = () => {
        listTransaction.update(flag, description, value)
        setValues()
        setEditButton(false)
    }



    return (
        <>

          <div>
                <Hello name="Bonjour Fábio!" email="fsimoesvbj@gmail.com" />
          </div>


            <div className={styles.content}>
                <div className={styles.mainheader}>
                    <p className={styles.title}>Tableaux Bancaire</p>
                    <div className={styles.transaction}>
                        <div className={styles.description}>
                            <Input className={styles.inputdescription} valor={description} tipo="text" nome='description' texto='Description' on={(e) => setDescription(e.target.value)} />
                           <Input className={styles.inputvalue} valor={value} tipo="number" nome='value' texto='Value' on={(e) => setValue(e.target.value)} />
                        </div>
                        <div className={styles.type}>
                            {
                                editButton ? (
                                    <Button text="Atualizer" onClick={update} color="#9fc7e0" />
                                ) : (
                                    <>
                                        <Button text="Revenus" onClick={addrecept} color="#9fe09f" />
                                        <Button text="Fais" onClick={addexpense} color="#e09f9f" />
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.cards}>
                    <DashCard title="Solde" value={balance} color="#9fc7e0" />
                    <DashCard title="Revenus" value={recept} color="#9fe09f" />
                    <DashCard title="Fais" value={expense} color="#e09f9f" />
                </div>


                <div className={styles.registros}>
                    <div className={styles.registrosreceitas}>
                        <p className={styles.registrosreceitastitle}>Revenus Registrès</p>

                        <div className={styles.registrosreceitas}>
                            {<div className={styles.registrosreceitaslist}>
                                {list.filter(item => item.type === "recept").map((item, index) => (
                                    <TransactionList key={index} list={[item]} deleteTransaction={deleteTransaction} edit={edit} color={item.color} />
                                ))}
                            </div>}
                        </div>
                    </div>

                    <div className={styles.registrosdespesas}>
                        <p className={styles.registrosdespesastitle}>Fais Registrès</p>
                        <div className={styles.registrosdespesas}>
                            {<div className={styles.registrosdespesaslist}>
                                {list.filter(item => item.type === "expense").map((item, index) => (
                                    <TransactionList key={index} list={[item]} deleteTransaction={deleteTransaction} edit={edit} color={item.color} />
                                ))}
                            </div>}
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Finances