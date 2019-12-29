import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { IDataTable } from '../../../lib/values';

interface IProps {
  tableData: IDataTable
}

const AppInfoVersionsDataTable: React.FC<IProps> = (props: IProps) => {

  const getTrProps = (state:any , rowInfo: any, column:any) => {
    if (rowInfo) {

      return {

        onClick: (e: any, handleOriginal: any) => {
          console.log(e);
          props.tableData.onClickRow(rowInfo.original.version);
          // 'handleOriginal' function.
          if (handleOriginal) {
            handleOriginal();
          }
        }
      }
    }
    return {};
  }

  return (

    <div >
      {
        (props.tableData.data.length > 0) &&

        <ReactTable
          data={props.tableData.data}
          columns={props.tableData.columns}
          getTrProps={getTrProps}
        />

      }

    </div>
  )
};

export default AppInfoVersionsDataTable;