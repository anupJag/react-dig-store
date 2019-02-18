import * as React from 'react';
import ContributorData from './ContributorData/ContributorData';
import { IUserInfo } from '../../IViewItem';
import styles from './LeftPane.module.scss';
import ProductOwnerInfo from './ProductOwnerData/ProductOwnerData';
import SegmentInfo from './SegmentInfo/SegmentInfo';
import StatusInfo from './Status/Status';
import SolutionCreatedInfo from './SolutionCreated/SolutionCreated';
import FunctionInfo from './FunctionInfo/FunctionInfo';
import MVPNumber from './MVPNumber/MVPNumber';

export interface ILeftPaneProps {
    baseClassApply: string;
    userDetails: IUserInfo;
    productOwnerInfo : IUserInfo[];
    segmentInfo : string[];
    statusInfo: string;
    solutionCreatedInfo : string[];
    functionInfoList : string[];
    mvpNumber: string;
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
                <MVPNumber 
                    mvpNumber={props.mvpNumber}
                />
                <FunctionInfo 
                    funtionList={props.functionInfoList}
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