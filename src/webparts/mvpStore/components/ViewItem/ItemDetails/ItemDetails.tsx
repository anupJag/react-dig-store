import * as React from 'react';
import LeftPane from './LeftPane/LeftPane';
import RightPane from './RightPane/RightPane';


const itemDetails = (props) => {
    return(
        <div>
            {/* Main Container */}
            <LeftPane />
            <RightPane />
        </div>
    );
};

export default itemDetails;