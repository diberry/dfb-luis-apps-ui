import { ILuisApp } from "dfb-luis-apps-lib";

let value = [{
    "id": "e81bd25c-41c7-4ff1-8f8a-de2ad3f29f3c",
    "name": "Mocked Hazem's Pizza App 2",
    "description": "",
    "culture": "en-us",
    "usageScenario": "",
    "domain": "",
    "versionsCount": 1,
    "createdDateTime": "2019-11-15T21:40:11Z",
    "endpoints": {},
    "endpointHitsCount": 0,
    "activeVersion": "0.4",
    "ownerEmail": null,
    "tokenizerVersion": "1.0.0"
  }, {
    "id": "c46a7a94-3661-47bb-9bfb-ef1c5f98c4a6",
    "name": "Dina's Pizza app",
    "description": "",
    "culture": "en-us",
    "usageScenario": "",
    "domain": "",
    "versionsCount": 1,
    "createdDateTime": "2019-11-15T19:32:33Z",
    "endpoints": {},
    "endpointHitsCount": 0,
    "activeVersion": "0.1",
    "ownerEmail": null,
    "tokenizerVersion": "1.0.0"
  }, {
    "id": "286dd213-96f5-4b8c-90c5-6942418db412",
    "name": "Descriptors - Cities",
    "description": "",
    "culture": "en-us",
    "usageScenario": "",
    "domain": "",
    "versionsCount": 1,
    "createdDateTime": "2019-11-14T22:35:51Z",
    "endpoints": {},
    "endpointHitsCount": 0,
    "activeVersion": "0.1",
    "ownerEmail": null,
    "tokenizerVersion": "1.0.0"
  }, {
    "id": "9dffb4e0-0120-4ce1-b686-ed5512c2b9ad",
    "name": "Hazem's Pizza App",
    "description": "",
    "culture": "en-us",
    "usageScenario": "",
    "domain": "",
    "versionsCount": 1,
    "createdDateTime": "2019-11-13T13:59:27Z",
    "endpoints": {
      "PRODUCTION": {
        "versionId": "0.4",
        "directVersionPublish": false,
        "endpointUrl": "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/9dffb4e0-0120-4ce1-b686-ed5512c2b9ad",
        "isStaging": false,
        "assignedEndpointKey": null,
        "region": null,
        "endpointRegion": "westus",
        "publishedDateTime": "2019-11-15T15:19:51Z",
        "failedRegions": null
      }
    },
    "endpointHitsCount": 4,
    "activeVersion": "0.4",
    "ownerEmail": null,
    "tokenizerVersion": "1.0.0"
  }, {
    "id": "781637c9-f803-49eb-bbed-a6ecc73a0d4a",
    "name": "pattern",
    "description": "",
    "culture": "en-us",
    "usageScenario": "",
    "domain": "",
    "versionsCount": 1,
    "createdDateTime": "2019-11-12T20:06:10Z",
    "endpoints": {},
    "endpointHitsCount": 0,
    "activeVersion": "0.1",
    "ownerEmail": null,
    "tokenizerVersion": "1.0.0"
  }, {
    "id": "b4dd33cd-7048-4f3a-9c23-b89ed344dcc3",
    "name": "prebuilt models",
    "description": "",
    "culture": "en-us",
    "usageScenario": "",
    "domain": "",
    "versionsCount": 1,
    "createdDateTime": "2019-11-12T19:00:18Z",
    "endpoints": {},
    "endpointHitsCount": 0,
    "activeVersion": "0.1",
    "ownerEmail": null,
    "tokenizerVersion": "1.0.0"
  }, {
    "id": "8c5057b4-ce65-4b17-a156-2e8d78c5d2d3",
    "name": "test 4",
    "description": "",
    "culture": "en-us",
    "usageScenario": "",
    "domain": "",
    "versionsCount": 1,
    "createdDateTime": "2019-11-11T21:42:01Z",
    "endpoints": {},
    "endpointHitsCount": 0,
    "activeVersion": "0.1",
    "ownerEmail": null,
    "tokenizerVersion": "1.0.0"
  }, {
    "id": "e5269c02-2d7a-4fd9-b16d-d0f11d9dc042",
    "name": "Test app",
    "description": "",
    "culture": "zh-cn",
    "usageScenario": "",
    "domain": "",
    "versionsCount": 1,
    "createdDateTime": "2019-11-10T04:06:53Z",
    "endpoints": {},
    "endpointHitsCount": 0,
    "activeVersion": "0.1",
    "ownerEmail": null,
    "tokenizerVersion": "1.0.0"
  }, {
    "id": "7d3c1969-1c22-4905-9dbc-fd90ca09d7ce",
    "name": "Pizza Tutorial",
    "description": "",
    "culture": "en-us",
    "usageScenario": "",
    "domain": "",
    "versionsCount": 1,
    "createdDateTime": "2019-11-08T20:16:38Z",
    "endpoints": {
      "STAGING": {
        "versionId": "0.1",
        "directVersionPublish": false,
        "endpointUrl": "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/7d3c1969-1c22-4905-9dbc-fd90ca09d7ce",
        "isStaging": true,
        "assignedEndpointKey": null,
        "region": null,
        "endpointRegion": "westus",
        "publishedDateTime": "2019-11-11T00:56:00Z",
        "failedRegions": null
      },
      "PRODUCTION": {
        "versionId": "0.1",
        "directVersionPublish": false,
        "endpointUrl": "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/7d3c1969-1c22-4905-9dbc-fd90ca09d7ce",
        "isStaging": false,
        "assignedEndpointKey": null,
        "region": null,
        "endpointRegion": "westus",
        "publishedDateTime": "2019-11-11T00:56:06Z",
        "failedRegions": null
      }
    },
    "endpointHitsCount": 0,
    "activeVersion": "0.1",
    "ownerEmail": null,
    "tokenizerVersion": "1.0.0"
  }];

  export const LuisApps = jest.fn((): Promise<ILuisApp[]> =>{
    return new Promise((resolve, reject) => {   
        process.nextTick(() => {
          const typedObject: ILuisApp[] = <ILuisApp[]> value;
          resolve(typedObject);
        });
      });
  });