import * as React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { ILuisAppsDataTable } from "../lib/luis_apps";

interface IProps {
  tableData: ILuisAppsDataTable
}
/*

    <div 
    key={props.app.id} style={tableRowStyles}>
    <div>{props.app.name}</div>
    <div>{props.app.activeVersion}</div>
    <div>{props.app.createdDateTime}</div>
  </div>

*/
const AppInfo: React.FC<IProps> = (props: IProps) => (

<ReactTable
      data={props.tableData.apps}
      columns={props.tableData.columns}
    />



);

export default AppInfo;