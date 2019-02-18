import * as React from 'react';
import styles from './SolutionCreated.module.scss';

export interface ISolutionCreatedProps{
    solutionCreated : string[];
}

const solutionCreated = (props : ISolutionCreatedProps) => {
    return (
        <div className={styles.solutionCreatedInfo}>
            <div className={styles.solutionCreatedData}>Team Responsible for Solution Development</div>
            <div className={styles.dataHolder}>
                {
                    props.solutionCreated && props.solutionCreated.length > 0 ?
                    <ul className={styles.normalizeUL}>
                        {
                           props.solutionCreated.map(el => <li>{el}</li>) 
                        }
                    </ul>
                    :
                    <p className={styles.noSolutionCreatedData}>Solution Created Data Not Avaialble</p>
                }
            </div>
        </div>
    );
};

export default solutionCreated;