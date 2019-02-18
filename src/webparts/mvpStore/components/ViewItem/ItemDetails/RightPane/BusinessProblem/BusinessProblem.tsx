import * as React from 'react';
import styles from './BusinessProblem.module.scss';

export interface IBusinessProblemProps{
    businessProblemInfo : string;
}

const businessProblem = (props : IBusinessProblemProps) => {
    return(
        <div className={styles.businessProblemInfo}>
            <div className={styles.businessProblemInfoHeader}>Business Problem:</div>
            <div dangerouslySetInnerHTML={{ __html : props.businessProblemInfo}} className={styles.businessProblemInner}></div>
        </div>
    );
};

export default businessProblem;