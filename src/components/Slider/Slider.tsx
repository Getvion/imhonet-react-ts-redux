import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import './Slider.scss';
import clsx from 'clsx';

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
  const [slideImageUrl, setSlideImageUrl] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);

  const onImageSelect = (event: any, index: number) => {
    setSlideImageUrl(event.target?.currentSrc);
    setActiveSlide(index);
  };

  const onSlideChange = () => {
    setSlideImageUrl('');
    setActiveSlide(0);
  };

  return (
    <Swiper slidesPerView={1} loop={true} autoplay={true} onSlideChange={onSlideChange}>
      {items.map((item) => (
        <SwiperSlide className='slide__inner' key={item.id}>
          <img
            className='slide__img'
            src={slideImageUrl ? slideImageUrl : item.background_image}
            alt='slide'
          />
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
            {item.short_screenshots.slice(0, 5).map((img, index) => (
              <img
                onClick={(event) => onImageSelect(event, index)}
                className={clsx('slide__screens-img', { active: index === activeSlide })}
                key={img.id}
                src={img.image}
                alt={item.name}
              />
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
