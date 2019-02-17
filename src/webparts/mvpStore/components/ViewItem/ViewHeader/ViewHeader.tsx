import * as React from 'react';
import styles from './ViewHeader.module.scss';


export interface IViewHeader{
    itemIitle : string;
}

const viewHeader = (props : IViewHeader) => {

    const controlCSS : React.CSSProperties = props.itemIitle.length > 47 ? {
        fontSize: "1.5em",
        lineHeight: 3
    } : null;

    return(
        <header className={styles.viewHeader}>
            <div className={styles.viewTtile} style={controlCSS}>{props.itemIitle}</div>
        </header>
    );
};

export default viewHeader;