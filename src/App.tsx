  import React, { useState, useEffect } from 'react';
  //import logo from './logo.svg';
  import './App.css';

  import Header from './components/header';
  //import Description from './components/description';
  import Apps from './components/apps';
  //import Constants from './components/constants';
  import { ILuisAppsDataTable, LuisAppDataTable, ILuisDataTableAppColumn  } from "./lib/luis_apps";
  import { LuisApps, ILuisApp, IFeatureFlags } from 'dfb-luis-apps-lib';
import { IValues } from './lib/validators';

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

    //initialize state
    const increase = 4;
    const [count, setCount] = useState(increase);
    const [user, setUser] = useState("world");
    const [secondsLeft, setSecondsLeft] = useState(10);

    const [tableData, setTableData]= useState({apps: [] as ILuisApp[], columns: [] as ILuisDataTableAppColumn[]});

    /*const add = (currentCount: number, bump: number): void => {
      setCount(currentCount + bump);
    };*/

    const getTableData = async (values: IValues):Promise<any> => {
      setTableData({apps: [] as ILuisApp[], columns: [] as ILuisDataTableAppColumn[]});

      const features: IFeatureFlags = {
        versions: true,
        models: true,
      };

      const tableData:ILuisAppsDataTable  = await LuisAppDataTable.getDataTable(values, features);
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
            tableData = {tableData}
            onSubmit = {getTableData}
          />

          
        </header>
        
      </div>
    );
  }

  export default App;
