import React, {useMemo, useState} from "react";
import styled from "styled-components";
import bg from "./img/bg.png"
import { MainLayout, InnerLayout } from "./styles/Layouts";
import Orb from "./components/Orb/Orb";
import Navigation from "./components/Navigation/Navigation";
import Dashboard from "./components/Dashboard/Dashboard";
import Incomes from "./components/Incomes/Incomes";
import Expenses from "./components/Expenses/Expenses";
import { useGlobalContext } from "./context/globalContext";


function App(){
    const [activeMenu, setActiveMenu] = useState(1);
    const global = useGlobalContext()
    const orbLoc = useMemo(()=>{
        return(
            <Orb/>
        )
    },[])
    const displayData = ()=>{
        switch(activeMenu){
            case 1:
                return <Dashboard/>
            case 2:
                return <Dashboard/>
            case 3:
                return <Incomes/>
            case 4:
                return <Expenses/>
            default:
                return <Dashboard/>
        }
    }
    return(
        <AppStyled bg = {bg} className = "App">
            {orbLoc}
            <MainLayout>
                <Navigation activeMenu = {activeMenu} setActiveMenu = {setActiveMenu} />
                <main>
                    {displayData()}
                </main>
            </MainLayout>
        </AppStyled>
    )
}
const AppStyled = styled.div`
    height: 100vh;
    background-image: url(${props => props.bg});
    position: relative; 
    main{
        flex: 1;
        background: rgba(252, 246, 249, 0.78);
        border: 3px solid #FFFFFF;
        backdrop-filter: blur(4.5px);
        border-radius: 32px;
        overflow-x: hidden;
        &::-webkit-scrollbar{
        width: 0;
        }
  }
`;
export default App
