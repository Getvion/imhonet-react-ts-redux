import React from 'react';
import { Slider } from '../../components';

interface ISection {
  section: string;
}

export const Section: React.FC<ISection> = ({ section }) => {
  return (
    <div>
      <Slider />
      <div>{section}</div>
    </div>
  );
};
