/* eslint-disable react/no-danger */

import React, { useState } from 'react';

import classes from '../Detail.module.scss';

interface IProps {
  description: string;
}

export const Description: React.FC<IProps> = ({ description }) => {
  const [isShowFull, setIsShowFull] = useState(false);

  const content = isShowFull ? description : `${description.slice(0, 290)}...`;

  return (
    <div className={classes.page__descr}>
      <h3 className={classes.page__about}>Описание</h3>
      {description.length > 290 ? (
        <>
          <p dangerouslySetInnerHTML={{ __html: content }} className={classes.page__descr_text} />
          <button className={classes.page__descr_show} onClick={() => setIsShowFull(!isShowFull)}>
            {isShowFull ? 'показать меньше' : 'показать больше'}
          </button>
        </>
      ) : (
        <p className={classes.page__descr_text} dangerouslySetInnerHTML={{ __html: description }} />
      )}
    </div>
  );
};
