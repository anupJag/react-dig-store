export interface IMvpStoreProps {
  siteURL: string;
  _onConfigure: () => void;
  list: string;
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