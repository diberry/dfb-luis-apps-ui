import React, { useState } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { ILuisAppsDataTable } from "../../lib/luis_apps";

interface IProps {
  tableData: ILuisAppsDataTable,
  selectedAppFn: (selectAppId: string) => any;
}

const DataTableLuis: React.FC<IProps> = (props: IProps) => {

  const getTrProps = (state:any , rowInfo: any, column:any) => {
    if (rowInfo) {

      //setDataTableState({rowSelected: rowInfo.Id});
      //props.tableData.onClickRow(rowInfo.Id)

      return {

        onClick: (e: any, handleOriginal: any) => {
          //setDataTableState({rowSelected: rowInfo.original.id});
          //props.tableData.onClickRow(rowInfo.original.id);
          props.selectedAppFn(rowInfo.original.id);
          //history.push('/application?id=' + rowInfo.original.id);
          // IMPORTANT! React-Table uses onClick internally to trigger
          // events like expanding SubComponents and pivots.
          // By default a custom 'onClick' handler will override this functionality.
          // If you want to fire the original onClick handler, call the
          // 'handleOriginal' function.
          if (handleOriginal) {
            handleOriginal();
          }


        },
        style: {
          background: rowInfo.row.versionsCount === 0 ? 'red' : 'green',
          color: 'white'
        }
      }
    }
    return {};
  }

  return (

    <div >
      {

        (props.tableData.apps.length > 0) &&

        <ReactTable
          data={props.tableData.apps}
          columns={props.tableData.columns}
          getTrProps={getTrProps}
        />

      }

    </div>


  )
};

export default DataTableLuis;