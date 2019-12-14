import React, { useState } from "react";
import { IFieldProps } from './field';
import { IErrors} from '../../lib/validators';
import { IValues} from '../../lib/values';


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
  /* The object of many field value properties */
  values: IValues;

  /* The field validation error messages */
  fieldValidationErrors: IErrors;

  /* Whether the form has been successfully submitted */
  submitSuccess?: boolean;

  formSubmissionErrors: IErrors ;

  formSubmissionStatus: string;
}
export interface IFormContext extends IFormState {
  /* Function that allows values in the values state to be set */
  setValues: (values: IValues) => void;

  /* Function that validates a field */
  validate: (fieldName: string) => void;
}
export const Form = (props: IFormProps) => {

  const [state, setState] = useState({
    values:{} as IValues,
    fieldValidationErrors:{} as IErrors,
    submitSuccess:false,
    formSubmissionErrors:{} as IErrors,
    formSubmissionStatus:""
  })


const setValues = (incomingValues: IValues) => {



  setState((current) => ( {...current, values: { ...state.values, ...incomingValues }  }));

}
  /**
   * Reset form submission state
   */
  const resetFormSubmissionState =()=>{
    setState((current) => ( {...current, formSubmissionErrors: {}  }));
  }


  const setLoading=(text: string)=>{
    setState((current) => ( {...current, formSubmissionStatus: text  }));
  }

  /**
 * Executes the validation rule for the field and updates the form errors
 * @param {string} fieldName - The field to validate
 * @returns {string} - The error message
 */
const validate = (fieldName: string): string => {
  let newError: string = "";

  if (
    props.fields[fieldName] &&
    props.fields[fieldName].validation
  ) {
    newError = props.fields[fieldName].validation!.rule(
      state.values,
      fieldName,
      props.fields[fieldName].validation!.args
    );

    // if resetting key or endpoint, reset formsubmission error too
    const { submitSuccess, fieldValidationErrors,  formSubmissionErrors} = state;
    if((fieldName === 'key' || fieldName ==='endpoint')
      && haveErrors(state.formSubmissionErrors)){
      resetFormSubmissionState();
    }

    console.log(`validate 1 newError = ${JSON.stringify(newError)}`);
  }
  state.fieldValidationErrors[fieldName] = newError;

  setState((current) => ( {...current, fieldValidationErrors: { ...state.fieldValidationErrors, [fieldName]: newError }  }));

  console.log(`validate 2 newError = ${JSON.stringify(newError)}`);
  return newError;
}

  /**
   * Executes the validation rules for all the fields on the form and sets the error state
   * @returns {boolean} - Returns true if the form is valid
   */
  const validateForm =(): boolean => {
    const fieldValidationErrors: IErrors = {};
    Object.keys(props.fields).map((fieldName: string) => {
      fieldValidationErrors[fieldName] = validate(fieldName);
    });

    setState((current) => ( {...current, fieldValidationErrors  }));

    return !haveErrors(fieldValidationErrors);
  }

  /**
   * Submits the form
   * @returns {boolean} - Whether the form submission was successful or not
   */
  const submitForm = async (values: IValues): Promise<boolean> => {
    try {
      const result = await props.submitFunction(values);
      console.log(`submitForm result ${JSON.stringify(result)}`);
      return result;
    } catch (ex) {
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      let errorMessage = ex.message;
      //let errorMessageParsed = JSON.parse(errorMessage);
      setState((current) => ( {...current, formSubmissionErrors: { ...state.formSubmissionErrors, ["HTTPResponse"]: errorMessage }  }));
      console.log(`submitForm error ${JSON.stringify(ex)}`);
      throw ex;
    }
  }


  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    console.log(state.values);

    if (validateForm()) {
      try {
        setLoading("loading...");
        const submitSuccess: boolean = await submitForm(state.values);
        console.log(`handleSubmit ${submitSuccess}`);
        setState((current) => ( {...current, submitSuccess  }));
        setLoading("");
      } catch (err) {
        console.log(`handleSubmit err ${JSON.stringify(err)}`);
        const submitSuccess: boolean = false;
        setState((current) => ( {...current, submitSuccess  }));
        setLoading("");
      }
    }

  }

  /**
   * Returns whether there are any errors in the errors object that is passed in
   * @param {IErrors} errors - The field errors
   */
  const haveErrors = (errors: IErrors): boolean => {
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
const getErrors = (errors: IErrors):string => {
  let errorMessage: string = "";

  if(!errors) return errorMessage;

  Object.values(errors).map((value: string) => {
    if (value.length > 0) {
      errorMessage += `${value}`;
    }
  });
  return errorMessage;
}



  console.log(`state = ${JSON.stringify(state)}`);
  const { submitSuccess, fieldValidationErrors,  formSubmissionErrors, formSubmissionStatus, values} = state;

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
        {JSON.stringify(state.values)}
      </FormContext.Provider>
  )
}
