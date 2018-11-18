export interface IMvpStoreProps {
  siteURL: string;
  _onConfigure: () => void;
  list: string;
  context: any;
}

export interface IFunctionFieldChoices {
  Choices: string[];
}

export interface IMVPStoreData {
  Id: number;
  Title: string;
  Target_x0020_User_x0020_Group: string[];
  Images: string;
  ListItemUrl: string;
}

export enum FieldName {
  SolutionName = "Title",
  ScreenShots = "Images",
  BusinessProblem = "_x0066_281",
  Description = "_x006a_086",
  Features = "Features",
  ProductOwner = "Product_x0020_Owner",
  Status = "Status",
  Function = "Target_x0020_User_x0020_Group",
  TechnologyPlatform = "Technology_x0020_platform",
  DataSource = "Data_x0020_Source",
  Demo = "Demo",
  Country = "Country",
  Segment = "Segment",
  Comments = "Comments",
  WhoCreatedTheSolution = "Who_x0020_created_x0020_the_x002"
}