import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import clsx from 'clsx';

import 'swiper/css';

import classes from './GamesSlider.module.scss';

interface IProps {
  items: {
    id: number;
    background_image: string;
    metacritic: number;
    rating: number;
    name: string;
    released: string;
    genres: { id: number; name: string }[];
    short_screenshots: { id: number; image: string }[];
  }[];
}

export const GamesSlider: React.FC<IProps> = ({ items }) => {
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
    <Swiper
      slidesPerView={1}
      loop={true}
      autoplay={true}
      onSlideChange={onSlideChange}
      className={classes.slides}
    >
      {items.map((item) => (
        <SwiperSlide className={classes.slide__inner} key={item.id}>
          <img
            className={classes.slide__img}
            src={slideImageUrl ? slideImageUrl : item.background_image}
            alt='slide'
          />
          <div className={classes.slide__content}>
            <h2 className={classes.slide__name}>{item.name}</h2>
            <div className={classes.slide__reviews}>
              <span
                className={clsx(classes.slide__review, {
                  [classes.green]: item.metacritic >= 80,
                  [classes.yellow]: item.metacritic < 80 && item.metacritic > 60,
                  [classes.red]: item.metacritic < 60,
                })}
              >
                {item.metacritic}
              </span>
              <span
                className={clsx(classes.slide__review, {
                  [classes.green]: item.rating >= 4,
                  [classes.yellow]: item.rating < 4 && item.rating > 3,
                  [classes.red]: item.rating < 2,
                })}
              >
                {item.rating}
              </span>
            </div>
            <span className={classes.slide__release}>Год релиза: {item.released.split('-')[0]}</span>
            <div className={classes.slide__genres}>
              Жанры:{' '}
              {item.genres.map((genre) => (
                <span key={genre.id} className={classes.slide__genre}>
                  {genre.name.toLowerCase()}{' '}
                </span>
              ))}
            </div>
          </div>
          <div className={classes.slide__screens}>
            {item.short_screenshots.slice(0, 5).map((img, index) => (
              <img
                onClick={(event) => onImageSelect(event, index)}
                className={clsx(classes.slide__screens_img, {
                  [classes.active]: index === activeSlide,
                })}
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
