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
      <UploadAvatar setNewImageUrl={setNewImageUrl} />
      <div className={classes.general__form}>
        <div className={classes.general__form__container} onBlur={onBlurElement}>
          <span className={classes.general__form__span}>Никнейм</span>
          <Input placeholder='' setValue={(value: string) => setNicknameValue(value)} value={nicknameValue} />
        </div>
        <div className={classes.general__form__container} onBlur={onBlurElement}>
          <span className={classes.general__form__span}>Описание </span>
          <Input placeholder='' setValue={(value: string) => setDescriptionValue(value)} value={descriptionValue} />
        </div>
        <div className={classes.general__form__container} onBlur={onBlurElement}>
          <span className={classes.general__form__span}>Страна</span>
          <Input placeholder='' setValue={(value: string) => setCounryValue(value)} value={counryValue} />
        </div>
      </div>
    </section>
  );
};
