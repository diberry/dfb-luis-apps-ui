export interface IValues {
    /* Key value pairs for all the field values with key being the field name */
    [key: string]: any;
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
): string =>
  values[fieldName] === undefined ||
    values[fieldName] === null ||
    values[fieldName] === "" ||
    values[fieldName].length !== length
    ? `This must be populated with 32 char GUID, expected length = ${length}, received length=${values[fieldName].length}`
    : "";