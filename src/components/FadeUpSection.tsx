import React from 'react';

interface FadeUpSectionProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}

export const FadeUpSection: React.FC<FadeUpSectionProps> = ({
  children,
  className = '',
}) => {
  // Still design: render full-page sections immediately without motion or delayed visibility
  return (
    <div className={`w-full ${className}`}>
      {children}
    </div>
  );
};
