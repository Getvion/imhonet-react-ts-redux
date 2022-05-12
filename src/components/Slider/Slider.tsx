import React from 'react';
import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

export const Slider = () => {
  return (
    <Carousel centerMode={true} infiniteLoop={true}>
      <div>
        <img
          src='https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg'
          alt='slide'
        />
        <p className='legend'>Legend 1</p>
      </div>
      <div>
        <img
          src='https://media.rawg.io/media/games/4a0/4a0a1316102366260e6f38fd2a9cfdce.jpg'
          alt='slide'
        />
        <p className='legend'>Legend 2</p>
      </div>
      <div>
        <img
          src='https://media.rawg.io/media/games/b7d/b7d3f1715fa8381a4e780173a197a615.jpg'
          alt='slide'
        />
        <p className='legend'>Legend 3</p>
      </div>
    </Carousel>
  );
};
