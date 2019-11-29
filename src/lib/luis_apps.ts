import { LuisApps, ILuisApp } from 'dfb-luis-apps-lib';
import { IValues} from './validators';

export interface ILuisAppsDataTable {
  apps: ILuisApp[],
  columns: ILuisDataTableAppColumn[]
}
export interface ILuisDataTableAppColumn {
  Header: string,
  accessor: string
}

export class LuisAppDataTable {

  static async getLuisApps(values: IValues): Promise<ILuisApp[]> {

    if(!values.key || values.key===undefined || values.key===null || values.key===""){
      throw new Error("getLuisApps - empty values.key");
    }

    if(!values.endpoint || values.endpoint===undefined || values.endpoint===null || values.endpoint===""){
      throw new Error("getLuisApps - empty values.endpoint");
    }

    if(values.key.length!==32){
      throw new Error(`getLuisApps - expected key length 32, receieved ${values.key.length}`);
    }

    return await LuisApps.getApps(values);
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
  static async getDataTable(values: IValues): Promise<ILuisAppsDataTable> {
    
    try{

      if(!values){
        throw new Error("getDataTable - no values passed");
      }

      console.log(`values = ${JSON.stringify(values)}`);

      const list: ILuisApp[] = await LuisAppDataTable.getLuisApps(values);
      const columns: Array<ILuisDataTableAppColumn> = LuisAppDataTable.getColumns();

      return {
        apps: list,
        columns: columns
      };
    } catch(err){
      throw err;
    }
  };
}

