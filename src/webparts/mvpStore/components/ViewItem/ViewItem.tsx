import * as React from 'react';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import pnp from 'sp-pnp-js';
import { IViewItemProps, IViewItemState, IMVPDataView, IUserInfo } from './IViewItem';
import styles from './ViewItem.module.scss';
import ViewItemHeader from './ViewHeader/ViewHeader';
import { FieldName } from '../IMvpStoreProps';
import ItemDetails from './ItemDetails/ItemDetails';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { unescape } from '@microsoft/sp-lodash-subset';



export default class ViewItem extends React.Component<IViewItemProps, IViewItemState>{

    constructor(props: IViewItemProps) {
        super(props);
        this.state = {
            id: props.id,
            itemInfo: null,
            showSpinner: true,
            contributorData: null,
            productOwnerData: []
        };
    }

    public componentDidMount(): void {
        //GET ITEM DETAILS
        this.getItemDetails(parseInt(this.state.id.toString(), 10)).then(() => this.buildUserInfo(this.state.itemInfo.AuthorId)
        ).then(() => this.buildUserInfo([...this.state.itemInfo.Product_x0020_OwnerId])
        ).then(() => {
            const itemData: IMVPDataView = { ...this.state.itemInfo };
            let imgURL: string = itemData["Images"];
            let reg: RegExp = new RegExp(/<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/);
            let extractImageResult = reg.exec(imgURL);

            if (!extractImageResult) {
                imgURL = `https://team.effem.com/sites/digitalmarssolutionstore/SiteAssets/Images/placeholder-image.jpg`;
            }
            else {
                if (extractImageResult.length > 0) {
                    imgURL = extractImageResult[1].toString();
                }
            }

            itemData["Images"] = imgURL;

            this.setState({
                itemInfo: itemData,
                showSpinner: false
            });

        });
    }

    private getItemDetails = async (value: number) => {
        let tempData: IMVPDataView = null;
        await pnp.sp.web.lists.getById(this.props.listGUID).items.getById(value).select(FieldName.SolutionName, FieldName.Segment, `OData_${FieldName.Description}`, `${FieldName.ProductOwner}Id`, FieldName.Status, FieldName.WhoCreatedTheSolution, FieldName.ScreenShots, "AuthorId", `OData_${FieldName.BusinessProblem}`, FieldName.Features, `${FieldName.Country}/Title`, FieldName.Function, FieldName.TechnologyPlatform, FieldName.DataSource, FieldName.MVPNumber, FieldName.Demo).expand(FieldName.Country).configure({
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'odata-version': ''
            }
        }).get().then((el: any) => {
            let Country: string[] = el.Country.map(elItem => {
                let tempValue = elItem.Title;
                if(tempValue.toString().indexOf("ALL - it's") >= 0){
                    tempValue = "Global Solution";
                }

                return tempValue;
            });
            tempData = {
                ...el,
                Country
            };
        });

        this.setState({
            itemInfo: tempData
        });
    }

    private buildUserInfo = async (userID: number | number[]) => {
        if (typeof userID === "number") {
            let userInfo: IUserInfo = null;
            await pnp.sp.web.getUserById(userID).configure({
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'odata-version': ''
                }
            }).get().then(el => {
                userInfo = {
                    imgURL: `${this.props.webURL}/_layouts/15/userphoto.aspx?size=L&username=${el.Email}`,
                    text: el.Title
                };
            });

            this.setState({
                contributorData: userInfo
            });
        }

        if (typeof userID === "object") {
            let userInfoData: IUserInfo[] = [];

            let batch = pnp.sp.createBatch();

            let prodOwnerArray: number[] = [...userID];

            for (let index = 0; index < prodOwnerArray.length; index++) {

                pnp.sp.web.getUserById(prodOwnerArray[index]).configure({
                    headers: {
                        'Accept': 'application/json;odata=nometadata',
                        'odata-version': ''
                    }
                }).inBatch(batch).get().then(el => {

                    userInfoData.push({
                        imgURL: `${this.props.webURL}/_layouts/15/userphoto.aspx?size=L&username=${el.Email}`,
                        text: el.Title
                    });
                }).catch(error => error);
            }

            await batch.execute().then(() => {
                this.setState({
                    productOwnerData: userInfoData
                });
            });

        }
    }

    public render(): React.ReactElement<IViewItemProps> {

        const showSpinnerMain: JSX.Element = this.state.showSpinner ?
            <div className={styles.spinnerContainer}>
                <div className={styles.spinnerPosition}>
                    <Spinner label={"Loading Data Please Wait"} size={SpinnerSize.large} />
                </div>
            </div> :
            null;

        const showData: JSX.Element = !this.state.showSpinner ? <React.Fragment>
            <ViewItemHeader itemIitle={this.state.itemInfo ? this.state.itemInfo["Title"] : "Title Not Loaded"} />
            <div className={styles.viewGap}></div>
            <ItemDetails
                contributorDataInfo={this.state.contributorData}
                productOwnerDataInfo={this.state.productOwnerData}
                segmentInfo={this.state.itemInfo.Segment as string[]}
                descriptionInfo={this.state.itemInfo["OData__x006a_086"] ? unescape(this.state.itemInfo.OData__x006a_086.trim()) : "Description Not Available"}
                statusInfo={this.state.itemInfo.Status}
                solutionCreatedInfo={this.state.itemInfo.Who_x0020_created_x0020_the_x002}
                imgURL={this.state.itemInfo.Images}
                altString={this.state.itemInfo.Title}
                businessProblemInfo={this.state.itemInfo["OData__x0066_281"] ? unescape(this.state.itemInfo.OData__x0066_281.trim()) : "Business Problem Information Not Avaialble"}
                featuresInfo={this.state.itemInfo["Features"] ? unescape(this.state.itemInfo.Features.trim()) : "Features Information Not Available"}
                countriesList={this.state.itemInfo.Country}
                functionListInfo={this.state.itemInfo.Target_x0020_User_x0020_Group}
                techUsedInfo={this.state.itemInfo.Technology_x0020_platform as string[]}
                dataSourceUsed={this.state.itemInfo.Data_x0020_Source as string[]}
                mvpNumber={this.state.itemInfo["MVP_x0020_Number"] ? this.state.itemInfo["MVP_x0020_Number"] : "MVP Number Not Available"}
                demoInfo={this.state.itemInfo["Demo"]}
            />
        </React.Fragment> :
            null;

        return (
            <div>
                <Modal
                    isBlocking={false}
                    isOpen={this.props.shouldModalBeOpen}
                    onDismiss={this.props.onDisMissCalled}
                    containerClassName={styles.viewItemModalContainer}
                >
                    {showSpinnerMain}
                    {showData}
                </Modal>
            </div>
        );
    }

}
