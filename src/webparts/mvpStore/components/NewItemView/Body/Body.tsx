import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react/lib/Label';
import styles from './Body.module.scss';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { ComboBox, IComboBoxOption } from 'office-ui-fabric-react/lib/ComboBox';
import Logo from './Logo/LogoInput';


export interface IBodyProps {
    context: any;
    _getPeoplePickerItems: (items: any[]) => void;
    status: IDropdownOption[];
    function: IDropdownOption[];
    country: IDropdownOption[];
    segment: IDropdownOption[];
    technologyPlatform: IDropdownOption[];
    isTechnologyDisabled: boolean;
    onTechnologyPlatformDropDownChange: (item: IDropdownOption) => void;
    dataSource: IDropdownOption[];
    isDataSourceDisabled: boolean;
    onDataSourceDropDownChange: (item: IDropdownOption) => void;
    whoCreatedTheSolution: IDropdownOption[];
    isWhoCreatedTheSolutionDisabled: boolean;
    onWhoCreatedTheSolutionDropDownChange: (item: IDropdownOption) => void;
    handleImageChange: (event) => void;
    imagePreviewUrl: any;
}


const body = (props: IBodyProps) => {

    return (
        <div className={styles.Body}>
            <div className={styles.BodyContainer}>
                <div className={styles.Content}>
                    <Label className={styles.Label} required={true}>Solution Name</Label>
                    <TextField
                        placeholder={"Give your solution a Name"}
                        maxLength={255}
                        className={styles.Input}
                    />
                </div>
                <div className={styles.Content}>
                    <Label className={styles.Label} required={true}>Business Problem</Label>
                    <TextField
                        className={styles.Input}
                        multiline={true}
                        rows={5}
                        description={"Explain what problem is this solution aiming to solve"}
                    />
                </div>
                <div className={styles.Content}>
                    <Label className={styles.Label} required={true}>Screenshot</Label>
                    <div className={styles.Input}>
                        <Logo
                            imagePreviewUrl={props.imagePreviewUrl}
                            handleImageChange={props.handleImageChange.bind(this)}
                        />
                    </div>
                </div>
                <div className={styles.Content}>
                    <Label className={styles.Label} required={true}>Country</Label>
                    <div className={styles.Input}>
                        <Dropdown
                            options={props.country}
                            multiSelect
                            placeHolder={"Select an Option"}
                        />
                        <span style={{ color: "#666666", fontSize: "11px" }}>
                            Specify the country where the solution has been used
                        </span>
                    </div>
                </div>
                <div className={styles.Content}>
                    <Label className={styles.Label} required={true}>Segment</Label>
                    <div className={styles.Input}>
                        <Dropdown
                            options={props.segment}
                            multiSelect
                            placeHolder={"Select an Option"}
                        />
                        <span style={{ color: "#666666", fontSize: "11px" }}>
                            Specify the Segment where the solution has been used
                        </span>
                    </div>
                </div>
                <div className={styles.Content}>
                    <Label className={styles.Label} required={true}>Description</Label>
                    <TextField
                        className={styles.Input}
                        multiline={true}
                        rows={5}
                    />
                </div>
                <div className={styles.Content}>
                    <Label className={styles.Label} required={true}>Features</Label>
                    <TextField
                        className={styles.Input}
                        multiline={true}
                        rows={5}
                        description={"Add Key Features in separate lines"}
                    />
                </div>
                <div className={styles.Content}>
                    <Label className={styles.Label} required={true}>Product Owners</Label>
                    <div className={styles.InputPeoplePicker}>
                        <PeoplePicker
                            context={props.context}
                            titleText=""
                            personSelectionLimit={10}
                            selectedItems={props._getPeoplePickerItems}
                            showHiddenInUI={false}
                            principleTypes={[PrincipalType.User]}
                            suggestionsLimit={5}
                        />
                        <span style={{ color: "#666666", fontSize: "11px" }}>
                            This is the person responsible for the solution. Start typing the surname and the name should pull up from Mars Directory
                        </span>
                    </div>
                </div>
                <div className={styles.Content}>
                    <Label className={styles.Label} required={true}>Status</Label>
                    <div className={styles.Input}>
                        <Dropdown
                            options={props.status}
                            placeHolder={"Select an Option"}
                        />
                    </div>
                </div>
                <div className={styles.Content}>
                    <Label className={styles.Label} required={true}>Funtion</Label>
                    <div className={styles.Input}>
                        <Dropdown
                            options={props.function}
                            multiSelect
                            placeHolder={"Select an Option"}
                        />
                        <span style={{ color: "#666666", fontSize: "11px" }}>
                            This is the function where the solution is being used. Select from the dropdown list(multiple selection available)
                        </span>
                    </div>
                </div>
                <div className={styles.Content}>
                    <Label className={styles.Label} required={true}>Technology Platform(s)</Label>
                    <div className={styles.Input}>
                        <Dropdown
                            options={props.technologyPlatform}
                            multiSelect
                            placeHolder={"Select an Option"}
                            onChanged={props.onTechnologyPlatformDropDownChange}
                        />
                        <span style={{ color: "#666666", fontSize: "11px" }}>
                            Specify the technology platform on which the solution is built and/or specifying others if data source system is not in drop-down list.
                        </span>
                        <div className={styles.isActive}>
                            <TextField
                                placeholder={"Specify your technology platform"}
                                disabled={!props.isTechnologyDisabled}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.Content}>
                    <Label className={styles.Label} required={true}>Data Source(s)</Label>
                    <div className={styles.Input}>
                        <Dropdown
                            options={props.dataSource}
                            multiSelect
                            placeHolder={"Select an Option"}
                            onChanged={props.onDataSourceDropDownChange}
                        />
                        <span style={{ color: "#666666", fontSize: "11px" }}>
                            Specify the data sources the solution uses by using the dropdown and/or specifying others by typing in directly in the text box if data source system is not in drop-down list.
                        </span>
                        <div className={styles.isActive}>
                            <TextField
                                placeholder={"Specify your Data Source"}
                                disabled={!props.isDataSourceDisabled}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.Content}>
                    <Label className={styles.Label} required={true}>Who created the solution?</Label>
                    <div className={styles.Input}>
                        <Dropdown
                            options={props.whoCreatedTheSolution}
                            multiSelect
                            placeHolder={"Select an Option"}
                            onChanged={props.onWhoCreatedTheSolutionDropDownChange}
                        />
                        <span style={{ color: "#666666", fontSize: "11px" }}>
                            Please specify which team is developing the solution for you or if you are creating the solution yourself. Type in the team name if you cannot find it in the list.
                        </span>
                        <div className={styles.isActive}>
                            <TextField
                                placeholder={"Specify your solution"}
                                disabled={!props.isWhoCreatedTheSolutionDisabled}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.Content}>
                    <Label className={styles.Label} required={true}>Demo</Label>
                    <TextField
                        placeholder={"Give your solution a Name"}
                        maxLength={255}
                        className={styles.Input}
                    />
                </div>
            </div>
        </div>
    );
};


export default body;