import { IValues } from './values';


  export interface IErrors {
    /* The validation error messages for each field (key is the field name */
    [key: string]: string;
  }

/**
 * Validates whether a field has a value
 * @param {IValues} values - All the field values in the form
 * @param {string} fieldName - The field to validate
 * @returns {string} - The error message
 */
export const requiredValidator = (values: IValues, fieldName: string): string =>
  values[fieldName] === undefined ||
    values[fieldName] === null ||
    values[fieldName] === ""
    ? "This must be populated"
    : "";

/**
 * Validates whether a field is a valid email
 * @param {IValues} values - All the field values in the form
 * @param {string} fieldName - The field to validate
 * @returns {string} - The error message
 */
export const isEmailValidator = (values: IValues, fieldName: string): string =>
  values[fieldName] &&
    values[fieldName].search(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
    ? "This must be in a valid email format"
    : "";

/**
 * Validates whether a field is within a certain amount of characters
 * @param {IValues} values - All the field values in the form
 * @param {string} fieldName - The field to validate
 * @param {number} length - The maximum number of characters
 * @returns {string} - The error message
 */
export const withinMaxLengthValidator = (
  values: IValues,
  fieldName: string,
  length: number
): string =>
  values[fieldName] && values[fieldName].length > length
    ? `This can not exceed ${length} characters`
    : "";

/**
 * Validates whether a field has a value
 * @param {IValues} values - All the field values in the form
 * @param {string} fieldName - The field to validate
 * @param {number} length - The maximum number of GUID characters
 * @returns {string} - The error message
 */
export const isGuid32CharValidator = (
  values: IValues,
  fieldName: string,
  length: number
): string => {
  if (values[fieldName] === undefined ||
    values[fieldName] === null ||
    values[fieldName] === "" ) return  `This must be populated`;

    if (values[fieldName].length !== length) return `This must be populated with 32 char GUID, expected length = ${length}, received length=${values[fieldName].length}`;

    return "";
}

  /**
   * Returns whether there are any errors in the errors object that is passed in
   * @param {IErrors} errors - The field errors
   */
export const haveErrors = (errors: IErrors) => {
    let haveError: boolean = false;
    Object.keys(errors).map((key: string) => {
      if (errors[key].length > 0) {
        haveError = true;
      }
    });
    return haveError;
  }