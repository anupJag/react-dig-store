import * as React from 'react';
import Header from './Header/Header';
import styles from './MainView.module.scss';
import InfoCards from './InfoCards/InfoCards';
import { IMVPStoreData } from '../IMvpStoreProps';

export interface IMainViewProps {
    CategoryType: string;
    CardsData: IMVPStoreData[];
    PostCount: any;
}

const mainView = (props: IMainViewProps) => {
    return (
        <div className={styles.MainView}>
            <Header
                CategoryType={props.CategoryType}
                PostCount={props.PostCount}
            />
            <InfoCards 
                CardsData={props.CardsData}
            />
        </div>
    );
};

export default mainView;