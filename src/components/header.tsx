import * as React from 'react';

interface IPropsHeader {
  name?: string;
}


const Header: React.FC<IPropsHeader> = (props: IPropsHeader) => (
  <h1>Hello, {props.name}! Welcome to React and TypeScript.</h1>
);

export default Header;