import * as React from 'react';

interface IProps {
  name?: string;
}
//<h1>Hello, {props.name}! Welcome to React and TypeScript.</h1>
const Header: React.FC<IProps> = (props: IProps) => (
  <div className="Header">
  
  </div>
);

export default Header;