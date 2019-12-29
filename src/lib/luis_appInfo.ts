import { LuisApps, ILuisApp, IFeatureFlags } from 'dfb-luis-apps-lib';
import { IValues, IDataTable, IDataTableColumn, pivotObjectToArray, getPivotColumns } from './values';
import { Luis } from './luis_get';

export interface ILuisAppInfoDataTable {
    data: string[],
    columns: IDataTableColumn[],
    onClickRow: (selectRowId: string) => any;
}

export class LuisAppInfoDataTable {

    static rowLevelNavigation(rowId: string) {
        console.log(`rowLevelNagivation called with values = ${JSON.stringify(rowId)}`);
    }
    static getAppDataTable(app: ILuisApp): ILuisAppInfoDataTable {

        return {
            data: pivotObjectToArray(app),
            columns: getPivotColumns(),
            onClickRow: LuisAppInfoDataTable.rowLevelNavigation
        };

    };
}

