import * as React from "react";

import { IFormContext, FormContext } from "./form";
import { IValues, IErrors } from "../../lib/validators";
import { placeholder } from "@babel/types";

/* The available editors for the field */
type Editor = "textbox" | "multilinetextbox" | "dropdown";

export interface IValidation {
    rule: (values: IValues, fieldName: string, args: any) => string;
    args?: any;
}

export interface IFieldProps {
    /* The unique field name */
    id: string;

    /* The label text for the field */
    label?: string;

    /* The editor for the field */
    editor?: Editor;

    /* The drop down items for the field */
    options?: string[];

    /* The field value */
    value?: any;

    /* The field validator function and argument */
    validation?: IValidation;

    placeHolder?: string;
}

export const Field: React.FC<IFieldProps> = ({
    id,
    label,
    placeHolder,
    editor,
    options,
    value
}) => {

    /**
     * Gets the validation error for the field
     * @param {IErrors} errors - All the errors from the form
     * @returns {string[]} - The validation error
     */
    const getError = (errors: IErrors): string => (errors ? errors[id] : "");

    /**
     * Gets the inline styles for editor
     * @param {IErrors} errors - All the errors from the form
     * @returns {any} - The style object
     */
    const getEditorStyle = (errors: IErrors): any =>
        getError(errors) ? { borderColor: "red" } : {};

    return (
        <FormContext.Consumer>
            {(context: IFormContext | any) => (



                <div className="form-group">
                    {label && <label htmlFor={id}>{label}</label>}

                    {editor!.toLowerCase() === "textbox" && (
                        <input
                            id={id}
                            type="text"
                            value={value}
                            style={getEditorStyle(context.errors)} 
                            placeholder={placeHolder}
                            onChange={
                                (e: React.FormEvent<HTMLInputElement>) =>
                                    context.setValues({ [id]: e.currentTarget.value })
                            }
                            onBlur={() => context.validate(id)}
                            className="form-control"
                        />
                    )}

                    {editor!.toLowerCase() === "multilinetextbox" && (
                        <textarea
                            id={id}
                            value={value}
                            style={getEditorStyle(context.errors)} 
                            onChange={
                                (e: React.FormEvent<HTMLTextAreaElement>) =>
                                    context.setValues({ [id]: e.currentTarget.value })
                            }
                            onBlur={() => context.validate(id)}
                            className="form-control"
                        />
                    )}

                    {editor!.toLowerCase() === "dropdown" && (
                        <select
                            id={id}
                            name={id}
                            value={value}
                            style={getEditorStyle(context.errors)} 
                            onChange={
                                (e: React.FormEvent<HTMLSelectElement>) =>
                                    context.setValues({ [id]: e.currentTarget.value })
                            }
                            onBlur={() => context.validate(id)}
                            className="form-control"
                        >
                            {options &&
                                options.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                        </select>
                    )}

                    {getError(context.errors) && (
                        <div style={{ color: "red", fontSize: "80%" }}>
                            <p>{getError(context.errors)}</p>
                        </div>
                    )}
                </div>


            )}
        </FormContext.Consumer>
    );
};
Field.defaultProps = {
    editor: "textbox"
};