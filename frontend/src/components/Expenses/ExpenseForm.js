import React, {useState} from 'react'
import styled from 'styled-components'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/icons';
function ExpenseForm() {
    const {addExpense, error, setError} = useGlobalContext()
    const [expenseState, setExpenseState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    })
    const {title,amount,date,category,description}  = expenseState;

    const handleInput = name => e =>{
        setExpenseState({...expenseState, [name]: e.target.value})
        setError('')

    }
    const handleSubmit = e =>{
        e.preventDefault()
        addExpense(expenseState)
        setExpenseState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
        })
    }
    return (
        <ExpenseFormStyled onSubmit={handleSubmit}>
                {error && <p className='error'>
                    {error}
                </p>}
            <div className='input-control'>
                <input 
                    type="text"
                    value = {title}
                    name = {"title"}
                    placeholder = "Expense Title"
                    onChange = {handleInput('title')}
                />
            </div>
            <div className='input-control'>
                <input 
                    type="text"
                    value = {amount}
                    name = {"amount"}
                    placeholder = "Expense Amount"
                    onChange = {handleInput('amount')}
                />
            </div>
            <div className='input-control'>
                <DatePicker 
                    id="date" 
                    placeholderText='Enter a Date'
                    selected = {date}
                    dateFormat={'dd/MM/yyyy'}
                    onChange={(date)=>{
                        setExpenseState({...expenseState, date: date});
                    }}
                />
            </div>
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                     <option value="" disabled >Select Option</option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="clothing">Clothing</option>  
                    <option value="travelling">Travelling</option>  
                    <option value="other">Other</option>  
                </select>
            </div>
            <div className="input-control">
                <textarea name="description" value={description} placeholder='Add A Description' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
            </div>
            <div className='submit-btn'>
                    <Button
                         name={'Add Expense'}
                         icon={plus}
                         bPadding={'.8rem 1.6rem'}
                         bRadius={'30px'}
                         bg={'var(--color-accent'}
                         color={'#fff'}
                         onClick = {handleSubmit}
                    />
            </div>
        </ExpenseFormStyled>
    )
}
const ExpenseFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        width: 100%; //container fill parent
        input, .react-datepicker-wrapper, .react-datepicker__input-container, .react-datepicker__input-container input {
            width: 100%; //input fill container
        }
    }
    .selects{
        display: flex;
        justify-content: flex-end;
        select{
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }
    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
        }
    }
`
export default ExpenseForm