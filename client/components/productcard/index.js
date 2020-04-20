import React, { forwardRef } from 'react';
import styles from './style.module.scss';

//usually i put all these functions in a util file
const getSizeInString = (arr) => {
  const arrayString = arr.map(size => size.title);
  return arrayString.toString();
}

export default forwardRef((props, ref) => {
  const { imageUrl, title, subTitle, sizeVariation } = props;
  return (
    <div className={styles.card} ref={ref}>
      <div className={styles.preview}>
        {imageUrl && <img src={imageUrl} alt="product image" />}
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{subTitle}</div>
      <div className={styles.size}>Sizes: {getSizeInString(sizeVariation)}</div>
    </div>
  )
});