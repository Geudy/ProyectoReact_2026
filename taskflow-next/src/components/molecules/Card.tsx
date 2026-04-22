import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ children, title }) => (
  <div className="card">
    {title && <h4>{title}</h4>}
    <div>{children}</div>
  </div>
);
