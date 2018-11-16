import * as React from 'react';
import styles from './Header.module.scss';

const header = (props) => {
    return(
        <div className={styles.HeadComponent}>
            <header className={styles.Header}>
                <div className={styles.Category}>Category: ALL</div>
                <div className={styles.Post}>All Posts</div>
            </header>
        </div>
    );
};

export default header;
