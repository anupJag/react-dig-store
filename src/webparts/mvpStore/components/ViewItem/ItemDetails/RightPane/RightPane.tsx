import * as React from 'react';
import ImageHolder from './ImageHolder/ImageHolder';
import BusinessProblemInfo from './BusinessProblem/BusinessProblem';
import Features from './Features/Features';
import Countries from './Countries/Countries';
import DescriptionInfo from './Description/Description';
import TechUsed from './TechUsed/TechUsed';
import DataSource from './DataSources/DataSources';
import Demo from './Demo/Demo';
import styles from './RightPane.module.scss';

export interface IRightPane {
    baseClassApply: string;
    imgURL: string;
    altString: string;
    businessProblemInfo: string;
    featuresInfo: string;
    countriesList: string[];
    descriptionInfo: string;
    techUsedInfo: string[];
    dataSourceUsed: string[];
    demoInfo: string;
}


const rightPane = (props: IRightPane) => {
    return (
        <div className={props.baseClassApply}>
            <ImageHolder
                imgURL={props.imgURL}
                altString={props.altString}
            />
            <DescriptionInfo
                description={props.descriptionInfo}
            />
            <BusinessProblemInfo
                businessProblemInfo={props.businessProblemInfo}
            />
            <Features
                featuresInfo={props.featuresInfo}
            />
            <Countries
                countriesList={props.countriesList}
            />
            <div className={styles.infoHolder}>
                <div className={styles.techHolder}>
                    <TechUsed
                        techUsedInfo={props.techUsedInfo}
                    />
                </div>
                <div className={styles.dataSourceHolder}>
                    <DataSource
                        dataSourcesUsed={props.dataSourceUsed}
                    />
                </div>
            </div>
            <Demo 
                demoInfo={props.demoInfo}
            />
        </div>
    );
};

export default rightPane;