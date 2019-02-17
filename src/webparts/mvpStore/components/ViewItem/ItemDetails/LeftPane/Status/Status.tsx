import * as React from 'react';
import styles from './Status.module.scss';

export interface IStatusProps{
    statusInfo : string;
}

const status = (props : IStatusProps) => {
    return(
        <div className={styles.statusInfo}>
            <div className={styles.statusData}>Status:</div>
            <div className={styles.statusInfoData}>{props.statusInfo}</div>
        </div>
    );
};

export default status;