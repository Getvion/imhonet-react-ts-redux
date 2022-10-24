import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import clsx from 'clsx';

import 'swiper/css';

import { RatingFormater } from '../../../components';

import classes from './GamesSlider.module.scss';

interface IProps {
  items: {
    posterUrl: string;
    genres: string[];
    id: number;
    name: string;
    rating1: number;
    rating2: number;
    year: string;
    screenshots: { imageUrl: string; id: number }[];
  }[];
}

export const GamesSlider: React.FC<IProps> = ({ items }) => {
  const [slideImageUrl, setSlideImageUrl] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);

  const onImageSelect = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    setSlideImageUrl((event.target as HTMLFormElement)?.currentSrc);
    setActiveSlide(index);
  };

  const onSlideChange = () => {
    setSlideImageUrl('');
    setActiveSlide(0);
  };

  return (
    <Swiper
      slidesPerView={1}
      loop
      autoplay
      onSlideChange={onSlideChange}
      className={classes.slides}
    >
      {items.map((item) => (
        <SwiperSlide className={classes.slide__inner} key={item.id}>
          <img className={classes.slide__img} src={slideImageUrl || item.posterUrl} alt='slide' />
          <div className={classes.slide__content}>
            <h2 className={classes.slide__name}>{item.name}</h2>
            <div className={classes.slide__reviews}>
              <RatingFormater rating={item.rating1} />
              <RatingFormater rating={item.rating2} />
            </div>
            <span className={classes.slide__release}>Год релиза: {item.year}</span>
            <div className={classes.slide__genres}>
              Жанры:{' '}
              {item.genres.map((genre) => (
                <span key={genre} className={classes.slide__genre}>
                  {genre.toLowerCase()}{' '}
                </span>
              ))}
            </div>
          </div>
          <div className={classes.slide__screens}>
            {item.screenshots.slice(0, 5).map((img, index) => (
              <button onClick={(event) => onImageSelect(event, index)}>
                <img
                  className={clsx(classes.slide__screens_img, {
                    [classes.active]: index === activeSlide
                  })}
                  key={img.id}
                  src={img.imageUrl}
                  alt={item.name}
                />
              </button>
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
