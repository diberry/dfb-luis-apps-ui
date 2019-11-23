import * as React from 'react';
import AppInfo from './appInfo';
import { ILuisAppsDataTable } from "../lib/luis_apps";
import { FormLuisAuth } from './form_luis_auth';

interface IProps {
  tableData: ILuisAppsDataTable
  onClick: () => Promise<any>;
}

const Apps: React.FC<IProps> = (props: IProps) => (
  <>
  <FormLuisAuth 
  />
  <button
      onClick={() => props.onClick()}
    > Get apps 
    </button>
    <AppInfo tableData={props.tableData}/>
  </>

);

export default Apps;