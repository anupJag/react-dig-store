import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import Header from './Header/Header';
import styles from './FilterView.module.scss';

export interface IFilterViewProps {
    choiceOnChange: (ev: React.FormEvent<HTMLInputElement>, option: any) => void;
    choices: IChoiceGroupOption[];
    iconName: string;
}

const filterView = (props: IFilterViewProps) => {
    return (
        <div className={styles.FilterView}>
            <Header 
                iconName={props.iconName}
            />
            <ChoiceGroup
                options={props.choices}
                onChange={props.choiceOnChange}
                defaultSelectedKey="All Categories"
            />
        </div>
    );
};

export default filterView;