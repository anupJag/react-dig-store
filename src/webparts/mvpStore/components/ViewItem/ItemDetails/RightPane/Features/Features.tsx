import * as React from 'react';
import styles from './Features.module.scss';

export interface IFeaturesProps{
    featuresInfo : string;
}

const features = (props : IFeaturesProps) => {
    return(
        <div className={styles.featuresInfo}>
            <div className={styles.featuresInfoHeader}>Features:</div>
            <div dangerouslySetInnerHTML={{ __html : props.featuresInfo}} className={styles.featuresInner}></div>
        </div>
    );
};

export default features;