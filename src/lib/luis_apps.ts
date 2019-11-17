import { LuisApps, ILuisApp } from 'dfb-luis-apps-lib';

export interface ILuisAppsDataTable {
  apps: ILuisApp[],
  columns: ILuisDataTableAppColumn[]
}
export interface ILuisDataTableAppColumn {
  Header: string,
  accessor: string
}

export class LuisAppDataTable {

  static async getLuisApps(): Promise<ILuisApp[]> {
    return await LuisApps.getApps(process.env.REACT_APP_LUIS_AUTHORING_KEY);
  }
  static getColumns(): Array<ILuisDataTableAppColumn> {
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
      Header: 'Date created',
      accessor: 'createdDateTime'
    }];
  }
  static async getDataTable(): Promise<ILuisAppsDataTable> {

    const list: ILuisApp[] = await LuisAppDataTable.getLuisApps();
    const columns: Array<ILuisDataTableAppColumn> = LuisAppDataTable.getColumns();

    return {
      apps: list,
      columns: columns
    };
  };
}

