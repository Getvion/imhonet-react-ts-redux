/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Input, UploadAvatar } from '../../../components';

import classes from './General.module.scss';

interface IProps {
  name: string;
  imageUrl: string;
  country: string;
  description: string;
  setGeneralData: Function;
}

export const General: React.FC<IProps> = ({ name, imageUrl, country, description, setGeneralData }) => {
  const [nicknameValue, setNicknameValue] = useState(name);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const [counryValue, setCounryValue] = useState(country);
  const [newImageUrl, setNewImageUrl] = useState(imageUrl);

  const onBlurElement = () => {
    setGeneralData({
      name: nicknameValue,
      description: descriptionValue,
      country: counryValue,
      imageUrl: newImageUrl
    });
  };

  return (
    <section className={classes.general}>
      <UploadAvatar newImageUrl={newImageUrl} setNewImageUrl={setNewImageUrl} />
      <div className={classes.general__form} onClick={() => {}}>
        <label className={classes.general__form__container} onBlur={onBlurElement}>
          <span className={classes.general__form__span}>Никнейм</span>
          <Input placeholder='' setValue={(value: string) => setNicknameValue(value)} value={nicknameValue} />
        </label>
        <label className={classes.general__form__container} onBlur={onBlurElement}>
          <span className={classes.general__form__span}>Описание </span>
          <Input placeholder='' setValue={(value: string) => setDescriptionValue(value)} value={descriptionValue} />
        </label>
        <label className={classes.general__form__container} onBlur={onBlurElement}>
          <span className={classes.general__form__span}>Страна</span>
          <Input placeholder='' setValue={(value: string) => setCounryValue(value)} value={counryValue} />
        </label>
      </div>
    </section>
  );
};
