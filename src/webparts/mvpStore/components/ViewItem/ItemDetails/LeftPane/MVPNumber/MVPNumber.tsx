import * as React from 'react';
import styles from './MVPNumber.module.scss';

export interface IMVPNumberProps {
    mvpNumber: string;
}

const mvpNumber = (props: IMVPNumberProps) => {

    const forceStyle: React.CSSProperties = props.mvpNumber === "MVP Number Not Available" ? { color: "red" }: null;

    return (
        <div className={styles.mvpNumberInfo}>
            <div className={styles.mvpNumberData}>MVP Number</div>
            <div className={styles.mvpNumberInfoData} style={forceStyle}>{props.mvpNumber}</div>
        </div>
    );
};

export default mvpNumber;