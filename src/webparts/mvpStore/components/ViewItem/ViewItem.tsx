import * as React from 'react';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import pnp from 'sp-pnp-js';
import { IViewItemProps, IViewItemState } from './IViewItem';
import styles from './ViewItem.module.scss';
import ViewItemHeader from './ViewHeader/ViewHeader';
import { FieldName } from '../IMvpStoreProps';


export default class ViewItem extends React.Component<IViewItemProps, IViewItemState>{

    constructor(props: IViewItemProps) {
        super(props);
        this.state = {
            id: props.id
        };
    }

    public componentDidMount(): void {
        //GET ITEM DETAILS
        this.getItemDetails(parseInt(this.state.id.toString(), 10)).then(() => console.log("We Shall See"));
    }

    private getItemDetails = async (value: number) => {
        const itemDetails = await pnp.sp.web.lists.getById(this.props.listGUID).items.getById(value).select(FieldName.SolutionName, FieldName.Segment, `OData_${FieldName.Description}`, `${FieldName.ProductOwner}Id`, FieldName.Status, FieldName.WhoCreatedTheSolution, "AuthorId").get().then(el => el);
        console.log(itemDetails);
    }


    public render(): React.ReactElement<IViewItemProps> {
        return (
            <div>
                <Modal
                    isBlocking={false}
                    isOpen={this.props.shouldModalBeOpen}
                    onDismiss={this.props.onDisMissCalled}
                    containerClassName={styles.viewItemModalContainer}
                >
                    <ViewItemHeader itemIitle={"Hello World"} />
                    <div className={styles.viewGap}></div>
                    {/* <Details /> */}
                </Modal>
            </div>
        );
    }

}
