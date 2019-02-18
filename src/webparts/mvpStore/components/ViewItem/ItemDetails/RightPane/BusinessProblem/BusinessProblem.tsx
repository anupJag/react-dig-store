import * as React from 'react';
import styles from './BusinessProblem.module.scss';

export interface IBusinessProblemProps{
    businessProblemInfo : string;
}

const businessProblem = (props : IBusinessProblemProps) => {

    const forceStyle : React.CSSProperties = props.businessProblemInfo === "Business Problem Information Not Avaialble" ? { color : "red"} : null;

    return(
        <div className={styles.businessProblemInfo}>
            <div className={styles.businessProblemInfoHeader}>Business Problem:</div>
            <div dangerouslySetInnerHTML={{ __html : props.businessProblemInfo}} className={styles.businessProblemInner} style={forceStyle}></div>
        </div>
    );
};

export default businessProblem;