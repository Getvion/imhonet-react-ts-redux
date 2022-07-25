import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ref, list, deleteObject, uploadBytes, getDownloadURL } from 'firebase/storage';
import clsx from 'clsx';

import { storage } from '../../firebase';
import { IUserData } from '../../intefaces';
import { Button } from '../UI/Button/Button';
import { GlobalSvgSelector } from '../../assets/icons/GlobalSvgSelector';

import classes from './UploadAvatar.module.scss';

interface IProps {
  setNewImageUrl: Function;
}

export const UploadAvatar: React.FC<IProps> = ({ setNewImageUrl }) => {
  const [isImageAdded, setIsImageAdded] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState<string>();

  const { imageUrl, name, email } = useSelector((state: IUserData) => state.user.userData);

  const onUploadImage = () => {
    if (!selectedFile) return;

    const imagesListRef = ref(storage, `images/${email}`);
    // delete all images in the user folder
    list(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        deleteObject(ref(storage, item.fullPath));
      });
    });

    const imageRef = ref(storage, `images/${email}/${Date.now()}`);
    uploadBytes(imageRef, selectedFile);

    // fetch all images from database
    list(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setNewImageUrl(url);
        });
      });
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
