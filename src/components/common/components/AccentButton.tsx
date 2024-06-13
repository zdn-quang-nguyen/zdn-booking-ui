//
import React from 'react';
import { Button } from 'antd';

interface AccentButtonProps {
  label: string;
  value: string;
  isActive: boolean;
  onClick: (value: string) => void;
}

const AccentButton: React.FC<AccentButtonProps> = ({
  label,
  value,
  isActive,
  onClick,
}) => {
  return (
    <Button
      type={isActive ? 'primary' : 'default'}
      onClick={() => onClick(value)}
    >
      {label}
    </Button>
  );
};

export default AccentButton;
