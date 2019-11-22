import { LuisApps } from 'dfb-luis-apps-lib';
import { LuisAppDataTable } from "./luis_apps";

jest.mock('dfb-luis-apps-lib');

const fake_key = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

describe("LuisAppDataTable", () =>{

    it("should get mock data", async(done) =>{
        try{     
            jest.setTimeout(10000);
            LuisApps.getApps.mockResolvedValue(Promise.resolve(require("../../test_data/apps.json")));
            const apps: any = await LuisAppDataTable.getLuisApps(fake_key);
            console.log(apps[0].name);
            expect(apps[0].name).toEqual("Mocked Hazem's Pizza App 2");
            done();
        } catch (err){
            done(err);
        }
    });

});