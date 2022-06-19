import React, { useEffect, useState } from 'react';
// import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';

// import { storage } from '../../firebase';

import classes from './UploadAvatar.module.scss';
import { useSelector } from 'react-redux';
import { IUserData } from '../../intefaces';
import { Button } from '../UI/Button/Button';
import { GlobalSvgSelector } from '../../assets/icons/GlobalSvgSelector';
import clsx from 'clsx';

export const UploadAvatar = () => {
  const [imageUpload, setImageUpload] = useState<any>();
  const [isImageAdded, setIsImageAdded] = useState(false);
  const [isHover, setIsHover] = useState(false);
  // const [imageUrls, setImageUrls] = useState<any>([]);

  const { imageUrl, name } = useSelector((state: IUserData) => state.user.userData);

  //  func for upload image to the database
  const uploadImage = () => {
    if (!imageUpload) return;

    // const imageRef = ref(storage, `images/${imageUpload.name}-${Date.now()}`);
    // uploadBytes(imageRef, imageUpload).then(() => console.log('Успешно загружено'));
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

  // const imagesListRef = ref(storage, 'images/');

  //   fetch all images from database

  //   listAll(imagesListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImageUrls((prev: any) => [...prev, url]);
  //       });
  //     });
  //   })

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState<string>();

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
        <img src={preview ? preview : imageUrl} alt={name} className={classes.img} />
        <span className={clsx(classes.img__svg, { [classes.visible]: isHover })}>
          <GlobalSvgSelector id='edit' />
        </span>
        <input className={classes.img__input} type='file' onChange={onSelectFile} />
      </div>
      {isImageAdded ? <Button text='Сохранить' onClick={() => uploadImage()} /> : null}
    </div>
  );
};
