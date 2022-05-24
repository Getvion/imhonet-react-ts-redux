import React, { useState } from 'react';

import classes from './Game.module.scss';

interface Props {
  description: string;
}

export const Description: React.FC<Props> = ({ description }) => {
  const [isShowFull, setIsShowFull] = useState(false);

  const slicedDescription = description.slice(0, 290);

  return (
    <div className={classes.game__descr}>
      <h3 className={classes.game__about}>Описание</h3>
      <p className={classes.game__descr_text}>{isShowFull ? description : `${slicedDescription}...`}</p>
      <span className={classes.game__descr_show} onClick={() => setIsShowFull(!isShowFull)}>
        {isShowFull ? 'показать меньше' : 'показать больше'}
      </span>
    </div>
  );
};
