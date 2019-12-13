import { LuisApps, ILuisApp, IFeatureFlags, ILuisAppVersion } from 'dfb-luis-apps-lib';
import { IValues } from './validators';

export interface ILuisDataTableVersionColumn {
    Header: string,
    accessor: string
}

export interface ILuisAppVersionFiltered extends ILuisAppVersion {
    appId: string
}

export class LuisVersionDataTable {

    static getVersionsColumns(): Array<ILuisDataTableVersionColumn> {
        return [{
            Header: 'Version',
            accessor: 'version'
        }, {
            Header: 'Modified',
            accessor: 'lastModifiedDateTime'
        },
        {
            Header: 'Trained',
            accessor: 'lastTrainedDateTime'
        },
        {
            Header: 'Published',
            accessor: 'lastPublishedDateTime'
        },
        {
            Header: 'Intents',
            accessor: 'intentsCount'
        }, {
            Header: 'Entities',
            accessor: 'entitiesCount'
        }, {
            Header: 'EndpointHitsCount',
            accessor: 'endpointHitsCount'
        }];
    }
}
export class LuisVersionData {

    static filterIValuesByKey(filters: IValues, item: string){
        return Object.keys(filters).filter(key => {
            if (key===item) {
                return filters[key];
            }

        });
    }
/*
    static filter(filterableColumns: IValues, apps: ILuisApp[]) {

        console.log(apps.length);

        return apps.map(app => {

            console.log(app);

            if (app && app.versions && app.versions) {

                console.log("version is not null");

                app.versions.filter(version => {

                    console.log(version);

                    if (version.version === filterableColumns.filter(x => Object.name ==="version") {

                        console.log("equal");

                        return version;
                    }
                });
            }
        })
    }*/

}


