import * as React from 'react';
import styles from './Description.module.scss';


export interface IDescriptionProps{
    description : string;
}

const description = (props : IDescriptionProps) => {

    const forceStyle : React.CSSProperties = props.description === "Description Not Available" ? { color : "red"} : null;

    return(
        <div className={styles.descriptionInfo}>
            <div className={styles.descriptionInfoHeader}>Description:</div>
            <div dangerouslySetInnerHTML={{__html : props.description}} className={styles.descriptionInner}style={forceStyle}></div>
        </div>
    );
};

export default description;