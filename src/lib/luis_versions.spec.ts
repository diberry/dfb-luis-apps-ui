import { LuisApps } from 'dfb-luis-apps-lib';
import { LuisAppDataTable } from "./luis_apps";
import { IValues } from './validators';
import { LuisVersionData } from './luis_versions';


describe("LuisVersion", () => {
  /*
    it('filter by version name', done => {
      try {
        const filters: IValues[] = [{'version':'0.2'}];
        const appsJson = require("../../test_data/appsNested.json");

        const filteredVersions = LuisVersionData.filter(filters, appsJson);

        done();
      } catch (error) {
        
        done(error);
      }
    });
    */
  it('filter IValues', done => {
    try {
      const filters: IValues[] = [
        { 'name': 'test' },
        { 'version': '0.2' },
        { 'lastDateModified': '' }
      ];

      const filteredObject = LuisVersionData.filterIValuesByKey(filters, "version");

      expect(filteredObject).toEqual({ 'version': '0.2' })

      done();
    } catch (error) {

      done(error);
    }
  });
});

