import * as React from "react";
import { Form, IFields} from "./form";
import { Field } from "./field";
import { requiredValidator,  isGuid32CharValidator } from '../lib/validators';
import { IValues, IErrors } from '../lib/validators';

interface IProps {
  submit: (values: IValues) => Promise<any>;
}

export const FormLuisAuth: React.FC<IProps> = (props: IProps) => {
    
    const fields: IFields = {
        endpoint: {
          id: "endpoint",
          label: "LUIS Endpoint",
          validation: { rule: requiredValidator }
        },
        key: {
          id: "key",
          label: "LUIS key",
          validation: { rule: isGuid32CharValidator, args:32}
        }
      };

  return (
    <Form
      action="http://localhost:4351/api/contactus"
      submitFunction = {props.submit}
      fields= {fields}
      render={() => (
        <>
          <div className="alert alert-info" role="alert">
            Enter the LUIS authentication information.
          </div>
          <Field {...fields.endpoint} />
          <Field {...fields.key} />
          </>
      )}
      
    />
  );
};