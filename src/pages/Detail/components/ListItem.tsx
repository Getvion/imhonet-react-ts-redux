import React, { useEffect, useState } from 'react';

import classes from '../Detail.module.scss';

interface IProps {
  description: string;
  content: string | number | string[];
}

export const ListItem: React.FC<IProps> = ({ description, content }) => {
  const [formatedContent, setFormatedContent] = useState(content);

  useEffect(() => {
    if (Array.isArray(formatedContent)) {
      setFormatedContent(
        formatedContent.map((genre, index) =>
          index === formatedContent.length - 1 ? genre : `${genre}, `
        )
      );
    }
  }, []);

  return (
    <li className={classes.page__list_item}>
      <span className={classes.page__list_descr}>{description}</span>
      <span className={classes.page__list_content}>{formatedContent}</span>
    </li>
  );
};
