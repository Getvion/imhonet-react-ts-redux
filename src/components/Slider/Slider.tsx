import React from 'react';
import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Slider.scss';

interface ISlider {
  items: {
    id: number;
    background_image: string;
    metacritic: number;
    rating: number;
    name: string;
    released: string;
    genres: {
      id: number;
      name: string;
    }[];
    short_screenshots: {
      id: number;
      image: string;
    }[];
  }[];
}

export const Slider: React.FC<ISlider> = ({ items }) => {
  return (
    <Carousel
      infiniteLoop={true}
      showStatus={false}
      showArrows={true}
      showIndicators={true}
      showThumbs={false}
      stopOnHover={true}
      selectedItem={1}
    >
      {items.map((item) => (
        <div key={item.id} className='slide__inner'>
          <img className='slide__img' src={item.background_image} alt='slide' />
          <div className='slide__content'>
            <h2 className='slide__name'>{item.name}</h2>
            <div className='slide__reviews'>
              <span className='slide__review'>{item.metacritic}</span>
              <span className='slide__review'>{item.rating}</span>
            </div>
            <span className='slide__release'>Год релиза: {item.released.split('-')[0]}</span>
            <div className='slide__genres'>
              Жанры:{' '}
              {item.genres.map((genre) => (
                <span key={genre.id} className='slide__genre'>
                  {genre.name.toLowerCase()}{' '}
                </span>
              ))}
            </div>
          </div>
          <div className='slide__screens'>
            {item.short_screenshots.slice(0, 5).map((img) => (
              <img className='slide__screens-img' key={img.id} src={img.image} alt={img.image} />
            ))}
          </div>
        </div>
      ))}
    </Carousel>
  );
};
