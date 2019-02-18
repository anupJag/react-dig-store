import * as React from 'react';
import Chips from '../../CommonUIElements/Chips/Chips';
import styles from './DataSources.module.scss';

export interface IDataSourceProps {
    dataSourcesUsed: string[];
}


const dataSourceUsed = (props: IDataSourceProps) => {
    return (
        <div className={styles.dataSourceInfo}>
            <div className={styles.dataSourceData}>Data Source(s) the solution uses</div>
            {
                props.dataSourcesUsed && props.dataSourcesUsed.length > 0 ?
                    props.dataSourcesUsed.map(el => <Chips title={el} />)
                    :
                    <p className={styles.noDataSourceData}>Data Source Information not available</p>
            }
        </div>
    );
};

export default dataSourceUsed;