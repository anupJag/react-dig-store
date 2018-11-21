import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";

export interface INewItemProps {
    hideDialog: boolean;
    onDismissCalled: () => void;
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
}

export interface INewItemData {
    Title: string;
    Images: string;
    Features: string;
    _x006a_086: string; //Business Problem
    _x0066_281: string; // Description
    Product_x0020_Owner: IMultiData;
    Status: string;
    Target_x0020_User_x0020_Group : string[];
    Technology_x0020_platform: string[];
    Data_x0020_Source: string[];
    Demo: string;
    CountryId: IMultiData;
    Comments: string;
    Segment: string[];
    Who_x0020_created_x0020_the_x002 : string[];
}

export interface IMultiData{
    results : any[];
}