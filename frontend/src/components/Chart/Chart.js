import React from 'react'
import {Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'
import {Line} from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { dateFormat } from '../../utils/Date'

ChartJs.register(    
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
    )
    function Chart() {
        const {incomes, expenses} = useGlobalContext();
    
        //Find the unique dates from each array
        const uniqueDatesSet = new Set([
            ...incomes.map(item => dateFormat(item.date)),
            ...expenses.map(item => dateFormat(item.date)),
        ]);
        //Sort the unique dates
        const uniqueDates = Array.from(uniqueDatesSet).sort();
    
        // Create a lookup map for incomes and expenses
        const incomeLookup = incomes.reduce((acc, item) => {
            acc[dateFormat(item.date)] = item.amount;
            return acc;
        }, {});
    
        const expensesLookup = expenses.reduce((acc, item) => {
            acc[dateFormat(item.date)] = item.amount;
            return acc;
        }, {});
    
        const datasets = [
            {
                label: 'Income',
                data: uniqueDates.map(date => incomeLookup[date] || 0),
                backgroundColor: 'green',
                tension: 0.2,
            },
            {
                label: 'Expenses',
                data: uniqueDates.map(date => expensesLookup[date] || 0),
                backgroundColor: 'red',
                tension: 0.2,
            },
        ];
    
        const data = {
            labels: uniqueDates,
            datasets,
        };
    
        return (
            <ChartStyled>
                <Line data={data} />
            </ChartStyled>
        );
    }
    
export const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`
export default Chart