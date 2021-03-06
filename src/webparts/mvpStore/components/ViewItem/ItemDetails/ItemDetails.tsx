import * as React from 'react';
import LeftPane from './LeftPane/LeftPane';
import RightPane from './RightPane/RightPane';
import styles from './ItemDetails.module.scss';
import { IUserInfo } from '../IViewItem';

export interface IItemDetailsProps{
    contributorDataInfo : IUserInfo;
    productOwnerDataInfo : IUserInfo[];
    segmentInfo : string[];
    statusInfo: string;
    solutionCreatedInfo : string[];
    imgURL: string;
    altString: string;
    businessProblemInfo : string;
    featuresInfo : string;
    countriesList : string[];
    descriptionInfo : string;
    functionListInfo : string[];
    techUsedInfo : string[];
    dataSourceUsed: string[];
    mvpNumber: string;
    demoInfo: string;
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
                statusInfo={props.statusInfo}
                solutionCreatedInfo={props.solutionCreatedInfo}
                functionInfoList={props.functionListInfo}
                mvpNumber={props.mvpNumber}
            />
            <RightPane 
                baseClassApply={styles.itemDetailsRightPane} 
                altString={props.altString}
                imgURL={props.imgURL}
                businessProblemInfo={props.businessProblemInfo}
                featuresInfo={props.featuresInfo}
                countriesList={props.countriesList}
                descriptionInfo={props.descriptionInfo}
                techUsedInfo={props.techUsedInfo}
                dataSourceUsed={props.dataSourceUsed}
                demoInfo={props.demoInfo}
            />
        </div>
    );
};

export default itemDetails;