import * as React from 'react';
import styles from './LogoInput.module.scss';

export interface ILogoInput {
    imagePreviewUrl: any;
    showError: boolean;
    handleImageChange: (event) => void;
    errorMessage: string;
}

const logoInput = (props: ILogoInput) => {

    let { imagePreviewUrl } = props;
    let imagePreview = null;
    if (imagePreviewUrl) {
        imagePreview = (<img src={imagePreviewUrl} className={styles.ImgClass} />);
    } else {
        imagePreview = (<div className={styles.PreviewText}></div>);
    }

    return (
        <div className={styles.PreviewComponent}>
            <div className={styles.ImgPreview}>
                {imagePreview}
            </div>
            <div className={styles.FileInputHandler}>
                <div className={styles.FileInputContainer}>
                    <label>+
                        <input className={styles.FileInput}
                            type="file"
                            onChange={props.handleImageChange} />
                    </label>
                </div>
                {
                    props.showError ?
                        <div className={styles.FileUploadError} >{props.errorMessage}</div>
                        :
                        null
                }
            </div>
        </div>
    );
};

export default logoInput;