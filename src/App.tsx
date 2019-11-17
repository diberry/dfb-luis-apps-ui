  import React, { useState, useEffect } from 'react';
  import logo from './logo.svg';
  import './App.css';

  import Header from './components/header';
  import Description from './components/description';
  import Apps from './components/apps';
  import Constants from './components/constants';
  import { ILuisAppsDataTable, LuisAppDataTable, ILuisDataTableAppColumn  } from "./lib/luis_apps";
  import { LuisApps, ILuisApp } from 'dfb-luis-apps-lib';

  const App: React.FC = () => {

    const emptyAppArr : ILuisApp[] = [];

    //initialize state
    const increase = 4;
    const [count, setCount] = useState(increase);
    const [user, setUser] = useState("world");
    const [secondsLeft, setSecondsLeft] = useState(10);

    const [tableData, setTableData]= useState({apps: [] as ILuisApp[], columns: [] as ILuisDataTableAppColumn[]});

    const add = (currentCount: number, bump: number): void => {
      setCount(currentCount + bump);
    };

    const getTableData = async () => {
      const tableData:ILuisAppsDataTable  = await LuisAppDataTable.luisApps();
      setTableData(tableData);
    } 

    // look
    useEffect(() => {

      if(secondsLeft<=0) return;

      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft -1);
      },1000)

      // clean side effect when no longer needed
      return () => {
        clearTimeout(timerId);
      }
    });

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Header name={user} />
            Edit <code>src/App.tsx</code> and save to reload.
          
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
          test
          </a>
          <Apps 
            onClick = {getTableData}
            tableData = {tableData}
          />
          <Description
            buttonStatusColor={Constants.colors.candidate}
            count={count}
            incrementBy={increase} 
            onClick={add} />
          <div className="timer">Time Remaining: {secondsLeft}</div>
        </header>
        
      </div>
    );
  }

  export default App;
