import * as React from 'react';
import Header from './Header/Header';
import styles from './MainView.module.scss';
import InfoCards from './InfoCards/InfoCards';
import { IMVPStoreData } from '../IMvpStoreProps';

export interface IMainViewProps {
    CategoryType: string;
    CardsData: IMVPStoreData[];
    PostCount: any;
    onAddButtonClick:() => void;
    onCardClicked: () => void; 
}

const mainView = (props: IMainViewProps) => {
    return (
        <div className={styles.MainView}>
            <Header
                CategoryType={props.CategoryType}
                PostCount={props.PostCount}
                onAddButtonClick={props.onAddButtonClick.bind(this)}
            />
            <InfoCards 
                CardsData={props.CardsData}
                onCardClicked={props.onCardClicked}
            />
        </div>
    );
};

export default mainView;