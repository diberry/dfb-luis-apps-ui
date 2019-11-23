import * as React from 'react';

interface IPropsHeader {
  name?: string;
}


const Header: React.FC<IPropsHeader> = (props: IPropsHeader) => (
  <div className="header"></div>
);

export default Header;