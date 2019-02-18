import * as React from 'react';
import styles from './FunctionInfo.module.scss';

export interface IFunctionInfoProps{
    funtionList : string[];
}

const functionInfo = (props : IFunctionInfoProps) => {
    return(
        <div className={styles.functionInfo}>
            <div className={styles.functionInfoData}>Function(s) where the solution is being used:</div>
            <div className={styles.dataHolder}>
                {
                    props.funtionList && props.funtionList.length ? 
                    <ul className={styles.normalizeUL}>
                        {props.funtionList.map(el => <li>{el}</li>)}
                    </ul>
                    :
                    <p className={styles.nofunctionInfoData}>Function Data Not Available</p>
                }
            </div>
        </div>
    );
};

export default functionInfo;