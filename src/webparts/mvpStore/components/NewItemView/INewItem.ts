import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";

export interface INewItemProps {
    hideDialog: boolean;
    onDismissCalled: () => void;
    onSaveCalled: () => void;
    context: any;
    siteURL: any;
    listGUID: string;
}

export interface INewItemState {
    Status: IDropdownOption[];
    TechnologyPlatform: IDropdownOption[];
    DataSource: IDropdownOption[];
    Segment: IDropdownOption[];
    WhoCreatedTheSolution: IDropdownOption[];
    Country: IDropdownOption[];
    Function: IDropdownOption[];
    showSpinner: boolean;
    isTechnologyDisabled: boolean;
    isDataSourceDisabled: boolean;
    isWhoCreatedTheSolutionDisabled: boolean;
    file: any;
    imagePreviewUrl: any;
    newItemData: INewItemData;
    othersTechValue: string;
    othersDataSourceValue : string;
    othersWhoCreatedSolutionValue : string;
    fileUploadError : boolean;
    errorMessage : string;
    MVPNumber : string;
    demoErrorMessage : string;
}

export interface INewItemData {
    Title: string;
    Images: string;
    Features: string;
    OData__x006a_086: string; //Description
    OData__x0066_281: string; // Business Problem
    Product_x0020_OwnerId: IMultiData;
    Status: string;
    Target_x0020_User_x0020_Group : any;
    Technology_x0020_platform: any;
    Data_x0020_Source: any;
    Demo: string;
    CountryId: IMultiData;
    Comments: string;
    Segment: any;
    Who_x0020_created_x0020_the_x002 : any;
    MVP_x0020_Number: string;
}

export interface IMultiData{
    results : any[];
}