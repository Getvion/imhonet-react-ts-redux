import React, { useState } from 'react';
import { ref, uploadBytes, listAll, getDownloadURL } from '@firebase/storage';
import { storage } from '../../firebase';

import classes from './UploadImage.module.scss';

interface UploadProps {
  imageUrl: string;
  name: string;
}

export const UploadImage: React.FC<UploadProps> = ({ imageUrl, name }) => {
  const [imageUpload, setImageUpload] = useState();

  // ! загрузка изображений на сервер
  const uploadImage = () => {
    if (!imageUpload) return;

    const imageRef = ref(storage, `images/${Date.now()}`);
    uploadBytes(imageRef, imageUpload)
      .then(() => console.log('Image Uploaded'))
      .catch((error) => console.log(error.messsage));
  };
  return (
    <div className={classes.image}>
      <div className={classes.image__choose}>
        <input type='file' onChange={(e: any) => setImageUpload(e.target.files[0])} />
        <button onClick={uploadImage}>upload</button>
      </div>
      <img src={imageUrl} alt={name} className={classes.image__avatar} />
    </div>
  );
};
