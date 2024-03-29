import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { LoadingSpinner, SectionCard } from '../../../components';

import { IRequestResult } from '../../../@types/state';
import { SectionType } from '../../../@types/intefaces';

import { setNotification } from '../../../features';

import { useWindowDimensions, useAppDispatch } from '../../../hooks';

import classes from '../Main.module.scss';
import 'swiper/css';

interface IProps {
  content: { results: IRequestResult[]; isLoaded: boolean; isError: string };
  section: SectionType;
}

export const MainContent: React.FC<IProps> = ({ content, section }) => {
  const dispatch = useAppDispatch();

  if (content.isError) {
    dispatch(setNotification({ text: content.isError, type: 'reject' }));
  }
  const [slidesToView, setSlidesToView] = useState(4);

  const { windowWidth } = useWindowDimensions();

  useEffect(() => {
    if (windowWidth > 1200) setSlidesToView(4.05);
    if (windowWidth < 1200) setSlidesToView(3);
    if (windowWidth < 910) setSlidesToView(2);
    if (windowWidth < 610) setSlidesToView(1);
  }, [windowWidth]);

  const formatName = (name: string) => (name.length > 20 ? `${name.slice(0, 20)}...` : name);

  return (
    <div className={classes.cards}>
      {content.isLoaded ? (
        <Swiper slidesPerView={slidesToView} loop>
          {content.results.map(({ id, name, posterUrl }) => (
            <SwiperSlide key={id} className={classes.card}>
              <SectionCard name={formatName(name)} bgImage={posterUrl} section={section} id={id} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
