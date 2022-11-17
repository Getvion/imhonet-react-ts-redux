import React from 'react';

import { SectionType } from '../../../@types/intefaces';
import { IRequestResult } from '../../../@types/state';

import { LoadingSpinner, SectionCard } from '../../../components';

import { setNotification } from '../../../features';

import { useAppDispatch } from '../../../hooks';

import classes from '../Content.module.scss';

interface IContentInner {
  content: { results: IRequestResult[]; isLoaded: boolean; isError: string };
  section: SectionType;
}

export const ContentInner: React.FC<IContentInner> = ({ content, section }) => {
  const dispatch = useAppDispatch();

  if (content.isError) {
    dispatch(setNotification({ text: content.isError, type: 'reject' }));
  }

  return (
    <div className={classes.content__list}>
      {content.isLoaded ? (
        content.results.map(({ id, posterUrl, name }) => (
          <SectionCard key={id} id={id} section={section} bgImage={posterUrl} name={name} />
        ))
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
