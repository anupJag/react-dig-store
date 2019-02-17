import * as React from 'react';
import styles from './SolutionCreated.module.scss';

export interface ISolutionCreatedProps{
    solutionCreated : string[];
}

const solutionCreated = (props : ISolutionCreatedProps) => {
    return (
        <div className={styles.solutionCreatedInfo}>
            <div className={styles.solutionCreatedData}>Team Responsible for Solution Development</div>
            <ul className={styles.normalizeUL}>
                {
                    props.solutionCreated && props.solutionCreated.length > 0 ?
                    props.solutionCreated.map(el => <li>{el}</li>)
                    :
                    <p className={styles.nosolutionCreatedData}>Solution Created Data Not Avaialble</p>
                }
            </ul>
        </div>
    );
};

export default solutionCreated;