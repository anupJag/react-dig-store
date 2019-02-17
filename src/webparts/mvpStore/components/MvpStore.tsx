import * as React from 'react';
import styles from './MvpStore.module.scss';
import { IMvpStoreProps, IFunctionFieldChoices, IMVPStoreData, FieldName } from './IMvpStoreProps';
import { escape, uniq } from '@microsoft/sp-lodash-subset';
import MainView from './MainView/MainView';
import FilterView from './FilterView/FilterView';
import pnp, { Web } from "sp-pnp-js";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { IconType } from 'office-ui-fabric-react/lib/Icon';
import NewItem from './NewItemView/NewItem';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import ViewItemModal from './ViewItem/ViewItem';


export interface IMvpStoreState {
  list: string;
  filters: IChoiceGroupOption[];
  selectedCategoryType: string;
  mvpStoreData: IMVPStoreData[];
  data: IMVPStoreData[];
  postCount: any;
  hideDialog: boolean;
  showLoadingSpinner: boolean;
  showItemProps : boolean;
  itemIDToBeDisplayed : string | number;
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
      postCount: "All",
      hideDialog: true,
      showLoadingSpinner: true,
      showItemProps : false,
      itemIDToBeDisplayed : '',
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
    const fieldInternalName: string = FieldName.Function;
    let tempFilters: IChoiceGroupOption[] = [];

    if (web && listGUID) {
      const data = await web.lists.getById(listGUID).fields.getByInternalNameOrTitle(fieldInternalName).select('Choices').usingCaching({
        expiration: pnp.util.dateAdd(new Date, "minute", 60),
        key: `${listGUID}_${fieldInternalName}`,
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

  /**
   * Filter Data Collection based on Filter click
   */
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
    this.setState({
      showLoadingSpinner: true
    });

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
            ListItemUrl: `https://team.effem.com/sites/digitalmarssolutionstore/Lists/MVP%20store/DispForm.aspx?ID=${el["Id"]}&source=${window.location.href}`
          });

        });
      }
    }

    this.setState({
      mvpStoreData: tempMvpStoreData,
      data: tempMvpStoreData,
      showLoadingSpinner: false
    });

  }

  protected onAddButtonClickHandler = (): void => {
    this.setState({
      hideDialog: false
    });

    this.getMVPStoreData().then(() => console.log("Data Refreshed"));

  }

  protected onSaveButtonClickHandler = (): void => {
    this.setState({
      hideDialog: true
    });

    this.getMVPStoreData().then(() => console.log("Data Refreshed"));

  }

  protected onDismissCalledHandler = (type): void => {
    this.setState({
      hideDialog: true
    });
  }

  protected onCardClickedHandler = (value : number | string) => {
    this.setState({
      showItemProps : true,
      itemIDToBeDisplayed : value
    });
  }

  protected onCardDismissCalledHandler = () : void => {
    this.setState({
      showItemProps : false,
      itemIDToBeDisplayed : ''
    });
  }

  public render(): React.ReactElement<IMvpStoreProps> {
    const showNewItem: JSX.Element = !this.state.hideDialog ?
      <NewItem
        hideDialog={this.state.hideDialog}
        onDismissCalled={this.onDismissCalledHandler.bind(this)}
        onSaveCalled={this.onSaveButtonClickHandler.bind(this)}
        context={this.props.context}
        siteURL={this.props.siteURL}
        listGUID={this.state.list}
      />
      :
      null;

    const showSpinnerMain: JSX.Element = this.state.showLoadingSpinner ?
      <div className={styles.showSpinner}>
        <Spinner label={"Loading Data Please Wait"} size={SpinnerSize.large} />
      </div> :
      null;

    const showItemProps : JSX.Element = this.state.showItemProps ? 
    <ViewItemModal 
      listGUID={this.props.list}
      shouldModalBeOpen={this.state.showItemProps}
      onDisMissCalled={this.onCardDismissCalledHandler.bind(this)}
      id={this.state.itemIDToBeDisplayed}
      webURL={this.props.siteURL}
    /> 
    : 
    null;
    
    return (
      <div className={styles.mvpStore}>
        {
          this.state.list ?
            <div className={styles.container}>
              <div className={styles.mainView}>
                {
                  !this.state.showLoadingSpinner ?
                  <MainView
                      CategoryType={this.state.selectedCategoryType}
                      CardsData={(this.state.mvpStoreData && this.state.mvpStoreData.length > 0) ? this.state.mvpStoreData : []}
                      PostCount={this.state.selectedCategoryType === "All" ? "All" : this.state.mvpStoreData.length}
                      onAddButtonClick={this.onAddButtonClickHandler.bind(this)}
                      onCardClicked={this.onCardClickedHandler.bind(this)}
                    /> 
                    : 
                    showSpinnerMain
                }
                {showNewItem}
                {showItemProps}
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
