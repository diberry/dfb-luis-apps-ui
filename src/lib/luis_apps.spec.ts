import { LuisApps, IFeatureFlags } from 'dfb-luis-apps-lib';
import { LuisAppDataTable } from "./luis_apps";
import { IValues } from './values';

jest.mock('dfb-luis-apps-lib');

const fake_key = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const fake_endpoint = 'https://westus.com';

describe("LuisAppDataTable", () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  describe("getData", () => {
    describe("success", () => {
      it("if key and endpoint, then data", async (done) => {
        try {
          jest.setTimeout(10000);

          const values: IValues = {
            endpoint: "fakeEndpoint",
            key: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          };

          const featureFlags: IFeatureFlags = {
            versions: true,
            models: true,
          };

          LuisApps.getApps.mockResolvedValue(Promise.resolve(require("../../test_data/apps.json")));
          const apps: any = await LuisAppDataTable.getData(values, featureFlags);

          expect(LuisApps.getApps).toHaveBeenCalledTimes(1);
          expect(apps[0].name).toEqual("Mocked Hazem's Pizza App 2");
          done();
        } catch (err) {
          done(err);
        }
      });
    })
    describe("error", () => {
      it('if empty values, getLuisApps should throw error', async done => {
        try {
          const values: IValues = {};
          const featureFlags: IFeatureFlags = {
            versions: true,
            models: true,
          };
          const emptyEndpoint = undefined;
          LuisApps.getApps.mockResolvedValue(Promise.resolve(require("../../test_data/apps.json")));

          const apps: any = await LuisAppDataTable.getData(values, featureFlags);

          done(`didn't throw error but expected one, apps length ${apps.length}`);
        } catch (error) {
          expect(LuisApps.getApps).toHaveBeenCalledTimes(0);
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toEqual('getLuisApps - values are empty');
          done();
        }
      });

    })
    it('if empty values.key, getLuisApps should throw error', async done => {
      try {

        const values: IValues = {
          endpoint: "fakeEndpoint",
          key: ""
        };

        const featureFlags: IFeatureFlags = {
          versions: true,
          models: true,
        };

        LuisApps.getApps.mockResolvedValue(Promise.resolve(require("../../test_data/apps.json")));

        const apps: any = await LuisAppDataTable.getData(values, featureFlags);

        done(`didn't throw error but expected one, apps length ${apps.length}`);
      } catch (error) {
        expect(LuisApps.getApps).toHaveBeenCalledTimes(0);
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual('getLuisApps - empty values.key');
        done();
      }

    })
  });
});