import * as React from 'react';
import { Dialog, DialogFooter, DialogType, IDialogProps, IDialogStyles } from 'office-ui-fabric-react/lib/Dialog';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import FormBody from './Body/Body';
import { escape, uniq, findIndex } from '@microsoft/sp-lodash-subset';
import styles from './NewItem.module.scss';
import pnp, { Web } from 'sp-pnp-js';
import { FieldName } from '../IMvpStoreProps';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { IComboBoxOption } from 'office-ui-fabric-react/lib/ComboBox';
import { INewItemProps, INewItemState, INewItemData, IMultiData } from './INewItem';


export default class NewItem extends React.Component<INewItemProps, INewItemState>{

    private _others: string = "Others";

    /**
     * Default constructor
     */
    constructor(props: INewItemProps) {
        super(props);
        this.state = {
            Status: [],
            TechnologyPlatform: [],
            DataSource: [],
            Segment: [],
            WhoCreatedTheSolution: [],
            Country: [],
            Function: [],
            showSpinner: true,
            isTechnologyDisabled: false,
            isDataSourceDisabled: false,
            isWhoCreatedTheSolutionDisabled: false,
            file: '',
            imagePreviewUrl: '',
            newItemData: undefined
        };
    }

    public componentDidMount() {
        this.getAllChoiceFieldData().then(() => {
            this.setState({
                showSpinner: false
            });
        });
    }

    protected getAllChoiceFieldData = async () => {
        let batch = pnp.sp.createBatch();

        pnp.sp.web.lists.getById(this.props.listGUID).fields.getByInternalNameOrTitle(FieldName.Status).select('Choices').usingCaching({
            expiration: pnp.util.dateAdd(new Date, "minute", 60),
            key: `${this.props.listGUID}_${FieldName.Status}`,
            storeName: "local"
        }).configure({
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'odata-version': ''
            }
        }).inBatch(batch).get().then(async p => {
            let tempStatus: IDropdownOption[] = [];

            if (p) {
                if (p["Choices"] && p["Choices"].length > 0) {
                    p["Choices"].forEach(element => {
                        tempStatus.push({
                            text: element,
                            key: element
                        });
                    });
                }
            }

            await this.setState({
                Status: tempStatus
            });
        });

