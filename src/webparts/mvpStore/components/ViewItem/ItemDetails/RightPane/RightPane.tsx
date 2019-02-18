import * as React from 'react';
import ImageHolder from './ImageHolder/ImageHolder';
import BusinessProblemInfo from './BusinessProblem/BusinessProblem';
import Features from './Features/Features';

export interface IRightPane {
    baseClassApply: string;
    imgURL: string;
    altString: string;
    businessProblemInfo : string;
    featuresInfo : string;
}


const rightPane = (props: IRightPane) => {
    return (
        <div className={props.baseClassApply}>
            <ImageHolder
                imgURL={props.imgURL}
                altString={props.altString}
            />
            <BusinessProblemInfo 
                businessProblemInfo={props.businessProblemInfo}
            />
            <Features 
                featuresInfo={props.featuresInfo}
            />
        </div>
    );
};

export default rightPane;