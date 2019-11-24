import { LuisApps } from 'dfb-luis-apps-lib';
import { LuisAppDataTable } from "./luis_apps";
import { IValues } from './validators';

jest.mock('dfb-luis-apps-lib');

const fake_key = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const fake_endpoint = 'https://westus.com';

describe("LuisAppDataTable", () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  describe("getDataTable", () => {
    it('if empty key, getDataTable should throw error', async done => {
      try {
        const values: IValues[] = [];
        const emptyEndpoint = undefined;
        LuisApps.getApps.mockResolvedValue(Promise.resolve(require("../../test_data/apps.json")));

        const apps: any = await LuisAppDataTable.getDataTable(values);

        done(`didn't throw error but expected one, apps length ${apps.length}`);
      } catch (error) {
        expect(LuisApps.getApps).toHaveBeenCalledTimes(0);
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual('getDataTable - invalid key');
        done();
      }
    });

  })
  describe("getLuisApps", () => {



    it("if key and endpoint, then data", async (done) => {
      try {
        jest.setTimeout(10000);
        LuisApps.getApps.mockResolvedValue(Promise.resolve(require("../../test_data/apps.json")));
        const emptyKey = "";
        const emptyEndpoint = "";
        const apps: any = await LuisAppDataTable.getLuisApps(emptyEndpoint, emptyKey);

        expect(LuisApps.getApps).toHaveBeenCalledTimes(1);
        expect(apps[0].name).toEqual("Mocked Hazem's Pizza App 2");
        done();
      } catch (err) {
        done(err);
      }
    });



    it('if empty key, getLuisApps should throw error', async done => {
      try {
        const emptyKey = "";
        const emptyEndpoint = "";
        LuisApps.getApps.mockResolvedValue(Promise.resolve(require("../../test_data/apps.json")));

        const apps: any = await LuisAppDataTable.getLuisApps(emptyEndpoint, emptyKey);

        done(`didn't throw error but expected one, apps length ${apps.length}`);
      } catch (error) {
        expect(LuisApps.getApps).toHaveBeenCalledTimes(0);
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual('getLuisApps - invalid key');
        done();
      }
    });
  })
});