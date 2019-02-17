import * as React from 'react';
import ContributorData from './ContributorData/ContributorData';
import { IUserInfo } from '../../IViewItem';
import styles from './LeftPane.module.scss';
import ProductOwnerInfo from './ProductOwnerData/ProductOwnerData';
import SegmentInfo from './SegmentInfo/SegmentInfo';
import DescriptionInfo from './Description/Description';
import StatusInfo from './Status/Status';
import SolutionCreatedInfo from './SolutionCreated/SolutionCreated';

export interface ILeftPaneProps {
    baseClassApply: string;
    userDetails: IUserInfo;
    productOwnerInfo : IUserInfo[];
    segmentInfo : string[];
    descriptionInfo: string;
    statusInfo: string;
    solutionCreatedInfo : string[];
}


const leftPane = (props: ILeftPaneProps) => {
    return (
        <div className={props.baseClassApply}>
            <div className={styles.leftPaneInfoHolder}>
                <ContributorData
                    userDetails={props.userDetails}
                />
                <ProductOwnerInfo 
                    productOwnerInfo={props.productOwnerInfo}
                />
                <SegmentInfo 
                    segmentInfo={props.segmentInfo}
                />
                <DescriptionInfo 
                    description={props.descriptionInfo}
                />
                <StatusInfo 
                    statusInfo={props.statusInfo}
                />
                <SolutionCreatedInfo 
                    solutionCreated={props.solutionCreatedInfo}
                />
            </div>
        </div>
    );
};

export default leftPane;