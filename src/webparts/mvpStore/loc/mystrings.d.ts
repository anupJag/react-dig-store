declare interface IMvpStoreWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;

  ErrorDuplicateFile: string;
  ErrorFileType: string;
}

declare module 'MvpStoreWebPartStrings' {
  const strings: IMvpStoreWebPartStrings;
  export = strings;
}
