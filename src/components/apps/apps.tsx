import React, { useState } from 'react';
import AppInfo from './appInfo/appInfo';
import AppInfoVersions from './appInfoVersions/appInfoVersions';
import DataTableLuis from './appsDataTable';
import { ILuisAppsDataTable } from "../../lib/luis_apps";
import { FormLuisAuth } from './form';
import { IValues, IDataTable } from '../../lib/values';

import { ILuisApp, ILuisAppVersion } from 'dfb-luis-apps-lib';


interface IProps {
  tableData: ILuisAppsDataTable;
  onSubmit: (values: IValues) => Promise<any>;
}

const Apps: React.FC<IProps> = (props: IProps) => {

  const [selectedData, setSelectedData] = useState({
    appSelected: {} as ILuisApp
  })

  const setSelectedApp = (appId: string) => {

    console.log(`appId = ${appId}`);

    const appSelected = Object.assign(props.tableData.apps.filter(x => x.id === appId)[0]);

    setSelectedData({appSelected});
  }

  return (
    <div className="container">
      <FormLuisAuth
        submit={props.onSubmit}
      />

      <DataTableLuis
        tableData={props.tableData}
        selectedAppFn={setSelectedApp} />

      <AppInfo app={selectedData.appSelected} />
      <AppInfoVersions versions={selectedData.appSelected.versions} />
    </div>
  )

};

export default Apps;