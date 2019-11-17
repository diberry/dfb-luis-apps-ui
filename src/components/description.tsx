import * as React from 'react';

interface IProps {
  buttonStatusColor: string;
  count: number;
  incrementBy: number;
  onClick: (count: number, incrementBy: number) => void;
}

const Description: React.FC<IProps> = (props: IProps) => (
    <div className="count" >
    <p>My favorite number is {props.count}, incrementing by {props.incrementBy}</p>
    <button 
        style={{ backgroundColor: props.buttonStatusColor }}
        onClick={() => props.onClick(props.count, props.incrementBy)}
    >
        Increase
    </button>
  </div>
);



export default Description;