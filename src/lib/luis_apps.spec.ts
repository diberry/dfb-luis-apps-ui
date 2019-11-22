import { LuisApps } from 'dfb-luis-apps-lib';
import { LuisAppDataTable } from "./luis_apps";

jest.mock('dfb-luis-apps-lib');

const fake_key = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

describe("LuisAppDataTable", () =>{
    afterEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });


    it("if key, then data", async(done) =>{
        try{     
            jest.setTimeout(10000);
            LuisApps.getApps.mockResolvedValue(Promise.resolve(require("../../test_data/apps.json")));

            const apps: any = await LuisAppDataTable.getLuisApps(fake_key);

            expect(LuisApps.getApps).toHaveBeenCalledTimes(1);
            expect(apps[0].name).toEqual("Mocked Hazem's Pizza App 2");
            done();
        } catch (err){
            done(err);
        }
    });


    it('if empty key, getDataTable should throw error', async done => {
        try {
          const emptyKey = undefined;
          LuisApps.getApps.mockResolvedValue(Promise.resolve(require("../../test_data/apps.json")));

          const apps: any = await LuisAppDataTable.getDataTable(emptyKey);

          done(`didn't throw error but expected one, apps length ${apps.length}`);
        } catch (error) {
          expect(LuisApps.getApps).toHaveBeenCalledTimes(0);
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toEqual('getDataTable - invalid key');
          done();
        }
      });
      
      it('if empty key, getLuisApps should throw error', async done => {
        try {
          const emptyKey = undefined;
          LuisApps.getApps.mockResolvedValue(Promise.resolve(require("../../test_data/apps.json")));

          const apps: any = await LuisAppDataTable.getLuisApps(emptyKey);

          done(`didn't throw error but expected one, apps length ${apps.length}`);
        } catch (error) {
          expect(LuisApps.getApps).toHaveBeenCalledTimes(0);
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toEqual('getLuisApps - invalid key');
          done();
        }
      });
});