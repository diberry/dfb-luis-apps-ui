import { LuisAppDataTable } from "./luis_apps";
import { ILuisApp } from "dfb-luis-apps-lib";

describe("LuisAppDataTable", () =>{

    it("should get mock data", async(done) =>{
        const apps: ILuisApp[] = await LuisAppDataTable.getLuisApps();
        expect(apps[0].name).toEqual("Mocked Hazem's Pizza App 2");
    });

});