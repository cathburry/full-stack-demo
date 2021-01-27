import { Button } from 'react-bootstrap';
import React from 'react';

const CustomButton = (props) => {
  const { label } = props;
  return (
    <Button
      {...props}
    >
      { label }
    </Button>
  );
}

export default CustomButton;