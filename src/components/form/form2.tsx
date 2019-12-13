import React, { useState } from "react";
import { IFieldProps } from './field';
import { IErrors} from '../../lib/validators';
import { IValues} from '../../lib/values';

export interface IFormContext extends IFormState {
  /* Function that allows values in the values state to be set */
  setValues: (values: IValues) => void;

  /* Function that validates a field */
  validate: (fieldName: string) => void;
}
/*
 * The context which allows state and functions to be shared with Field.
 * Note that we need to pass createContext a default value which is why undefined is unioned in the type
 */
export const FormContext = React.createContext<IFormContext | undefined>(
  undefined
);

export interface IFields {
  [key: string]: IFieldProps;
}
interface IFormProps {
  /* The http path that the form will be posted to */
  action: string;

  /* The props for all the fields on the form */
  fields: IFields;

  /* A prop which allows content to be injected */
  render: () => React.ReactNode;

  /* A function used when the form is submitted */
  submitFunction: (values: IValues) => Promise<any>;
}

export interface IFormState {
  /* The field values */
  values: IValues;

  /* The field validation error messages */
  fieldValidationErrors: IErrors;

  /* Whether the form has been successfully submitted */
  submitSuccess?: boolean;

  formSubmissionErrors: IErrors ;

  formSubmissionStatus: string;
}

const Form2 = (props: IFormProps) => {

  const [state, setState] = useState({
    values:[] as IValues[],
    fieldValidationErrors:[] as IErrors[],
    submitSuccess:false,
    formSubmissionErrors:[] as IErrors[],
    formSubmissionStatus:""
  })


const setValues = (incomingValues: IValues) => {

  const myvals = {...incomingValues, ...state.values};

// this.setState({ values: { ...this.state.values, ...values } });
  const currentValues = state.values;
  const newValues = Object.assign(...currentValues, ...values);

  setState(
    { values: { ...state.values, ...incomingValues } }
  );

  //
};

const validate = () => {};
  /**
   * Handles form submission
   * @param {React.FormEvent<HTMLFormElement>} e - The form event
   */
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
/*
    console.log(this.state.values);

    if (this.validateForm()) {
      try {
        this.setLoading("loading...");
        const submitSuccess: boolean = await this.submitForm(this.state.values);
        console.log(`handleSubmit ${submitSuccess}`);
        this.setState({ submitSuccess });
        this.setLoading("");
      } catch (err) {
        console.log(`handleSubmit err ${JSON.stringify(err)}`);
        const submitSuccess: boolean = false;
        this.setState({ submitSuccess });
        this.setLoading("");
      }
    }
    */
  };
  /**
   * Returns whether there are any errors in the errors object that is passed in
   * @param {IErrors} errors - The field errors
   */
  const haveErrors(errors: IErrors): boolean => {
    let haveError: boolean = false;

    if(!errors) return false;

    Object.keys(errors).map((key: string) => {
      if (errors[key] && errors[key].length > 0) {
        haveError = true;
        console.log(`errors returned = ${JSON.stringify(errors)}`);
      }
    });
    return haveError;
  }

  /**
 * Returns error in the errors object that is passed in
 * @param {IErrors} errors - The field errors
 * @returns {String} errorMessage array
 */
const getErrors(errors: IErrors):string => {
  let errorMessage: string = "";

  if(!errors) return errorMessage;

  Object.values(errors).map((value: string) => {
    if (value.length > 0) {
      errorMessage += `${value}`;
    }
  });
  return errorMessage;
}

  /**
   * Reset form submission state
   */
  const resetFormSubmissionState =()=>{
    const formSubmissionErrors: IErrors  = {};
    setState({ formSubmissionErrors });
  }


  const setLoading=(text: string)=>{
    const formSubmissionStatus = text;
    setState({ formSubmissionStatus });
  }

  console.log(`state = ${JSON.stringify(state)}`);
  const { submitSuccess, fieldValidationErrors,  formSubmissionErrors} = state;
  const context: IFormContext = {
    ...state,
    setValues: setValues,
    validate: validate
  };


  return (
<FormContext.Provider value={context}>
        <form onSubmit={handleSubmit} noValidate={true}>
          <div className="container">
            {props.render()}

            <div className="form-group">
              {!state.formSubmissionStatus && <button
                type="submit"
                className="btn btn-primary"
                disabled={haveErrors(fieldValidationErrors)}
              >
                Submit
            </button>}
            { state.formSubmissionStatus &&
              <div>{state.formSubmissionStatus}</div>}
            </div>
            {submitSuccess && (
              <div className="alert alert-info" role="alert">
                The form was successfully submitted!
            </div>
            )}
            {submitSuccess === false &&
              haveErrors(state.formSubmissionErrors) && (
                <div className="alert alert-danger formSubmissionErrors" role="alert">
                  {getErrors(state.formSubmissionErrors)}
                </div>
              )}
            {submitSuccess === false &&
              haveErrors(state.fieldValidationErrors) && (
                <div className="alert alert-danger fieldValidationErrors" role="alert">
                  {getErrors(state.fieldValidationErrors)}
              </div>
              )}
          </div>
        </form>
        <hr></hr>
      </FormContext.Provider>
  )
}
