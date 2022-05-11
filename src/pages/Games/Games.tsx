import React from 'react';
import { Slider } from '../../components';

interface IGames {
  name: string;
  games: Array<object>;
}

export const Games: React.FC<IGames> = ({ name, games }) => {
  return (
    <div>
      <Slider />
      <div>{name}</div>
      <div>
        {games.map(({ id, name }: any) => (
          <div key={id}>
            {id}
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};
