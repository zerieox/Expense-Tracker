import React, {useContext, useState} from "react";
import axios from "axios";

const BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:4000/api/v1/' 
  : 'https://tofinancialfreedom.onrender.com/api/v1/';

  const GlobalContext = React.createContext()
console.log(BASE_URL);
console.log(process.env.NODE_ENV)
export const GlobalProvider = ({children})=>{
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    const addIncome = async (income)=>{
        const response = await axios.post(`${BASE_URL}add-income`, income)
            
            .catch((err)=>{
                setError(err.response.data.message);
            })
        getIncome()

    }
    const getIncome = async ()=>{
        const response = await axios.get(`${BASE_URL}get-income`)
        setIncomes(response.data)
        console.log(response.data)
    }
    const deleteIncome = async(id)=>{
        const response = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncome()

    }
    const totalIncome = ()=>{
        let total = 0;
        incomes.forEach((income)=>{
            total = total+income.amount;
        })
        return total;
    }

    const addExpense = async (income)=>{
        const response = await axios.post(`${BASE_URL}add-expense`, income)
            
            .catch((err)=>{
                setError(err.response.data.message);
            })
        getExpense()

    }
    const getExpense = async ()=>{
        const response = await axios.get(`${BASE_URL}get-expense`)
        setExpenses(response.data)
        console.log(response.data)
    }
    const deleteExpense = async(id)=>{
        const response = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpense()

    }
    const totalExpense = ()=>{
        let total = 0;
        expenses.forEach((expense)=>{
            total = total+expense.amount;
        })

        return total;
    }
    const totalBalance = ()=>{
        return totalIncome() - totalExpense();
    }
    const transactionHistory= ()=>{
        const history =[...incomes, ...expenses];
        history.sort((a,b)=>{
            return new Date(b.date) - new Date(a.date);
        })
        return history.slice(0,3);
    }
    return(
        <GlobalContext.Provider value={{
            addIncome,
            getIncome,
            incomes,
            deleteIncome,
            totalIncome,
            addExpense,
            getExpense,
            deleteExpense,
            totalExpense,
            expenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = ()=>{
    return useContext(GlobalContext)
}