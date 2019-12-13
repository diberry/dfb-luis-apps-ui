import * as React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { ILuisAppsDataTable } from "../../lib/luis_apps";

interface IProps {
  tableData: ILuisVersionsDataTable
}

const VersionsDataTable: React.FC<IProps> = (props: IProps) => {

  return (

    <div >
      {

        (props.tableData.apps.length > 0) &&

        <ReactTable
          data={props.tableData.apps}
          columns={props.tableData.columns}
        />

      }

    </div>


  )
};

export default DataTableLuis;