        pnp.sp.web.lists.getById(this.props.listGUID).fields.getByInternalNameOrTitle(FieldName.TechnologyPlatform).select('Choices').usingCaching({
            expiration: pnp.util.dateAdd(new Date, "minute", 60),
            key: `${this.props.listGUID}_${FieldName.TechnologyPlatform}`,
            storeName: "local"
        }).configure({
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'odata-version': ''
            }
        }).inBatch(batch).get().then(async p => {
            let tempTechnologyPlatform: IDropdownOption[] = [];

            if (p) {
                if (p["Choices"] && p["Choices"].length > 0) {
                    p["Choices"].forEach(element => {
                        tempTechnologyPlatform.push({
                            text: element,
                            key: element,
                        });
                    });
                }
            }

            tempTechnologyPlatform.push({
                key: this._others,
                text: this._others
            });

            await this.setState({
                TechnologyPlatform: tempTechnologyPlatform
            });
        });

        pnp.sp.web.lists.getById(this.props.listGUID).fields.getByInternalNameOrTitle(FieldName.DataSource).select('Choices').usingCaching({
            expiration: pnp.util.dateAdd(new Date, "minute", 60),
            key: `${this.props.listGUID}_${FieldName.DataSource}`,
            storeName: "local"
        }).configure({
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'odata-version': ''
            }
        }).inBatch(batch).get().then(async p => {
            let tempDataSources: IDropdownOption[] = [];

            if (p) {
                if (p["Choices"] && p["Choices"].length > 0) {
                    p["Choices"].forEach(element => {
                        tempDataSources.push({
                            text: element,
                            key: element
                        });
                    });
                }
            }

            tempDataSources.push({
                key: this._others,
                text: this._others
            });

            await this.setState({
                DataSource: tempDataSources
            });
        });

        pnp.sp.web.lists.getById(this.props.listGUID).fields.getByInternalNameOrTitle(FieldName.Function).select('Choices').usingCaching({
            expiration: pnp.util.dateAdd(new Date, "minute", 60),
            key: `${this.props.listGUID}_${FieldName.Function}`,
            storeName: "local"
        }).configure({
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'odata-version': ''
            }
        }).inBatch(batch).get().then(async p => {
            let tempFunction: IDropdownOption[] = [];

            if (p) {
                if (p["Choices"] && p["Choices"].length > 0) {
                    p["Choices"].forEach(element => {
                        tempFunction.push({
                            text: element,
                            key: element
                        });
                    });
                }
            }

            await this.setState({
                Function: tempFunction
            });
        });

        pnp.sp.web.lists.getById(this.props.listGUID).fields.getByInternalNameOrTitle(FieldName.Segment).select('Choices').usingCaching({
            expiration: pnp.util.dateAdd(new Date, "minute", 60),
            key: `${this.props.listGUID}_${FieldName.Segment}`,
            storeName: "local"
        }).configure({
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'odata-version': ''
            }
        }).inBatch(batch).get().then(async p => {
            let tempSegment: IDropdownOption[] = [];

            if (p) {
                if (p["Choices"] && p["Choices"].length > 0) {
                    p["Choices"].forEach(element => {
                        tempSegment.push({
                            text: element,
                            key: element
                        });
                    });
                }
            }

            await this.setState({
                Segment: tempSegment
            });
        });

        pnp.sp.web.lists.getById(this.props.listGUID).fields.getByInternalNameOrTitle(FieldName.WhoCreatedTheSolution).select('Choices').usingCaching({
            expiration: pnp.util.dateAdd(new Date, "minute", 60),
            key: `${this.props.listGUID}_${FieldName.WhoCreatedTheSolution}`,
            storeName: "local"
        }).configure({
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'odata-version': ''
            }
        }).inBatch(batch).get().then(async p => {
            let tempWhoCreatedTheSolution: IDropdownOption[] = [];

            if (p) {
                if (p["Choices"] && p["Choices"].length > 0) {
                    p["Choices"].forEach(element => {
                        tempWhoCreatedTheSolution.push({
                            text: element,
                            key: element
                        });
                    });
                }
            }

            tempWhoCreatedTheSolution.push({
                key: this._others,
                text: this._others
            });

            await this.setState({
                WhoCreatedTheSolution: tempWhoCreatedTheSolution
            });
        });

        pnp.sp.web.lists.getById("ba17d122-aa4d-4408-b439-53e20c24af64").items.select('Title', 'Id').usingCaching({
            expiration: pnp.util.dateAdd(new Date, "minute", 60),
            key: `ba17d122-aa4d-4408-b439-53e20c24af64`,
            storeName: "local"
        }).configure({
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'odata-version': ''
            }
        }).inBatch(batch).get().then(async p => {
            let tempCountry: IDropdownOption[] = [];

            if (p) {
                p.forEach(element => {
                    tempCountry.push({
                        text: element["Title"],
                        key: element["Id"]
                    });
                });
            }

            await this.setState({
                Country: tempCountry
            });
        });

        batch.execute().then(() => console.log("All done!"));

    }

    private getDialogStyles = (): IDialogStyles => {
        return {
            root: {

            },
            main: {
                height: "80vh",
                minWidth: "60vw !important"
            }
        };
    }

    private _getPeoplePickerItemsHandler(items: any[]) {
        console.log('Items:', items);
    }

    private handleImageChangeHandler = (event): void => {
        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file);
    }

    protected onTechnologyPlatformChangeHandler = (item: IDropdownOption) => {
        let tempItemData: INewItemData = { ...this.state.newItemData };
        let tempTechnologyPlatform: string[];

        if (tempItemData) {
            tempTechnologyPlatform = (tempItemData[FieldName.TechnologyPlatform] ? tempItemData[FieldName.TechnologyPlatform] : []);
        }
        else {
            tempTechnologyPlatform = [];
        }

        if (item.selected) {
            if (item.key === this._others) {
                tempTechnologyPlatform.push(`${item.key as string}#$*`);
            }
            else {
                tempTechnologyPlatform.push(item.key as string);
            }

        }
        else {
            if (item.key === this._others) {
                tempTechnologyPlatform.splice(findIndex(tempTechnologyPlatform, el => el.toLowerCase().indexOf('#$*'.toLowerCase()) > 0));
            }
            else {
                tempTechnologyPlatform.splice(findIndex(tempTechnologyPlatform, el => el === item.key as string), 1);
            }
        }

        tempItemData[FieldName.TechnologyPlatform] = tempTechnologyPlatform;


        if (item.key === this._others) {
            this.setState({
                isTechnologyDisabled: true,
                newItemData: tempItemData
            });
        }
        else {
            this.setState({
                newItemData: tempItemData
            });
        }

    }

    protected onDataSourceChangeHandler = (item: IDropdownOption) => {
        if (item.key === this._others) {
            this.setState({
                isDataSourceDisabled: true
            });
        }
    }

    protected onWhoCreatedTheSolutionChangeHandler = (item: IDropdownOption) => {
        if (item.key === this._others) {
            this.setState({
                isWhoCreatedTheSolutionDisabled: true
            });
        }
    }

    protected onItemTitleBlurHandler = (event: any) => {
        let itemData: INewItemData = { ...this.state.newItemData };
        const tempItemTitle = escape(event.target.value).trim();
        itemData[FieldName.SolutionName] = tempItemTitle;
        this.setState({
            newItemData: itemData
        });
    }

    protected onBusinessProblemBlurHandler = (event: any) => {
        let itemData: INewItemData = { ...this.state.newItemData };
        const tempItemTitle = escape(event.target.value).trim();
        itemData[FieldName.BusinessProblem] = tempItemTitle;
        this.setState({
            newItemData: itemData
        });
    }

    protected onCountryDropDownChangeHandler = (item: IDropdownOption): void => {
        let tempItemData: INewItemData = { ...this.state.newItemData };
        let countrySelectedData: IMultiData = tempItemData["CountryId"];
        let resultSet: any[];

        if (countrySelectedData) {
            resultSet = (countrySelectedData["results"] ? countrySelectedData["results"] : []);
        }
        else {
            resultSet = [];
        }

        if (item.selected) {
            resultSet.push(parseInt(item.key as string, 0));
        }
        else {
            let findItem = findIndex(resultSet, el => el === parseInt(item.key as string, 0));
            resultSet.splice(findItem, 1);
        }

        countrySelectedData = { results: [...resultSet] };

        tempItemData["CountryId"] = countrySelectedData;

        this.setState({
            newItemData: tempItemData
        });


    }

    protected onSegmentDropDownChangedHandler = (item: IDropdownOption): void => {
        let tempItemData: INewItemData = { ...this.state.newItemData };
        let tempSegments: string[];

        if (tempItemData) {
            tempSegments = (tempItemData[FieldName.Segment] ? tempItemData[FieldName.Segment] : []);
        }
        else {
            tempSegments = [];
        }

        if (item.selected) {
            tempSegments.push(item.key as string);
        }
        else {
            tempSegments.splice(findIndex(tempSegments, el => el === item.key as string), 1);
        }

        tempItemData[FieldName.Segment] = tempSegments;

        this.setState({
            newItemData: tempItemData
        });
    }

    protected onDescriptionBlurHandler = (event: any) => {
        let itemData: INewItemData = { ...this.state.newItemData };
        const tempDescription = escape(event.target.value).trim();
        itemData[FieldName.Description] = tempDescription;
        this.setState({
            newItemData: itemData
        });
    }

    protected onFeatureBlurHandler = (event: any) => {
        let itemData: INewItemData = { ...this.state.newItemData };
        const tempFeature = escape(event.target.value).trim();
        itemData[FieldName.Features] = tempFeature;
        this.setState({
            newItemData: itemData
        });
    }

    protected onStatusDropDownChangeHandler = (item: IDropdownOption): void => {
        let itemData: INewItemData = { ...this.state.newItemData };
        itemData[FieldName.Status] = item.key as string;

        this.setState({
            newItemData: itemData
        });
    }

    protected onFunctionDropDownChangeHandler = (item: IDropdownOption): void => {
        let tempItemData: INewItemData = { ...this.state.newItemData };
        let tempFunction: string[];

        if (tempItemData) {
            tempFunction = (tempItemData[FieldName.Function] ? tempItemData[FieldName.Function] : []);
        }
        else {
            tempFunction = [];
        }

        if (item.selected) {
            tempFunction.push(item.key as string);
        }
        else {
            tempFunction.splice(findIndex(tempFunction, el => el === item.key as string), 1);
        }

        tempItemData[FieldName.Function] = tempFunction;

        this.setState({
            newItemData: tempItemData
        });
    }

    protected othersForTechPlatformOnBlurHandler = (event : any) : void => {
        let tempDateEntered : string = escape(event.target.value).trim();
        let tempItemData: INewItemData = { ...this.state.newItemData };

        let tempTechnologyPlatform: string[];

        if (tempItemData) {
            tempTechnologyPlatform = (tempItemData[FieldName.TechnologyPlatform] ? tempItemData[FieldName.TechnologyPlatform] : []);
        }

        let index = findIndex(tempTechnologyPlatform, el => el.toLowerCase().indexOf("#$*") >= 0);

        if(index >= 0){
            tempTechnologyPlatform[index] = `${tempDateEntered}#$*`;
        }

        tempItemData[FieldName.TechnologyPlatform] = tempTechnologyPlatform;

        this.setState({
            newItemData : tempItemData
        });

    }

    public render(): React.ReactElement<INewItemProps> {

        return (
            <Dialog
                hidden={this.props.hideDialog}
                onDismiss={this.props.onDismissCalled}
                dialogContentProps={
                    {
                        type: DialogType.largeHeader,
                        title: "Add new solution to Digital Store",
                    }
                }
                getStyles={this.getDialogStyles}
            >
                <div>
                    <FormBody
                        context={this.props.context}
                        _getPeoplePickerItems={this._getPeoplePickerItemsHandler.bind(this)}
                        status={this.state.Status && this.state.Status.length > 0 ? this.state.Status : []}
                        function={this.state.Function && this.state.Function.length > 0 ? this.state.Function : []}
                        country={this.state.Country && this.state.Country.length > 0 ? this.state.Country : []}
                        segment={this.state.Segment && this.state.Segment.length > 0 ? this.state.Segment : []}
                        technologyPlatform={this.state.TechnologyPlatform && this.state.TechnologyPlatform.length > 0 ? this.state.TechnologyPlatform : []}
                        isTechnologyDisabled={this.state.isTechnologyDisabled}
                        onTechnologyPlatformDropDownChange={this.onTechnologyPlatformChangeHandler.bind(this)}
                        dataSource={this.state.DataSource && this.state.DataSource.length > 0 ? this.state.DataSource : []}
                        isDataSourceDisabled={this.state.isDataSourceDisabled}
                        onDataSourceDropDownChange={this.onDataSourceChangeHandler.bind(this)}
                        whoCreatedTheSolution={this.state.WhoCreatedTheSolution && this.state.WhoCreatedTheSolution.length > 0 ? this.state.WhoCreatedTheSolution : []}
                        isWhoCreatedTheSolutionDisabled={this.state.isWhoCreatedTheSolutionDisabled}
                        onWhoCreatedTheSolutionDropDownChange={this.onWhoCreatedTheSolutionChangeHandler.bind(this)}
                        imagePreviewUrl={this.state.imagePreviewUrl}
                        handleImageChange={this.handleImageChangeHandler.bind(this)}
                        itemTitleonBlur={this.onItemTitleBlurHandler.bind(this)}
                        businessProblemOnBlur={this.onBusinessProblemBlurHandler.bind(this)}
                        countryDropDownOnChange={this.onCountryDropDownChangeHandler.bind(this)}
                        segmentOnChanged={this.onSegmentDropDownChangedHandler.bind(this)}
                        descriptionOnBlur={this.onDescriptionBlurHandler.bind(this)}
                        featureOnBlur={this.onFeatureBlurHandler.bind(this)}
                        statusDropDownChange={this.onStatusDropDownChangeHandler.bind(this)}
                        functionDropDownChange={this.onFunctionDropDownChangeHandler.bind(this)}
                        othersForTechPlatformOnBlur={this.othersForTechPlatformOnBlurHandler.bind(this)}
                    />
                </div>
                <div>
                    <DialogFooter>
                        <PrimaryButton onClick={this.props.onDismissCalled} text="Save" />
                        <DefaultButton onClick={this.props.onDismissCalled} text="Cancel" />
                    </DialogFooter>
                </div>
            </Dialog>
        );
    }
} 