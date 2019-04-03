import * as React from 'react';
import styles from './Demo.module.scss';

export interface IDemoProps{
    demoInfo : string;
}

const demo = (props : IDemoProps) => {

    const forceStyle : React.CSSProperties = props.demoInfo === "Demo not available" || props.demoInfo.indexOf("<iframe") < 0 ? {paddingTop : "0", color: "red"} : null;

    return(
        <div className={styles.demoInfo}>
            <div className={styles.demoInfoHeader}>Demo:</div>
            <div dangerouslySetInnerHTML={{__html : props.demoInfo}} className={styles.demoInner} style={forceStyle}></div>
        </div>
    );
};

export default demo;