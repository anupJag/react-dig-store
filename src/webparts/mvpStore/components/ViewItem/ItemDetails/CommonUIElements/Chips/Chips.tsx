import * as React from 'react';
import styles from './Chips.module.scss';


export interface IChipProps{
    title : string;
}

const chips = (props : IChipProps) => {
    return(
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                {props.title}
            </div>
        </div>
    );  
};

export default chips;