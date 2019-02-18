import * as React from 'react';
import styles from './Countries.module.scss';

export interface ICountriesProps{
    countriesList : string[];
}


const countries = (props : ICountriesProps) => {
    return(
        <div className={styles.countriesInfo}>
            <div className={styles.countriesInfoHeader}>Countries where the solution has been used:</div>
            <div className={styles.countryList}>
                <ul>
                    {
                        props.countriesList && props.countriesList.length > 0 ?
                        props.countriesList.map(el => <li>{el}</li>)
                        :
                        <p>Country data not available</p>
                    }
                </ul>
            </div>
        </div>
    );
};

export default countries;