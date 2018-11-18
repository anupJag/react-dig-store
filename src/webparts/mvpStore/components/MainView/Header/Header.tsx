import * as React from 'react';
import styles from './Header.module.scss';
import { ActionButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export interface IHeaderProps {
    CategoryType: string;
    PostCount: any;
    onAddButtonClick:() => void;
}

const header = (props: IHeaderProps) => {
    return (
        <div className={styles.HeadComponent}>
            <header className={styles.Header}>
                <div className={styles.SubContainer}>
                    <div className={styles.Category}>Category: {props.CategoryType}</div>
                    <ActionButton
                        iconProps={{ iconName: 'Add' }}
                        data-automation-id="Add your own solution to Digital Store"
                        styles={
                            {
                                root: {
                                    alignSelf: "center",
                                    marginBottom: "2px"
                                }
                            }
                        }
                        onClick={props.onAddButtonClick}
                    >Add</ActionButton>
                </div>
                <div className={styles.Post}>{props.PostCount} Posts</div>
            </header>
        </div>
    );
};

export default header;
