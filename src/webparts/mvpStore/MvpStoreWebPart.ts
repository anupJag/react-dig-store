import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import * as strings from 'MvpStoreWebPartStrings';
import MvpStore from './components/MvpStore';
import { IMvpStoreProps } from './components/IMvpStoreProps';
import pnp from "sp-pnp-js";

export interface IMvpStoreWebPartProps {
  list: string;
}

export default class MvpStoreWebPart extends BaseClientSideWebPart<IMvpStoreWebPartProps> {

  public onInit(): Promise<void> {

    return super.onInit().then(_ => {

      pnp.setup({
        spfxContext: this.context
      });

    });
  }

  public render(): void {
    const element: React.ReactElement<IMvpStoreProps > = React.createElement(
      MvpStore,
      {
        siteURL: this.context.pageContext.web.absoluteUrl,
        _onConfigure: this._onConfigure.bind(this),
        list: this.properties.list,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private _onConfigure() {
    // Context of the web part
    this.context.propertyPane.open();
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Configure MVP Store Setup'
          },
          groups: [
            {
              groupName: '',
              groupFields: [
                PropertyFieldListPicker('list', {
                  label: 'Select a MVP Store Config List',
                  selectedList: this.properties.list,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'list'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
