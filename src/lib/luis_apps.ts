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

  static async luisApps(): Promise<ILuisAppsDataTable> {

    let list: ILuisApp[] = await LuisApps.getApps("b05c02f2e60a41e7b81aac571daf766e");

    let columns: Array<ILuisDataTableAppColumn> = [{
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

    return {
      apps: list,
      columns: columns
    };
  }
};

