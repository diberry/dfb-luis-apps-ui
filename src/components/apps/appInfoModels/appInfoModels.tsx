import React, { useState, useEffect } from 'react';
import AppInfoModelsDataTable from './appInfoModelsDataTable';
import { IDataTable, IDataTableColumn, getColumnsFromObject } from '../../../lib/values';
import { ILuisModel } from 'dfb-luis-apps-lib';

interface IProps {
  models: ILuisModel[] | undefined;
}

const AppInfoModels: React.FC<IProps> = (props: IProps) => {

  const initialDataTable = {
    columns: [] as IDataTableColumn[],
    data: [] as any[],
    onClickRow: (selectRowId: string) => undefined
  };

  //const [selectedRowId, setSelectedDatRowId] = useState("");
  const [dataTable, setDataTable] = useState(initialDataTable);

  useEffect(() => {

    if (props.models && props.models.length > 0) {

      const dataTable = {
        columns: getColumnsFromObject(props.models[0]),
        data: fixModels(),
        onClickRow: setSelectedRow
      } as IDataTable;

      setDataTable(dataTable);

    }


    return;
  }, [props.models]);

  const fixModels = (): ILuisModel[] | undefined | any[] =>{

/*
    let localVersions:any[] = Object.assign(props.models, {});

    for(let version of localVersions){
      version.models = version.models.length || 0;
    }

    return localVersions;
    */
   return props.models;
  }

  const setSelectedRow = (rowId: string) => {

    console.log(`appId = ${rowId}`);

    //setSelectedDatRowId(rowId);
  }

  return (
    <div className="container">
      {
        (props.models && props.models.length > 0) &&
        <div>
          <div>Models</div>
          <AppInfoModelsDataTable tableData={dataTable} />
        </div>
      }
    </div>
  )

};

export default AppInfoModels;