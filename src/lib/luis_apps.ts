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

  static async getLuisApps(key: string): Promise<ILuisApp[]> {
    return await LuisApps.getApps(key);
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
  static async getDataTable(key: string): Promise<ILuisAppsDataTable> {

    const list: ILuisApp[] = await LuisAppDataTable.getLuisApps(key);
    const columns: Array<ILuisDataTableAppColumn> = LuisAppDataTable.getColumns();

    return {
      apps: list,
      columns: columns
    };
  };
}

