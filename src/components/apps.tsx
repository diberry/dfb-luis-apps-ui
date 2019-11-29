import * as React from 'react';
import AppInfo from './appInfo';
import { ILuisAppsDataTable } from "../lib/luis_apps";
import { FormLuisAuth } from './form_luis_auth';
import { Form, IFields } from "./form/form";
import { requiredValidator, isGuid32CharValidator } from '../lib/validators';
import { Field } from "./form/field";
import { IValues, IErrors } from '../lib/validators';

interface IProps {
  tableData: ILuisAppsDataTable;
  onSubmit: (values: IValues) => Promise<any>;
}
const fields: IFields = {
  endpoint: {
    id: "endpoint",
    label: "LUIS Endpoint",
    validation: { rule: requiredValidator }
  },
  key: {
    id: "key",
    label: "LUIS key",
    validation: { rule: isGuid32CharValidator, args: 32 }
  }
};

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