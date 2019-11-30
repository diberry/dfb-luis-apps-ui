import React, { useState } from 'react';
import './App.css';
import Apps from './components/apps/apps';
import { ILuisAppsDataTable, LuisAppDataTable, ILuisDataTableAppColumn } from "./lib/luis_apps";
import { ILuisApp, IFeatureFlags } from 'dfb-luis-apps-lib';
import { IValues } from './lib/validators';

const App: React.FC = () => {

  const [tableData, setTableData] = useState({ apps: [] as ILuisApp[], columns: [] as ILuisDataTableAppColumn[] });
  const getTableData = async (values: IValues): Promise<any> => {
    setTableData({ apps: [] as ILuisApp[], columns: [] as ILuisDataTableAppColumn[] });

    const features: IFeatureFlags = {
      versions: true,
      models: true,
    };

    const tableData: ILuisAppsDataTable = await LuisAppDataTable.getDataTable(values, features);
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
