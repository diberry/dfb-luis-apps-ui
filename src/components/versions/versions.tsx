import * as React from 'react';
import VersionsDataTable from './dataTable';
import { ILuisAppsDataTable } from "../../lib/luis_apps";
import { IValues } from '../../lib/validators';

interface IProps {
  tableData: ILuisAppsDataTable;
}
const Versions: React.FC<IProps> = (props: IProps) => {

  return (
    <div className="container">
      <VersionsDataTable tableData={props.tableData} />

    </div>
  )

};

export default Versions;