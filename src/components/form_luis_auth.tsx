import * as React from "react";
import { Form, IFields, required, isEmail, maxLength, guid32char } from "./form";
import { Field } from "./field";
 
export const FormLuisAuth: React.SFC = () => {
    
    const fields: IFields = {
        endpoint: {
          id: "endpoint",
          label: "LUIS Endpoint",
          validation: { rule: required }
        },
        key: {
          id: "key",
          label: "LUIS key",
          validation: { rule: guid32char, args:32}
        }
      };

  return (
    <Form
      action="http://localhost:4351/api/contactus"
      submitFunction = {(e:any) => console.log(e)}
      fields= {fields}
      render={() => (
        <React.Fragment>
          <div className="alert alert-info" role="alert">
            Enter the LUIS authentication information.
          </div>
          <Field {...fields.endpoint} />
          <Field {...fields.key} />
        </React.Fragment>
      )}
    />
  );
};