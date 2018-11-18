import * as React from 'react';
import styles from './Header.module.scss';

export interface IHeaderProps {
    CategoryType: string;
    PostCount: any;
}

const header = (props: IHeaderProps) => {
    return (
        <div className={styles.HeadComponent}>
            <header className={styles.Header}>
                <div className={styles.Category}>Category: {props.CategoryType}</div>
                <div className={styles.Post}>{props.PostCount} Posts</div>
            </header>
        </div>
    );
};

export default header;
