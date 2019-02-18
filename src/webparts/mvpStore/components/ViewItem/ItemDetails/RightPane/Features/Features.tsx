import * as React from 'react';
import styles from './Features.module.scss';

export interface IFeaturesProps{
    featuresInfo : string;
}

const features = (props : IFeaturesProps) => {

    const forceStyle : React.CSSProperties = props.featuresInfo === "Features Information Not Available" ? { color : "red"} : null;

    return(
        <div className={styles.featuresInfo}>
            <div className={styles.featuresInfoHeader}>Features:</div>
            <div dangerouslySetInnerHTML={{ __html : props.featuresInfo}} className={styles.featuresInner}style={forceStyle}></div>
        </div>
    );
};

export default features;