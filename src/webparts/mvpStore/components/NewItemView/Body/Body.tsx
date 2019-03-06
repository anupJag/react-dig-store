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
    showFileUploadError: boolean;
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
    itemTitleonBlur: (event: any) => void;
    businessProblemOnBlur: (event: any) => void;
    countryDropDownOnChange: (item: IDropdownOption) => void;
    segmentOnChanged: (item: IDropdownOption) => void;
    descriptionOnBlur: (event: any) => void;
    featureOnBlur: (event: any) => void;
    statusDropDownChange: (item: IDropdownOption) => void;
    functionDropDownChange: (item: IDropdownOption) => void;
    othersForTechPlatformOnBlur: (event: any) => void;
    othersTechPlatformValue: string;
    othersDataSourceOnBlur: (event: any) => void;
    othersDataSourceValue: string;
    othersWhoCreatedSolutionOnBlur: (event: any) => void;
    othersWhoCreatedSolutionValue: string;
    demoOnBlur: (event: any) => void;
    demoErrorMessage : string;
    onMVPNumberOnBlur : (event : any) => void;
    errorMessage: string;
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
                        onBlur={props.itemTitleonBlur}
                    />
                </div>
                <div className={styles.Content}>
                    <Label className={styles.Label} required={true}>Business Problem</Label>
                    <TextField
                        className={styles.Input}
                        multiline={true}
                        rows={5}
                        description={"Explain what problem is this solution aiming to solve"}
                        onBlur={props.businessProblemOnBlur}
                    />
                </div>
                <div className={styles.Content} style={{paddingBottom : "10px"}}>
                    <Label className={styles.Label} required={true}>Screenshot</Label>
                    <div className={styles.Input}>
                        <Logo
                            imagePreviewUrl={props.imagePreviewUrl}
                            handleImageChange={props.handleImageChange.bind(this)}
                            showError={props.showFileUploadError}
                            errorMessage={props.errorMessage}
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
                            onChanged={props.countryDropDownOnChange}
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
                            onChanged={props.segmentOnChanged}
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
                        onBlur={props.descriptionOnBlur}
                    />
                </div>
                <div className={styles.Content}>
                    <Label className={styles.Label} required={true}>Features</Label>
                    <TextField
                        className={styles.Input}
                        multiline={true}
                        rows={5}
                        description={"Add Key Features in separate lines"}
                        onBlur={props.featureOnBlur}
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
                            onChanged={props.statusDropDownChange}
                        />
                    </div>
                </div>
                <div className={styles.Content}>
                    <Label className={styles.Label} required={true}>Function</Label>
                    <div className={styles.Input}>
                        <Dropdown
                            options={props.function}
                            multiSelect
                            placeHolder={"Select an Option"}
                            onChanged={props.functionDropDownChange}
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
                                onBlur={props.othersForTechPlatformOnBlur}
                                value={props.othersTechPlatformValue}
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
                                onBlur={props.othersDataSourceOnBlur}
                                value={props.othersDataSourceValue}
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
                                onBlur={props.othersWhoCreatedSolutionOnBlur}
                                value={props.othersWhoCreatedSolutionValue}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.Content}>
                    <Label className={styles.Label}>Demo</Label>
                    <TextField
                        placeholder={"Give your solution a Name"}
                        maxLength={255}
                        className={styles.Input}
                        description={"Add here a video of a demo of the solution. Upload video in Office 365 channel (you can access video channel at the following link https://team.effem.com/portals/hub/_layouts/15/PointPublishing.aspx?app=video&p=c&chid=2f3aa33d-a62e-46bd-946f-cbdbf516d107&s=0&t=pfb) and add embed code here. NOTE: you can upload max 1 video"}
                        onBlur={props.demoOnBlur}
                    />
                    {
                        props.demoErrorMessage ? 
                        <div>
                            {props.demoErrorMessage}
                        </div> : null
                    }
                </div>
                <div className={styles.Content} style={{ marginBottom: "10px" }}>
                    <Label className={styles.Label} required={false}>MVP Number</Label>
                    <TextField
                        placeholder={"Enter MVP Number"}
                        maxLength={255}
                        className={styles.Input}
                        description={"If you are creating this solutuon in partnership with Digital Foundations, please enter assigned MVP Number. This MVP number should have been provided at approval."}
                        onBlur={props.onMVPNumberOnBlur}
                    />
                </div>
            </div>
        </div>
    );
};


export default body;