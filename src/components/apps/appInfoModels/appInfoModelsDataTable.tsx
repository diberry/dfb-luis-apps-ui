import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { IDataTable } from '../../../lib/values';

interface IProps {
  tableData: IDataTable
}

const AppInfoModelsDataTable: React.FC<IProps> = (props: IProps) => {

  return (

    <div >
      {
        (props.tableData.data.length > 0) &&

        <ReactTable
          data={props.tableData.data}
          columns={props.tableData.columns}
        />

      }

    </div>
  )
};

export default AppInfoModelsDataTable;