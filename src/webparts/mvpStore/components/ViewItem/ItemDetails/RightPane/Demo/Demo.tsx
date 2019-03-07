import * as React from 'react';
import styles from './Demo.module.scss';

export interface IDemoProps{
    demoInfo : string;
}

const demo = (props : IDemoProps) => {
    return(
        <div className={styles.demoInfo}>
            <div className={styles.demoInfoHeader}>Demo:</div>
            <div dangerouslySetInnerHTML={{__html : props.demoInfo}} className={styles.demoInner} ></div>
        </div>
    );
};

export default demo;