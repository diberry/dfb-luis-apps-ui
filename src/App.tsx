  import React, { useState, useEffect } from 'react';
  //import logo from './logo.svg';
  import './App.css';

  import Header from './components/header';
  //import Description from './components/description';
  import Apps from './components/apps';
  //import Constants from './components/constants';
  import { ILuisAppsDataTable, LuisAppDataTable, ILuisDataTableAppColumn  } from "./lib/luis_apps";
  import { LuisApps, ILuisApp } from 'dfb-luis-apps-lib';

/*
          <Description
            buttonStatusColor={Constants.colors.candidate}
            count={count}
            incrementBy={increase} 
            onClick={add} />
            <div className="timer"> {secondsLeft}</div>
*/

  const App: React.FC = () => {

    const emptyAppArr : ILuisApp[] = [];
    const luis_key = process.env.REACT_APP_LUIS_AUTHORING_KEY || ""; 

    //initialize state
    const increase = 4;
    const [count, setCount] = useState(increase);
    const [user, setUser] = useState("world");
    const [secondsLeft, setSecondsLeft] = useState(10);

    const [tableData, setTableData]= useState({apps: [] as ILuisApp[], columns: [] as ILuisDataTableAppColumn[]});

    /*const add = (currentCount: number, bump: number): void => {
      setCount(currentCount + bump);
    };*/

    const getTableData = async () => {
      const tableData:ILuisAppsDataTable  = await LuisAppDataTable.getDataTable(luis_key);
      setTableData(tableData);
    } 

    // look
    useEffect(() => {
/*
      if(secondsLeft<=0) return;

      onst timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft -1);
      },1000)

      
      return () => {
        clearTimeout(timerId);
      }*/
    });

    return (
      <div className="App">
        <header className="App-header">
          
          <Header name={user} />

          <Apps 
            onClick = {getTableData}
            tableData = {tableData}
            onSubmit = {getTableData}
          />

          
        </header>
        
      </div>
    );
  }

  export default App;
