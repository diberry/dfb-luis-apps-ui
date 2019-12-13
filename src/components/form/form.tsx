import * as React from "react";
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

export class Form extends React.Component<IFormProps, IFormState> {
  constructor(props: IFormProps) {
    super(props);

    const formSubmissionErrors: IErrors  = {};
    const fieldValidationErrors: IErrors  = {};
    const values: IValues = {};
    const formSubmissionStatus: string ="";

    this.state = {
      fieldValidationErrors,
      values,
      formSubmissionErrors,
      formSubmissionStatus
    };
  }

  /**
   * Stores new field values in state
   * @param {IValues} values - The new field values
   */
  private setValues = (values: IValues) => {
    this.setState({ values: { ...this.state.values, ...values } });
  };

  /**
   * Returns whether there are any errors in the errors object that is passed in
   * @param {IErrors} errors - The field errors
   */
  private haveErrors(errors: IErrors) {
    let haveError: boolean = false;
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
  private getErrors(errors: IErrors) {
    let errorMessage: string = "";

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
  private resetFormSubmissionState(){
    const formSubmissionErrors: IErrors  = {};
    this.setState({ formSubmissionErrors });
  }


  private setLoading(text: string){
    const formSubmissionStatus = text;
    this.setState({ formSubmissionStatus });
  }
  /**
   * Handles form submission
   * @param {React.FormEvent<HTMLFormElement>} e - The form event
   */
  private handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

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
  };

  /**
   * Executes the validation rules for all the fields on the form and sets the error state
   * @returns {boolean} - Returns true if the form is valid
   */
  private validateForm(): boolean {
    const fieldValidationErrors: IErrors = {};
    Object.keys(this.props.fields).map((fieldName: string) => {
      fieldValidationErrors[fieldName] = this.validate(fieldName);
    });
    this.setState({ fieldValidationErrors });
    return !this.haveErrors(fieldValidationErrors);
  }

  /**
 * Executes the validation rule for the field and updates the form errors
 * @param {string} fieldName - The field to validate
 * @returns {string} - The error message
 */
  private validate = (fieldName: string): string => {
    let newError: string = "";

    if (
      this.props.fields[fieldName] &&
      this.props.fields[fieldName].validation
    ) {
      newError = this.props.fields[fieldName].validation!.rule(
        this.state.values,
        fieldName,
        this.props.fields[fieldName].validation!.args
      );

      // if resetting key or endpoint, reset formsubmission error too
      const { submitSuccess, fieldValidationErrors,  formSubmissionErrors} = this.state;
      if((fieldName === 'key' || fieldName ==='endpoint')
        && this.haveErrors(this.state.formSubmissionErrors)){
        this.resetFormSubmissionState();
      }

      console.log(`validate 1 newError = ${JSON.stringify(newError)}`);
    }
    this.state.fieldValidationErrors[fieldName] = newError;
    this.setState({
      fieldValidationErrors: { ...this.state.fieldValidationErrors, [fieldName]: newError }
    });
    console.log(`validate 2 newError = ${JSON.stringify(newError)}`);
    return newError;
  };

  /**
   * Submits the form
   * @returns {boolean} - Whether the form submission was successful or not
   */
  private async submitForm(values: IValues): Promise<boolean> {
    try {
      const result = await this.props.submitFunction(values);
      console.log(`submitForm result ${JSON.stringify(result)}`);
      return result;
    } catch (ex) {
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      let errorMessage = ex.message;
      //let errorMessageParsed = JSON.parse(errorMessage);

      this.setState({
        formSubmissionErrors: { ...this.state.formSubmissionErrors, ["HTTPResponse"]: errorMessage }
      });
      console.log(`submitForm error ${JSON.stringify(ex)}`);
      throw ex;
    }
  }

  public render() {
    console.log(`state = ${JSON.stringify(this.state)}`);
    const { submitSuccess, fieldValidationErrors,  formSubmissionErrors} = this.state;
    const context: IFormContext = {
      ...this.state,
      setValues: this.setValues,
      validate: this.validate
    };
    return (
      <FormContext.Provider value={context}>
        <form onSubmit={this.handleSubmit} noValidate={true}>
          <div className="container">
            {this.props.render()}

            <div className="form-group">
              {!this.state.formSubmissionStatus && <button
                type="submit"
                className="btn btn-primary"
                disabled={this.haveErrors(fieldValidationErrors)}
              >
                Submit
            </button>}
            { this.state.formSubmissionStatus &&
              <div>{this.state.formSubmissionStatus}</div>}
            </div>
            {submitSuccess && (
              <div className="alert alert-info" role="alert">
                The form was successfully submitted!
            </div>
            )}
            {submitSuccess === false &&
              this.haveErrors(this.state.formSubmissionErrors) && (
                <div className="alert alert-danger formSubmissionErrors" role="alert">
                  {this.getErrors(this.state.formSubmissionErrors)}
                </div>
              )}
            {submitSuccess === false &&
              this.haveErrors(this.state.fieldValidationErrors) && (
                <div className="alert alert-danger fieldValidationErrors" role="alert">
                  {this.getErrors(this.state.fieldValidationErrors)}
              </div>
              )}
          </div>
        </form>
        <hr></hr>
      </FormContext.Provider>
    );
  }
}