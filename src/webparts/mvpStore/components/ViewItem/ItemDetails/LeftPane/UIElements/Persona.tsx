import * as React from 'react';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';

export interface IPersonaDetails{
    imgURL : string;
    text : string;
}


export default (props : IPersonaDetails) => {
    return(
        <Persona 
            imageUrl={props.imgURL}
            text={props.text}
            size={PersonaSize.size32}
        />
    );
};