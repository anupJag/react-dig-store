import * as React from 'react';
import styles from './MvpStore.module.scss';
import { IMvpStoreProps, IFunctionFieldChoices, IMVPStoreData } from './IMvpStoreProps';
import { escape, uniq } from '@microsoft/sp-lodash-subset';
import MainView from './MainView/MainView';
import FilterView from './FilterView/FilterView';
import pnp, { Web } from "sp-pnp-js";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { IconType } from 'office-ui-fabric-react/lib/Icon';


export interface IMvpStoreState {
  list: string;
  filters: IChoiceGroupOption[];
  selectedCategoryType: string;
  mvpStoreData: IMVPStoreData[];
  data: IMVPStoreData[];
  postCount: any;
}


export default class MvpStore extends React.Component<IMvpStoreProps, IMvpStoreState> {

  private _allCategories: string = "All Categories";

  /**
   * Default constructor
   */
  constructor(props: IMvpStoreProps) {
    super(props);
    this.state = {
      list: props.list,
      filters: [],
      selectedCategoryType: "All",
      mvpStoreData: [],
      data: [],
      postCount: "All"
    };
  }

  /**
   * React Lifecycle hooks for managing props passed by the parent
   */
  public componentWillReceiveProps(nextProps: IMvpStoreProps) {
    let tempList: string = this.state.list;
    if (nextProps.list != this.props.list) {
      tempList = nextProps.list;
    }
    this.setState({
      list: tempList
    });
  }

  /**
   * React lifecycle hooks responsible for reaching out to web and setting up the data
   */
  public componentDidMount() {
    if (this.state.list) {
      this.getFieldDetailsForFilter().then(() => console.log("Field Value Found")).then(() => {
        this.getMVPStoreData().then(() => {
          console.log("Data Fetch Completer");
        });
      }).catch((error: any) => {
        console.log(error);
      });
    }
  }

  /**
   * Handles the filterValueCondition
   */
  private filterValueOnChangeHandler = (ev: React.FormEvent<HTMLInputElement>, option: any): void => {
    let tempCategoryType: string = option.text;

    if (tempCategoryType === this._allCategories) {
      tempCategoryType = "All";
    }

    this.setState({
      selectedCategoryType: tempCategoryType
    }, this.getFilteredData);
  }

  /**
   * Gets the filter values and creates the filter object
   */
  protected getFieldDetailsForFilter = async () => {
    let web = new Web(this.props.siteURL);
    const listGUID: string = this.state.list;
    const fieldInternalName: string = "Target_x0020_User_x0020_Group";
    let tempFilters: IChoiceGroupOption[] = [];

    if (web && listGUID) {
      const data = await web.lists.getById(listGUID).fields.getByInternalNameOrTitle(fieldInternalName).select('Choices').usingCaching({
        expiration: pnp.util.dateAdd(new Date, "minute", 60),
        key: listGUID,
        storeName: "local"
      }).configure({
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        }
      }).get().then(p => p).catch((error: any) => error);

      if (data) {
        if (!data.status) {
          let values: IFunctionFieldChoices = data;
          values.Choices.forEach((el: string) => {
            tempFilters.push({
              key: el,
              text: el
            });
          });
        }
        else {
          //Error Setup
        }
      }

      tempFilters.push({
        key: this._allCategories,
        text: this._allCategories
      });

      this.setState({
        filters: tempFilters
      });
    }
  }

  protected getFilteredData = async () => {

    const data: IMVPStoreData[] = [...this.state.data];
    let filteredData: IMVPStoreData[] = [];
    const selectedFilter: string = this.state.selectedCategoryType;

    if (selectedFilter === "All") {
      filteredData = [...data];
    }
    else {
      data.map(el => {
        let columnToBeFilteredOn = el.Target_x0020_User_x0020_Group.join(' ');
        if (columnToBeFilteredOn.toString().toLowerCase().indexOf(selectedFilter.toLowerCase()) >= 0) {
          filteredData.push(el);
        }
      });

      filteredData = uniq(filteredData);
    }

    await this.setState({
      mvpStoreData: filteredData
    });
  }

  /**
   * Get all the data from MVP store ... Pending is handling paginated data
   */
  protected getMVPStoreData = async () => {
    let web = new Web(this.props.siteURL);
    let listGUID: string = this.props.list;
    let reg: RegExp = new RegExp(/<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/);
    let tempMvpStoreData: IMVPStoreData[] = [];
    const listURL = await web.lists.getById(listGUID).toUrl();

    const data = await web.lists.getById(listGUID).items.select("Id", "Title", "Target_x0020_User_x0020_Group", "Images").configure({
      headers: {
        'Accept': 'application/json;odata=nometadata',
        'odata-version': ''
      }
    }).get().then(p => p).catch((error: any) => error);

    if (data) {
      if (!data.status) {
        data.forEach((el) => {
          let imageTag: string = el["Images"];
          let extractImageResult = reg.exec(imageTag);

          if (!extractImageResult) {
            imageTag = `http://www.independentmediators.co.uk/wp-content/uploads/2016/02/placeholder-image.jpg`;
          }
          else {
            if (extractImageResult.length > 0) {
              imageTag = extractImageResult[1].toString();
            }
          }

          tempMvpStoreData.push({
            Id: el["Id"],
            Images: imageTag,
            Title: el["Title"],
            Target_x0020_User_x0020_Group: [...el["Target_x0020_User_x0020_Group"]],
            ListItemUrl: `https://team.effem.com/sites/digitalmarssolutionstore/Lists/MVP%20store/DispForm.aspx?ID=${el["Id"]}`
          });

        });
      }
    }

    this.setState({
      mvpStoreData: tempMvpStoreData,
      data: tempMvpStoreData
    });

  }

  public render(): React.ReactElement<IMvpStoreProps> {
    return (
      <div className={styles.mvpStore}>
        {
          this.state.list ?
            <div className={styles.container}>
              <div className={styles.mainView}>
                <MainView
                  CategoryType={this.state.selectedCategoryType}
                  CardsData={(this.state.mvpStoreData && this.state.mvpStoreData.length > 0) ? this.state.mvpStoreData : []}
                  PostCount={this.state.selectedCategoryType === "All" ? "All" : this.state.mvpStoreData.length}
                />
              </div>
              <div className={styles.categoryView}>
                <FilterView
                  choices={this.state.filters}
                  choiceOnChange={this.filterValueOnChangeHandler.bind(this)}
                  iconName={this.state.selectedCategoryType === "All" ? "Filter" : "FilterSolid"}
                />
              </div>
            </div>
            :
            <Placeholder
              iconName='Edit'
              iconText='Configure your web part'
              description='Please configure the web part.'
              buttonLabel='Configure'
              onConfigure={this.props._onConfigure} />
        }
      </div>
    );
  }
}
