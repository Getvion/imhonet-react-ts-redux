import React, { useEffect, useState } from 'react';
import { Input } from '../../../components';
// import { storage } from '../../../firebase';
// import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';

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
  const [imageValue, setImageValue] = useState(imageUrl);

  const onBlurElement = () => {
    setGeneralData({
      name: nicknameValue,
      description: descriptionValue,
      country: counryValue,
      imageUrl: imageValue,
    });
  };

  useEffect(() => {
    setImageValue(imageUrl);
  }, [imageUrl]);

  // todo image uploading prototype
  // const [imageUpload, setImageUpload] = useState<any>();
  // const [imageUrls, setImageUrls] = useState<any>([]);

  // //  func fro upload image to the database
  // const uploadImage = () => {
  //   if (!imageUpload) return;

  //   const imageRef = ref(storage, `images/${imageUpload.name}-${Date.now()}`);
  //   uploadBytes(imageRef, imageUpload).then(() => console.log('finished'));
  // };

  // const imagesListRef = ref(storage, 'images/');

  // useEffect(() => {
  //   // fetch all images from database
  //   listAll(imagesListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImageUrls((prev: any) => [...prev, url]);
  //       });
  //     });
  //   });
  // }, []);

  return (
    <section className={classes.general}>
      {/* <div>
        // start image upload prototype

        <div className={classes.general__img__wrapper}>
          <img src={imageUrl} alt={name} className={classes.general__img} />
          <label className={classes.general__upload} onClick={uploadImage}>
            Загрузить новое фото
             <input type='file' onChange={onBlurElement} className={classes.general__upload__field} /> 
          </label>
          <input type='file' onChange={(e) => setImageUpload(e.target.files ? e.target.files[0] : null)} />
          // <UploadAvatar /> 
        </div>
        // show all images on page

        {imageUrls.map((url: string) => (
          <img src={url} alt='url' />
        ))}
        //  end image upload prototype
      </div> */}

      <div className={classes.general__form}>
        <label className={classes.general__form__container} onBlur={onBlurElement}>
          <span className={classes.general__form__span}>Никнейм</span>
          <Input placeholder='' setValue={(value: string) => setNicknameValue(value)} value={nicknameValue} />
        </label>
        <label className={classes.general__form__container} onBlur={onBlurElement}>
          <span className={classes.general__form__span}>Описание </span>
          <Input
            placeholder=''
            setValue={(value: string) => setDescriptionValue(value)}
            value={descriptionValue}
          />
        </label>
        <label className={classes.general__form__container} onBlur={onBlurElement}>
          <span className={classes.general__form__span}>Страна</span>
          <Input placeholder='' setValue={(value: string) => setCounryValue(value)} value={counryValue} />
        </label>
      </div>
    </section>
  );
};
