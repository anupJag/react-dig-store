import * as React from 'react';
import Chips from '../../CommonUIElements/Chips/Chips';
import styles from './TechUsed.module.scss';

export interface ITechUsedProps {
    techUsedInfo: string[];
}


const techUsed = (props: ITechUsedProps) => {
    return (
        <div className={styles.techUsedInfo}>
            <div className={styles.techUsedData}>Technology(s) Used to Build Solution:</div>
            {
                props.techUsedInfo && props.techUsedInfo.length > 0 ?
                    props.techUsedInfo.map(el => <Chips title={el} />)
                    :
                    <p className={styles.noTechUsedData}>Technology Data not available</p>
            }
        </div>
    );
};

export default techUsed;