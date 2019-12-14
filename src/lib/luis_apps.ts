import { LuisApps, ILuisApp, IFeatureFlags } from 'dfb-luis-apps-lib';
import { IValues } from './values';
import { Luis } from './luis_get';
export interface ILuisAppsDataTable {
  apps: ILuisApp[],
  columns: ILuisDataTableAppColumn[]
}
export interface ILuisDataTableAppColumn {
  Header: string,
  accessor: string
}

export class LuisAppDataTable {

  static async getLuisApps(values: IValues, features: IFeatureFlags): Promise<ILuisApp[]> {

    if (!values.key || values.key === undefined || values.key === null || values.key === "") {
      throw new Error("getLuisApps - empty values.key");
    }

    if (!values.endpoint || values.endpoint === undefined || values.endpoint === null || values.endpoint === "") {
      throw new Error("getLuisApps - empty values.endpoint");
    }

    if (values.key.length !== 32) {
      throw new Error(`getLuisApps - expected key length 32, receieved ${values.key.length}`);
    }

    return await Luis.getLuisApps(values, features);
  }
  static getAppColumns(): Array<ILuisDataTableAppColumn> {
    return [{
      Header: 'Id',
      accessor: 'id'
    }, {
      Header: 'Name',
      accessor: 'name'
    }, {
      Header: 'Active version',
      accessor: 'activeVersion'
    }, {
      Header: 'Versions',
      accessor: 'versionsCount'
    }, {
      Header: 'Date created',
      accessor: 'createdDateTime'
    }];
  }
  static async getAppDataTable(values: IValues, features: IFeatureFlags): Promise<ILuisAppsDataTable> {

    try {

      if (!values) {
        throw new Error("App - no values passed");
      }

      console.log(`values = ${JSON.stringify(values)}`);

      const list: ILuisApp[] = await LuisAppDataTable.getLuisApps(values, features);
      const columns: Array<ILuisDataTableAppColumn> = LuisAppDataTable.getAppColumns();

      return {
        apps: list,
        columns: columns
      };
    } catch (err) {
      throw err;
    }
  };
}

