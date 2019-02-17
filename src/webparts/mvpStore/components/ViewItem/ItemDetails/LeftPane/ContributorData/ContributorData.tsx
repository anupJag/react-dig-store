import * as React from 'react';
import Persona from '../UIElements/Persona';
import { IUserInfo } from '../../../IViewItem';
import styles from './ContributorData.module.scss';

export interface IContributorDataProps {
    userDetails: IUserInfo;
}

const contributorData = (props : IContributorDataProps) => {
    return (
        <div className={styles.contributorHolder}>
            <div className={styles.contributorName}>Contributor:</div>
            <Persona
                imgURL={props.userDetails.imgURL}
                text={props.userDetails.text}
            />
        </div>
    );
};

export default contributorData;