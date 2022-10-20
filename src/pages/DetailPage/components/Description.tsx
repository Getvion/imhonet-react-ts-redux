import React, { useState } from 'react';

import classes from '../DetailPage.module.scss';

interface IProps {
  description: string;
}

export const Description: React.FC<IProps> = ({ description }) => {
  const [isShowFull, setIsShowFull] = useState(false);

  const slicedDescription = description.slice(0, 290);

  return (
    <div className={classes.page__descr}>
      <h3 className={classes.page__about}>Описание</h3>
      <p className={classes.page__descr_text}>
        {isShowFull ? description : `${slicedDescription}...`}
      </p>
      <button className={classes.page__descr_show} onClick={() => setIsShowFull(!isShowFull)}>
        {isShowFull ? 'показать меньше' : 'показать больше'}
      </button>
    </div>
  );
};
