import * as React from 'react';
import styles from './MvpStore.module.scss';
import { IMvpStoreProps } from './IMvpStoreProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Header from './Header/Header';


export interface IMvpStoreState{

}


export default class MvpStore extends React.Component<IMvpStoreProps, {}> {
  
  /**
   * Default constructor
   */
  constructor(props: IMvpStoreProps) {
    super(props);
    
  }

  
  

  
  public render(): React.ReactElement<IMvpStoreProps> {
    return (
      <div className={styles.mvpStore}>
        <div className={styles.container}>
          <div className={styles.mainView}>
            <Header />
          </div>
          <div className={styles.categoryView}>
            Right Container Component
        </div>
        </div>
      </div>
    );
  }
}
