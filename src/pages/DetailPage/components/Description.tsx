import React, { useState } from 'react';

import classes from '../DetailPage.module.scss';

interface IProps {
  description: string;
}

export const Description: React.FC<IProps> = ({ description }) => {
  const [isShowFull, setIsShowFull] = useState(false);

  return (
    <div className={classes.page__descr}>
      <h3 className={classes.page__about}>Описание</h3>
      {description.length > 290 ? (
        <>
          <p className={classes.page__descr_text}>
            {isShowFull ? description : `${description.slice(0, 290)}...`}
          </p>
          <button className={classes.page__descr_show} onClick={() => setIsShowFull(!isShowFull)}>
            {isShowFull ? 'показать меньше' : 'показать больше'}
          </button>
        </>
      ) : (
        <p className={classes.page__descr_text}>{description}</p>
      )}
    </div>
  );
};
