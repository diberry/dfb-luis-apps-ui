import { LuisApps, ILuisApp, IFeatureFlags, ILuisAppVersion } from 'dfb-luis-apps-lib';
import { IValues} from './validators';

  
export class Luis {
  
static async getLuisApps(values: IValues, features: IFeatureFlags): Promise<ILuisApp[]> {

    if(!values.key || values.key===undefined || values.key===null || values.key===""){
      throw new Error("getLuisApps - empty values.key");
    }

    if(!values.endpoint || values.endpoint===undefined || values.endpoint===null || values.endpoint===""){
      throw new Error("getLuisApps - empty values.endpoint");
    }

    if(values.key.length!==32){
      throw new Error(`getLuisApps - expected key length 32, receieved ${values.key.length}`);
    }

    return await LuisApps.getApps(values, features);
  }
}