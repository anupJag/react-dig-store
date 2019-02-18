import * as React from 'react';
import LeftPane from './LeftPane/LeftPane';
import RightPane from './RightPane/RightPane';
import styles from './ItemDetails.module.scss';
import { IUserInfo } from '../IViewItem';

export interface IItemDetailsProps{
    contributorDataInfo : IUserInfo;
    productOwnerDataInfo : IUserInfo[];
    segmentInfo : string[];
    descriptionInfo: string;
    statusInfo: string;
    solutionCreatedInfo : string[];
    imgURL: string;
    altString: string;
    businessProblemInfo : string;
    featuresInfo : string;
}


const itemDetails = (props : IItemDetailsProps) => {
    return (
        <div className={styles.itemDetailsContainer}>
            {/* Main Container */}
            <LeftPane
                baseClassApply={styles.itemDetailsLeftPane}
                userDetails={props.contributorDataInfo}
                productOwnerInfo={props.productOwnerDataInfo}
                segmentInfo={props.segmentInfo}
                descriptionInfo={props.descriptionInfo}
                statusInfo={props.statusInfo}
                solutionCreatedInfo={props.solutionCreatedInfo}
            />
            <RightPane 
                baseClassApply={styles.itemDetailsRightPane} 
                altString={props.altString}
                imgURL={props.imgURL}
                businessProblemInfo={props.businessProblemInfo}
                featuresInfo={props.featuresInfo}
            />
        </div>
    );
};

export default itemDetails;