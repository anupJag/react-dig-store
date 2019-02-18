export interface IViewItemProps {
    id: string | number;
    shouldModalBeOpen: boolean;
    onDisMissCalled: () => void;
    listGUID: string;
    webURL : string;
}

export interface IViewItemState {
    id: string | number;
    itemInfo : IMVPDataView;
    showSpinner: boolean;
    contributorData : IUserInfo;
    productOwnerData : IUserInfo[];
}

export interface IMVPDataView {
    Title: string;
    Images: string;
    Features: string;
    OData__x006a_086: string; //Description
    OData__x0066_281: string; // Business Problem
    Product_x0020_OwnerId: number[];
    Status: string;
    Target_x0020_User_x0020_Group : any;
    Technology_x0020_platform: any;
    Data_x0020_Source: any;
    Demo: string;
    Country: string[];
    Comments: string;
    Segment: any;
    Who_x0020_created_x0020_the_x002 : string[];
    AuthorId : number;
}

export interface IUserInfo{
    imgURL : string;
    text : string;
}