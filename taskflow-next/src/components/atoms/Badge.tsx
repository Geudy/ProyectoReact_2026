import React from 'react';

interface BadgeProps {
  color?: string;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ color = 'gray', children }) => (
  <span className={`badge badge-${color}`}>{children}</span>
);
