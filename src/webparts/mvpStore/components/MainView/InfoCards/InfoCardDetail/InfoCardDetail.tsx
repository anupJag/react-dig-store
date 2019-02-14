import * as React from 'react';
import {
    DocumentCard,
    DocumentCardActivity,
    DocumentCardPreview,
    DocumentCardTitle,
    IDocumentCardPreviewProps
} from 'office-ui-fabric-react/lib/DocumentCard';
import styles from './InfoCardDetail.module.scss';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';

export interface IInfoCardDetailsProps {
    backgroundUrl: string;
    onClickRefLink: () => void;
    projName: string;
    functions: string[];
}

const infoCardDetail = (props: IInfoCardDetailsProps) => {


    const backdropImage: React.CSSProperties = {
        background: `url('${props.backgroundUrl}') center top / cover no-repeat`
    };

    return (
        <DocumentCard className={styles.DocumentCard} onClick={props.onClickRefLink}>
            <div
                className={styles.ImageContainer}
            >
                <img src={props.backgroundUrl} className={styles.Image}/>
            </div>
            <div className={styles.DetailSection}>
                <div className={styles.Function}>
                    {
                        props.functions.map((el, index) => {
                            return (
                                <span key={index}>{el}{props.functions.length - 1 === index ? null : ","}</span>
                            );
                        })
                    }
                </div>
                <div className={styles.Name}>
                    {props.projName}
                </div>
            </div>
        </DocumentCard>
    );
};

export default infoCardDetail;
