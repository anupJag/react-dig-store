import * as React from 'react';
import { Dialog, DialogFooter, DialogType, IDialogProps, IDialogStyles } from 'office-ui-fabric-react/lib/Dialog';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import FormBody from './Body/Body';
import { escape, uniq, findIndex } from '@microsoft/sp-lodash-subset';
import styles from './NewItem.module.scss';
import pnp, { Web, ItemAddResult } from 'sp-pnp-js';
import { FieldName } from '../IMvpStoreProps';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { IComboBoxOption } from 'office-ui-fabric-react/lib/ComboBox';
import * as strings from 'MvpStoreWebPartStrings';
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
            newItemData: undefined,
            othersTechValue: '',
            othersDataSourceValue: '',
            othersWhoCreatedSolutionValue: '',
            fileUploadError: false,
            errorMessage: '',
            MVPNumber: '',
            demoErrorMessage : ''
        };
    }

    public componentDidMount() {
        this.getAllChoiceFieldData().then(() => {
            this.setState({
                showSpinner: false
            });
        });
    }

    /**
     * Method to get all data using batch request for faster load time
     */
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
        let tempItemData: INewItemData = { ...this.state.newItemData };
        let peoplePickerData: IMultiData = tempItemData["Product_x0020_OwnerId"];

        let resultSet: any[] = [];

        if (items && items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                resultSet.push(parseInt(items[i].id, 10));
            }

            resultSet = uniq(resultSet);
        }
        else {
            resultSet.length = 0;
        }

        peoplePickerData = { "results": [...resultSet] };

        tempItemData["Product_x0020_OwnerId"] = peoplePickerData;

        this.setState({
            newItemData: tempItemData
        });
    }

    private checkIfFileExists = (fileName: string): boolean => {
        const url = `https://team.effem.com/sites/digitalmarssolutionstore/SiteAssets/Lists/MVP%20store/NewForm/${fileName}`;
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status === 200;
    }

    private handleImageChangeHandler = async (event) => {

        let reader = new FileReader();
        let file: File = event.target.files[0];

        if (!(/\.(jpe?g|tiff|png)$/i).test(file.name)) {
            this.setState({
                fileUploadError: true,
                file: undefined,
                imagePreviewUrl: null,
                errorMessage: strings.ErrorFileType
            });

            throw new Error("File Type Error");
        }

        if (file.size > 7713582) {
            this.setState({
                fileUploadError: true,
                file: undefined,
                imagePreviewUrl: null,
                errorMessage: strings.ErrorFileSize
            });

            throw new Error("File Size Error");
        }

        if (this.checkIfFileExists(file.name)) {
            this.setState({
                fileUploadError: true,
                file: undefined,
                imagePreviewUrl: null,
                errorMessage: strings.ErrorDuplicateFile
            });

            throw new Error("File Exisits");
        }

        reader.onloadend = () => {
            this.setState({
                fileUploadError: false,
                errorMessage: '',
                file: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file);

        // pnp.sp.web.getFolderByServerRelativeUrl('/sites/digitalmarssolutionstore/SiteAssets/Lists/MVP%20store/NewForm/').files.add(file.name, file, false).then((data) => console.log(data));
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
                if (!this.state.othersTechValue) {
                    tempTechnologyPlatform.push(`${item.key as string}#$*`);
                }
                else {
                    tempTechnologyPlatform.push(`${this.state.othersTechValue}#$*`);
                }
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
        let tempItemData: INewItemData = { ...this.state.newItemData };
        let tempDataSource: string[];

        if (tempItemData) {
            tempDataSource = (tempItemData[FieldName.DataSource] ? tempItemData[FieldName.DataSource] : []);
        }
        else {
            tempDataSource = [];
        }

        if (item.selected) {
            if (item.key === this._others) {
                if (!this.state.othersDataSourceValue) {
                    tempDataSource.push(`${item.key as string}#$*`);
                }
                else {
                    tempDataSource.push(`${this.state.othersDataSourceValue}#$*`);
                }
            }
            else {
                tempDataSource.push(item.key as string);
            }

        }
        else {
            if (item.key === this._others) {
                tempDataSource.splice(findIndex(tempDataSource, el => el.toLowerCase().indexOf('#$*'.toLowerCase()) > 0));
            }
            else {
                tempDataSource.splice(findIndex(tempDataSource, el => el === item.key as string), 1);
            }
        }

        tempItemData[FieldName.DataSource] = tempDataSource;


        if (item.key === this._others) {
            this.setState({
                isDataSourceDisabled: true,
                newItemData: tempItemData
            });
        }
        else {
            this.setState({
                newItemData: tempItemData
            });
        }
    }

    protected onWhoCreatedTheSolutionChangeHandler = (item: IDropdownOption) => {
        let tempItemData: INewItemData = { ...this.state.newItemData };
        let tempWhoCreatedSolution: string[];

        if (tempItemData) {
            tempWhoCreatedSolution = (tempItemData[FieldName.WhoCreatedTheSolution] ? tempItemData[FieldName.WhoCreatedTheSolution] : []);
        }
        else {
            tempWhoCreatedSolution = [];
        }

        if (item.selected) {
            if (item.key === this._others) {
                if (!this.state.othersWhoCreatedSolutionValue) {
                    tempWhoCreatedSolution.push(`${item.key as string}#$*`);
                }
                else {
                    tempWhoCreatedSolution.push(`${this.state.othersWhoCreatedSolutionValue}#$*`);
                }
            }
            else {
                tempWhoCreatedSolution.push(item.key as string);
            }

        }
        else {
            if (item.key === this._others) {
                tempWhoCreatedSolution.splice(findIndex(tempWhoCreatedSolution, el => el.toLowerCase().indexOf('#$*'.toLowerCase()) > 0));
            }
            else {
                tempWhoCreatedSolution.splice(findIndex(tempWhoCreatedSolution, el => el === item.key as string), 1);
            }
        }

        tempItemData[FieldName.WhoCreatedTheSolution] = tempWhoCreatedSolution;


        if (item.key === this._others) {
            this.setState({
                isWhoCreatedTheSolutionDisabled: true,
                newItemData: tempItemData
            });
        }
        else {
            this.setState({
                newItemData: tempItemData
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
        itemData["OData__x0066_281"] = tempItemTitle;
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

        countrySelectedData = { "results": [...resultSet] };

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
        itemData["OData__x006a_086"] = tempDescription;
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

    protected getQueryStringParameter = (paramsToRetrieve: string, urlToBeSearchedFrom: string): string => {
        let params = urlToBeSearchedFrom.split("?")[1].split("&amp;");
        let strParams : string = "";
        for (let i = 0; i < params.length; i++) {
            var singleParam = params[i].split("=");
            if (singleParam[0] === paramsToRetrieve)
                strParams = singleParam[1];
        }

        return strParams;
    }

    protected onDemoBlurHandler = (event: any): void => {
        
        if(!event.target.value){
            return;
        }
        
        let itemData: INewItemData = { ...this.state.newItemData };
        const tempFeature = escape(event.target.value).trim();

        debugger;
        let errorDemoOnBlurMessage : string = "";

        

        if(!(tempFeature.indexOf("_layouts/15/PointPublishing.aspx") >= 0)){
            errorDemoOnBlurMessage = "Not a valid O365 Video URL";
        }
        else if(!(tempFeature.indexOf("?") >= 0)){
            errorDemoOnBlurMessage = "O365 Video Paramters Missing";
        }
        else if(!(this.getQueryStringParameter("app", tempFeature).indexOf("video") >= 0)){
            errorDemoOnBlurMessage = `O365 Video is not valid, missing parameter 'app'`;
        }
        else if(!this.getQueryStringParameter("chid", tempFeature)){
            errorDemoOnBlurMessage = `O365 Video is not valid, missing parameter 'chid'`;
        }
        else if(!this.getQueryStringParameter("vid", tempFeature)){
            errorDemoOnBlurMessage = `O365 Video is not valid, missing parameter 'vid'`;
        }

        if(errorDemoOnBlurMessage){
            this.setState({
                demoErrorMessage : errorDemoOnBlurMessage
            });
            return;
        }
        else{
            this.setState({
                demoErrorMessage : ''
            });
        }

        let iframeSource = `https://team.effem.com/portals/hub/_layouts/15/VideoEmbedHost.aspx?chId=${encodeURIComponent(this.getQueryStringParameter("chid", tempFeature))}&amp;vId=${encodeURIComponent(this.getQueryStringParameter("vid", tempFeature))}&amp;width=640&amp;height=360&amp;autoPlay=false&amp;showInfo=true`;

        let demoValue: string = `
        <iframe style="position: absolute;top: 0;bottom: 0;width: 100%;height: 100%;border: 0;" src="${iframeSource}" allowfullscreen></iframe>
        `;
        itemData[FieldName.Demo] = demoValue;
        this.setState({
            newItemData: itemData
        });
    }

    protected onMVPNumberBlurHandler = (event: any) => {
        let itemData: INewItemData = { ...this.state.newItemData };
        const tempMVPNumber = escape(event.target.value).trim();

        itemData[FieldName.MVPNumber] = tempMVPNumber;
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

    protected othersForTechPlatformOnBlurHandler = (event: any): void => {
        let tempDateEntered: string = escape(event.target.value).trim();
        let tempItemData: INewItemData = { ...this.state.newItemData };

        let tempTechnologyPlatform: string[];

        if (tempItemData) {
            tempTechnologyPlatform = (tempItemData[FieldName.TechnologyPlatform] ? tempItemData[FieldName.TechnologyPlatform] : []);
        }

        let index = findIndex(tempTechnologyPlatform, el => el.toLowerCase().indexOf("#$*") >= 0);

        if (index >= 0) {
            tempTechnologyPlatform[index] = `${tempDateEntered}#$*`;
        }

        tempItemData[FieldName.TechnologyPlatform] = tempTechnologyPlatform;

        this.setState({
            newItemData: tempItemData,
            othersTechValue: tempDateEntered
        });

    }

    protected othersDataSourceOnBlurHandler = (event: any): void => {
        let tempDateEntered: string = escape(event.target.value).trim();
        let tempItemData: INewItemData = { ...this.state.newItemData };

        let tempDataSource: string[];

        if (tempItemData) {
            tempDataSource = (tempItemData[FieldName.DataSource] ? tempItemData[FieldName.DataSource] : []);
        }

        let index = findIndex(tempDataSource, el => el.toLowerCase().indexOf("#$*") >= 0);

        if (index >= 0) {
            tempDataSource[index] = `${tempDateEntered}#$*`;
        }

        tempItemData[FieldName.DataSource] = tempDataSource;

        this.setState({
            newItemData: tempItemData,
            othersDataSourceValue: tempDateEntered
        });

    }

    protected othersWhoCreatedSolutionOnBlurHandler = (event: any): void => {
        let tempDateEntered: string = escape(event.target.value).trim();
        let tempItemData: INewItemData = { ...this.state.newItemData };

        let tempWhoCreatedSolution: string[];

        if (tempItemData) {
            tempWhoCreatedSolution = (tempItemData[FieldName.WhoCreatedTheSolution] ? tempItemData[FieldName.WhoCreatedTheSolution] : []);
        }

        let index = findIndex(tempWhoCreatedSolution, el => el.toLowerCase().indexOf("#$*") >= 0);

        if (index >= 0) {
            tempWhoCreatedSolution[index] = `${tempDateEntered}#$*`;
        }

        tempItemData[FieldName.WhoCreatedTheSolution] = tempWhoCreatedSolution;

        this.setState({
            newItemData: tempItemData,
            othersWhoCreatedSolutionValue: tempDateEntered
        });

    }

    protected saveDate = async () => {
        //Here We need to upload the image file to sharepoint and then

        this.setState({
            showSpinner: true
        });

        const { file, othersTechValue, othersDataSourceValue, othersWhoCreatedSolutionValue } = this.state;

        const imgUpldProps = await pnp.sp.web.getFolderByServerRelativeUrl('/sites/digitalmarssolutionstore/SiteAssets/Lists/MVP%20store/NewForm/').files.add(file.name, file, false).then(data => data);

        //Refine Data
        let dataToBeAdded: INewItemData = { ...this.state.newItemData };

        //Update Image
        dataToBeAdded["Images"] = `<div><p><img alt="${file.name}" src="${imgUpldProps.data.ServerRelativeUrl}"/>&#160;</p></div>`;

        //Update Technology_x0020_platform field
        const tempTechPlatform: string[] = [...this.state.newItemData[FieldName.TechnologyPlatform]];
        let index = findIndex(tempTechPlatform, el => el.toLowerCase().indexOf("#$*") >= 0);

        if (index >= 0 && othersTechValue) {
            tempTechPlatform[index] = othersTechValue;
        }

        dataToBeAdded[FieldName.TechnologyPlatform] = {
            __metadata: {
                type: "Collection(Edm.String)"
            },
            results: [...tempTechPlatform]
        };

        //Update Data_x0020_Source field
        const tempDataSource: string[] = [...this.state.newItemData[FieldName.DataSource]];
        let indexDataSource = findIndex(tempDataSource, el => el.toLowerCase().indexOf("#$*") >= 0);

        if (index >= 0 && othersDataSourceValue) {
            tempDataSource[indexDataSource] = othersDataSourceValue;
        }

        dataToBeAdded[FieldName.DataSource] = {
            __metadata: {
                type: "Collection(Edm.String)"
            },
            results: [...tempDataSource]
        };

        //Update Who_Created_Solution field
        const tempWhoCreatedSolution: string[] = [...this.state.newItemData[FieldName.WhoCreatedTheSolution]];
        let indexWhoCreatedSolution = findIndex(tempWhoCreatedSolution, el => el.toLowerCase().indexOf("#$*") >= 0);

        if (index >= 0 && othersWhoCreatedSolutionValue) {
            tempWhoCreatedSolution[indexWhoCreatedSolution] = othersWhoCreatedSolutionValue;
        }

        dataToBeAdded[FieldName.WhoCreatedTheSolution] = {
            __metadata: {
                type: "Collection(Edm.String)"
            },
            results: [...tempWhoCreatedSolution]
        };

        //Update Segment
        const tempSegmentData = [...dataToBeAdded["Segment"]];
        dataToBeAdded["Segment"] = {
            __metadata: {
                type: "Collection(Edm.String)"
            },
            results: [...tempSegmentData]
        };

        //Update Target User Group
        const tempTargetUser = [...dataToBeAdded["Target_x0020_User_x0020_Group"]];
        dataToBeAdded["Target_x0020_User_x0020_Group"] = {
            __metadata: {
                type: "Collection(Edm.String)"
            },
            results: [...tempTargetUser]
        };

        const itemToBeAdded = await pnp.sp.web.lists.getById(this.props.listGUID).items.add({ ...dataToBeAdded }).then((iar: ItemAddResult) => iar);

        console.log(itemToBeAdded);

        this.props.onSaveCalled();

    }

    public render(): React.ReactElement<INewItemProps> {

        const hideSpinner: React.CSSProperties = !this.state.showSpinner ? { display: "none" } : null;
        const enableSaveButton: boolean = this.state.newItemData && this.state.newItemData["OData__x006a_086"] && this.state.newItemData["CountryId"] && this.state.newItemData[FieldName.DataSource] && this.state.newItemData["OData__x0066_281"] && this.state.newItemData[FieldName.Features] && this.state.newItemData[FieldName.Function] && this.state.newItemData["Product_x0020_OwnerId"] && this.state.file && this.state.newItemData[FieldName.Segment] && this.state.newItemData[FieldName.SolutionName] && this.state.newItemData[FieldName.Status] && this.state.newItemData[FieldName.TechnologyPlatform] && this.state.newItemData[FieldName.WhoCreatedTheSolution] && !this.state.demoErrorMessage ? true : false;

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
                        errorMessage={this.state.errorMessage}
                        showFileUploadError={this.state.fileUploadError}
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
                        othersTechPlatformValue={this.state.othersTechValue}
                        othersDataSourceOnBlur={this.othersDataSourceOnBlurHandler.bind(this)}
                        othersDataSourceValue={this.state.othersDataSourceValue}
                        othersWhoCreatedSolutionOnBlur={this.othersWhoCreatedSolutionOnBlurHandler.bind(this)}
                        othersWhoCreatedSolutionValue={this.state.othersWhoCreatedSolutionValue}
                        demoOnBlur={this.onDemoBlurHandler.bind(this)}
                        onMVPNumberOnBlur={this.onMVPNumberBlurHandler.bind(this)}
                        demoErrorMessage={this.state.demoErrorMessage}
                    />
                </div>
                <div>
                    <DialogFooter>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <div className={styles.ShowSpinner} style={hideSpinner}>
                                <Spinner label={""} size={SpinnerSize.medium} />
                            </div>
                            <PrimaryButton
                                onClick={this.saveDate}
                                disabled={!enableSaveButton}
                                text="Save"
                            />
                            <DefaultButton onClick={this.props.onDismissCalled} text="Cancel" />
                        </div>
                    </DialogFooter>
                </div>
            </Dialog>
        );
    }
} 