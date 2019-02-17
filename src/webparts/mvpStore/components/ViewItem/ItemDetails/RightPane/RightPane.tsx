import * as React from 'react';


export interface IRightPane {
    baseClassApply: string;
}


const rightPane = (props : IRightPane) => {
    return (
        <div className={props.baseClassApply}></div>
    );
};

export default rightPane;