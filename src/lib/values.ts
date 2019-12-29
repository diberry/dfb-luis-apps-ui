export interface IValues {
    /* Key value pairs for all the field values with key being the field name */
    [key: string]: any;
}

export interface ISelectedData {
    appSelected: string,
    versionSelected: string,
    modelSelected: string
}

export interface IDataTableColumn {
    Header: string,
    accessor: string
}

export interface IDataTable {
    data: any[],
    columns: IDataTableColumn[],
    onClickRow: (selectRowId: string) => any;
}

export function getPivotColumns(): any[] {
    return [
        { Header: 'Property', accessor: 'property' },
        { Header: 'Value', accessor: 'value' }
    ];
}

export function getColumnsFromObject(obj: Object): any[] {

    let arr = [] as any[];

    for (let i of Object.keys(obj)) {
        arr.push({ Header: i, accessor: i });
    }

    return arr;
}

export function pivotObjectToArray(obj: Object): any[] {

    let arr = [] as any[];

    if (obj && (Object.keys(obj).length == 0)) return arr;

    for (let [key, value] of Object.entries(obj)) {

        let convertedValue = "";

        switch ((typeof value).toLowerCase()) {
            case 'object':
                convertedValue = value ? Object.keys(value).length.toString() : "";
                break;
            case 'array':
                convertedValue = value.length.toString();
                break;
            default:
                convertedValue = value.toString() || '';
                break;
        }

        arr.push({ property: key, value: convertedValue });
    }

    return arr;
}