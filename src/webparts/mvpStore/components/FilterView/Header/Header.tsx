import * as React from 'react';
import { Icon, IIconStyles } from 'office-ui-fabric-react/lib/Icon';
import styles from './Header.module.scss';

export interface IHeaderProps {
    iconName: string;
}

const header = (props : IHeaderProps) => {
    const iconStyles: IIconStyles = {
        root: {
            lineHeight: "20px"
        }
    };

    return (
        <header className={styles.HeadComponent}>
            <Icon
                iconName={props.iconName}
                ariaLabel={"Filter"}
                styles={iconStyles}
            />
            <div className={styles.CategoryDiv}>
                Categories
              </div>
        </header>
    );
};

export default header;
