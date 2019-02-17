import * as React from 'react';
import styles from './Description.module.scss';


export interface IDescriptionProps{
    description : string;
}

const description = (props : IDescriptionProps) => {
    return(
        <div className={styles.descriptionInfo}>
            <div className={styles.descriptionInfoHeader}>Description:</div>
            <div dangerouslySetInnerHTML={{__html : props.description}} className={styles.descriptionInner}></div>
        </div>
    );
};

export default description;