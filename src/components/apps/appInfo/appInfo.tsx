import React, { useState, useEffect } from 'react';
import AppInfoDataTable from './appInfoDataTable';
import { ILuisAppInfoDataTable, LuisAppInfoDataTable } from "../../../lib/luis_appInfo";
import { IValues, IDataTable, pivotObjectToArray, getPivotColumns, IDataTableColumn } from '../../../lib/values';

import { ILuisApp } from 'dfb-luis-apps-lib';


interface IProps {
  app: ILuisApp;
}

const AppInfo: React.FC<IProps> = (props: IProps) => {

  const initialDataTable = {
    columns: [] as IDataTableColumn[],
    data: [] as any[],
    onClickRow: (selectRowId: string) => undefined
  };

  //const [selectedRowId, setSelectedDatRowId] = useState("");
  const [dataTable, setDataTable] = useState(initialDataTable);

  useEffect(() => {
      const dataTable = {
        columns: getPivotColumns(),
        data: pivotObjectToArray(props.app),
        onClickRow: setSelectedRow
      } as IDataTable;

      setDataTable(dataTable);
      return;
  }, [props.app]);

  const setSelectedRow = (rowId: string) => {

    console.log(`appId = ${rowId}`);

    //setSelectedDatRowId(rowId);
  }

  return (
    <div className="container">
      {
        (props.app && props.app.name && props.app.name.length > 0) &&
        <div>
          <div>App: {props.app.name}</div>
          <AppInfoDataTable tableData={dataTable} />
        </div>
      }
    </div>
  )

};

export default AppInfo;