import React, { useState } from 'react';

import classes from './Game.module.scss';

interface IProps {
  description: string;
}

export const Description: React.FC<IProps> = ({ description }) => {
  const [isShowFull, setIsShowFull] = useState(false);

  const slicedDescription = description.slice(0, 290);

  return (
    <div className={classes.game__descr}>
      <h3 className={classes.game__about}>Описание</h3>
      <p className={classes.game__descr_text}>
        {isShowFull ? description : `${slicedDescription}...`}
      </p>
      <button className={classes.game__descr_show} onClick={() => setIsShowFull(!isShowFull)}>
        {isShowFull ? 'показать меньше' : 'показать больше'}
      </button>
    </div>
  );
};
