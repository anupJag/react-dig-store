import * as React from 'react';
import Persona from '../UIElements/Persona';
import styles from './ProductOwnerData.module.scss';
import { IUserInfo } from '../../../IViewItem';

export interface IProductOwnerDataProps {
    productOwnerInfo: IUserInfo[];
}

const productOwnerData = (props : IProductOwnerDataProps) => {
    return (
        <div className={styles.productOnwerDataInfo}>
            <div className={styles.productOwnerData}>Product Owner(s):</div>
                {
                    props.productOwnerInfo && props.productOwnerInfo.length > 0 ? 
                    props.productOwnerInfo.map((el, index) => 
                    <Persona 
                        key={index} 
                        imgURL={el.imgURL} 
                        text={el.text}
                    />)
                    :
                    <p className={styles.noProdOnwerData}>Product Owner Data not available</p>
                }
        </div>
    );
};

export default productOwnerData;