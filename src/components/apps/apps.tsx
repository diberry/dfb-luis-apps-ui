import React, { useState } from 'react';
import AppInfo from './appsDataTable';
import { ILuisAppsDataTable } from "../../lib/luis_apps";
import { FormLuisAuth } from './form';
import { IValues} from '../../lib/values';

import { ILuisApp, ILuisAppVersion } from 'dfb-luis-apps-lib';


interface IProps {
  tableData: ILuisAppsDataTable;
  onSubmit: (values: IValues) => Promise<any>;
}

interface ILuisAppDataTable {

}

const Apps: React.FC<IProps> = (props: IProps) => {

  const [selectedData, setSelectedData] = useState({
    appSelected: {} as ILuisApp,
    versionSelected: "" as string,
    modelSelected: "" as string
  })

  const setSelectedApp = (appId: string) =>{

    console.log(`appId = ${appId}`);

    const selectedApp = Object.assign(props.tableData.apps.filter(app => app.id === appId))[0];

    setSelectedData({
      appSelected: selectedApp,
      versionSelected: selectedData.versionSelected,
      modelSelected: selectedData.modelSelected
    });
  }

  return (
    <div className="container">
      <FormLuisAuth
        submit={props.onSubmit}
      />
      <div>App: {selectedData.appSelected.name}</div>
      <AppInfo
      tableData={props.tableData}
      selectedAppFn={setSelectedApp}/>

    </div>
  )

};

export default Apps;