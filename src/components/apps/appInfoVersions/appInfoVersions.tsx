import React, { useState, useEffect } from 'react';
import AppInfoVersionsDataTable from './appInfoVersionsDataTable';
import AppInfoModels from '../appInfoModels/appInfoModels';
import { IDataTable, IDataTableColumn, getColumnsFromObject } from '../../../lib/values';

import { ILuisAppVersion, ILuisModel } from 'dfb-luis-apps-lib';
import AppInfoModelsDataTable from '../appInfoModels/appInfoModelsDataTable';

interface IProps {
  versions: ILuisAppVersion[] | undefined;
}

const AppInfoVersions: React.FC<IProps> = (props: IProps) => {

  const initialDataTable = {
    columns: [] as IDataTableColumn[],
    data: [] as any[],
    onClickRow: (selectRowId: string) => undefined
  };

  //const [selectedRowId, setSelectedDatRowId] = useState("");
  const [dataTable, setDataTable] = useState(initialDataTable);
  const [selectedVersion, setSelectedVersion] = useState({} as ILuisAppVersion);
  const [versionModels, setVersionModels] = useState([] as ILuisModel[]);


  useEffect(() => {

    if (props.versions && props.versions.length > 0) {

      const dataTable = {
        columns: getColumnsFromObject(props.versions[0]),
        data: fixVersions(),
        onClickRow: setSelectedRow
      } as IDataTable;

      setDataTable(dataTable);

    }


    return;
  }, [props.versions]);

  const fixVersions = (): ILuisAppVersion[] => {

    let localVersions: any[] = [];

    if (props.versions) {

      for (let version of props.versions) {

        let models = (version.models && version.models.length && version.models.length > 0) ? version.models.length.toString() : "0"

        localVersions.push({
          version: version.version,
          createdDateTime: version.createdDateTime,
          lastModifiedDateTime: version.lastModifiedDateTime,
          lastTrainedDateTime: version.lastTrainedDateTime,
          lastPublishedDateTime: version.lastPublishedDateTime,
          endpointUrl: version.endpointUrl,
          assignedEndpointKey: version.assignedEndpointKey,
          externalApiKeys: version.externalApiKeys,
          intentsCount: version.intentsCount,
          entitiesCount: version.entitiesCount,
          endpointHitsCount: version.endpointHitsCount,
          trainingStatus: version.trainingStatus,
          models: models
        });
      }
    }
    return localVersions;
  }

  const setSelectedRow = (version: string) => {

    if (version && props.versions) {
      console.log(`version (10 char name) = ${version}`);
      const versionSelected = Object.assign(props.versions.filter(x => x.version === version)[0]);

      setSelectedVersion(versionSelected);
      setVersionModels(versionSelected.models);
    }
  }

  const renderVersions = () => {
    if (props.versions && props.versions.length > 0) {
      return (
        <div>
          <div>Versions</div>
          <AppInfoVersionsDataTable tableData={dataTable} />
        </div>
      )
    }
  }
  const renderModels = () => {
    if (versionModels && versionModels.length > 0) {
      return (
        <div>
          <div>Models</div>
          <AppInfoModels models={versionModels} />
        </div>
      )
    }
  }
  return (

    <div className="container">
      {
        <div>
          {renderVersions()}
          {renderModels()}
        </div>
      }
    </div>
  )

};

export default AppInfoVersions;