import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ref, uploadBytes, list } from 'firebase/storage';
import clsx from 'clsx';

import { storage } from '../../firebase';
import { IUserData } from '../../intefaces';
import { Button } from '../UI/Button/Button';
import { GlobalSvgSelector } from '../../assets/icons/GlobalSvgSelector';

import classes from './UploadAvatar.module.scss';

interface IProps {
  newImageUrl: string;
  setNewImageUrl: Function;
}

export const UploadAvatar: React.FC<IProps> = ({ newImageUrl, setNewImageUrl }) => {
  console.log(newImageUrl, setNewImageUrl);

  const [isImageAdded, setIsImageAdded] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState<string>();

  const { imageUrl, name, email } = useSelector((state: IUserData) => state.user.userData);

  const onUploadImage = () => {
    if (!selectedFile) return;

    // todo удалить date now оставлять стандартное название файла.
    const imageRef = ref(storage, `images/${email}-avatar-${Date.now()}`);
    uploadBytes(imageRef, selectedFile).then(() => console.log('Успешно загружено'));

    const imagesListRef = ref(storage, 'images/');

    // todo создать папку для каждого пользователя внутри images
    // todo удалили все фото из папки
    // todo добавили новое фото в папку
    //   fetch all images from database
    list(imagesListRef).then((response) => {
      console.log(response);

      // response.items.forEach((item) => {
      //   console.log(item);

      //   getDownloadURL(item).then((url) => {
      //     console.log(url);
      //   });
      // });
    });
  };

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setIsImageAdded(true);
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!selectedFile) return;

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return (
    <div className={classes.img__wrapper}>
      <div
        className={classes.img__container}
        onMouseLeave={() => setIsHover(false)}
        onMouseEnter={() => setIsHover(true)}
      >
        <img src={preview || imageUrl} alt={name} className={classes.img} />
        <span className={clsx(classes.img__svg, { [classes.visible]: isHover })}>
          <GlobalSvgSelector id='edit' />
        </span>
        <input className={classes.img__input} type='file' onChange={onSelectFile} />
      </div>
      {isImageAdded ? <Button text='Сохранить' onClick={onUploadImage} /> : null}
    </div>
  );
};
