import React, { useState } from 'react';
import './App.css';
import Apps from './components/apps/apps';
import { ILuisAppsDataTable, LuisAppDataTable, ILuisDataTableAppColumn } from "./lib/luis_apps";
import { ILuisApp, IFeatureFlags } from 'dfb-luis-apps-lib';
import { IValues } from './lib/values';

const App: React.FC = () => {

  const test = true;

  const [tableData, setTableData] = useState({
    apps: [] as ILuisApp[],
    columns: [] as ILuisDataTableAppColumn[],
    onClickRow: undefined
  });

  const appFlags: IValues = {
    test: true,
    loadData: true
  }

  const getTableData = async (values: IValues): Promise<any> => {

    // initialize
      setTableData({
        apps: [] as ILuisApp[],
        columns: [] as ILuisDataTableAppColumn[],
        onClickRow: undefined
      });

      const features: IFeatureFlags = {
        versions: true,
        models: true
      };

      let tableData: ILuisAppsDataTable = {
        apps: [],
        columns: [],
        onClickRow: undefined
      };

      if (!test){
        tableData = await LuisAppDataTable.getAppDataTable(values, features);
      } else {
        tableData = require('./tableData.json');
        tableData.onClickRow =  LuisAppDataTable.rowLevelNavigation
      }

      console.log(JSON.stringify(tableData));

      setTableData(tableData);
  }

  return (
    <div className="App">
      <header className="App-header">

        <Apps
          tableData={tableData}
          onSubmit={getTableData}
        />


      </header>

    </div>
  );
}

export default App;
