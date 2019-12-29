import { pivotObjectToArray } from './values';


describe("Values", () => {

  it("if k/v object, then array", (done) => {

    const obj = {
      "id": "e81bd25c-41c7-4ff1-8f8a-de2ad3f29f3c",
      "endpoints": {
        "STAGING": {
          "versionId": "0.3",
          "failedRegions": null
        },
        "PRODUCTION": {
          "versionId": "0.4",
          "failedRegions": null
        }
      },
      "endpointHitsCount": 1,
      "activeVersion": "0.4",
      "ownerEmail": null,
      "versions": [
        {"id":1, "cat":2},
        {"id":2, "cat":5},
      ]
    };

    const arr = pivotObjectToArray(obj);

    expect(JSON.stringify(arr)).toEqual('[{"property":"id","value":"e81bd25c-41c7-4ff1-8f8a-de2ad3f29f3c"},{"property":"endpoints","value":"2"},{"property":"endpointHitsCount","value":"1"},{"property":"activeVersion","value":"0.4"},{"property":"ownerEmail","value":""},{"property":"versions","value":"2"}]');

    done();
  })
})