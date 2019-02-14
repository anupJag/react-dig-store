import * as React from 'react';
import InfoCardDetails from './InfoCardDetail/InfoCardDetail';
import styles from './InfoCards.module.scss';
import { IMVPStoreData } from '../../IMvpStoreProps';

export interface IInfoCardsProps {
    CardsData: IMVPStoreData[];
    onCardClicked : (value : number | string) => void;
}

const infoCards = (props: IInfoCardsProps) => {
    return (
        <div className={styles.InfoCards}>
            {
                props.CardsData.map(el => 
                    <InfoCardDetails 
                        backgroundUrl={el.Images}
                        functions={el.Target_x0020_User_x0020_Group}
                        onClickRefLink={props.onCardClicked.bind(this, el.Id)}
                        projName={el.Title}
                    />    
                )
            }
        </div>
    );
};

export default infoCards;