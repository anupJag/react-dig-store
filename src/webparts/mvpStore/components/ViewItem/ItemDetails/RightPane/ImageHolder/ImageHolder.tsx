import * as React from 'react';
import styles from './ImageHolder.module.scss';

export interface IImageHolderProps {
    imgURL: string;
    altString: string;
}

const imageHolder = (props: IImageHolderProps) => {
    return (
        <div className={styles.imageHolderContainer}>
            <a href={props.imgURL} target="_blank" className={styles.anchorHolder}>
                <img src={props.imgURL} alt={props.altString} className={styles.image}/>
            </a>
        </div>
    );
};

export default imageHolder;