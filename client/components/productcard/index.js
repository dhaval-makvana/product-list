import React, { forwardRef } from 'react';
import styles from './style.module.scss';

export default forwardRef((props, ref) => {
  const { imageUrl, title, subTitle, sizeVariation } = props;
  return (
    <div className={styles.card} ref={ref}>
      <div className={styles.preview}>
        {imageUrl && <img src={imageUrl} alt="product image" />}
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{subTitle}</div>
      <div className={styles.size}>size</div>
    </div>
  )
});