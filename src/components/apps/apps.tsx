import * as React from 'react';
import AppInfo from './dataTable';
import { ILuisAppsDataTable } from "../../lib/luis_apps";
import { FormLuisAuth } from './form';
import { IValues } from '../../lib/values';

interface IProps {
  tableData: ILuisAppsDataTable;
  onSubmit: (values: IValues) => Promise<any>;
}
const Apps: React.FC<IProps> = (props: IProps) => {

  return (
    <div className="container">
      <FormLuisAuth
        submit={props.onSubmit}
      />
      <AppInfo tableData={props.tableData} />

    </div>
  )

};

export default Apps;