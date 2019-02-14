import * as React from 'react';
import styles from './ViewHeader.module.scss';


export interface IViewHeader{
    itemIitle : string;
}

const viewHeader = (props : IViewHeader) => {
    return(
        <header className={styles.viewHeader}>
            <div className={styles.viewTtile}>{props.itemIitle}</div>
        </header>
    );
};

export default viewHeader;