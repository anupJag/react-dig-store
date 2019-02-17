import * as React from 'react';
import Chips from '../../CommonUIElements/Chips/Chips';
import styles from './Segment.module.scss';

export interface ISegmentInfoProps{
    segmentInfo : string[];
}

const segmentInfo = (props : ISegmentInfoProps) => {
    return(
        <div className={styles.segmentInfo}>
            <div className={styles.segmentData}>Segment(s):</div>
            {
                props.segmentInfo && props.segmentInfo.length > 0 ?
                props.segmentInfo.map(el => {
                    let title = el;
                    if(el.indexOf("ALL - this") >= 0){
                        title = "Global Solution";
                    }
                    return <Chips title={title}/>;
                })
                :
                <p className={styles.noSegmentData}>Segment Data not available</p>
            }
        </div>
    );
};

export default segmentInfo;