import * as React from 'react';
import AppInfo from './appInfo';
import { ILuisAppsDataTable } from "../lib/luis_apps";
import { FormLuisAuth } from './form_luis_auth';
import { IFields } from "./form/form";
import { requiredValidator, isGuid32CharValidator } from '../lib/validators';
import { IValues} from '../lib/validators';

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
      <div>{props.tableData.apps.length} rows found</div>
      {(props.tableData.apps.length > 0) && <AppInfo tableData={props.tableData} />}
    </div>
  )

};

export default Apps;