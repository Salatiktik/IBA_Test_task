import React from "react";

import { TableCell, TableRow} from "@mui/material";

export const HighlightRow = ({user, searchLine}) => {
    const fMatch = user.firstName.match(searchLine);
    const lMatch = user.lastName.match(searchLine);

    let fNameComponent = (<TableCell>{user.firstName}</TableCell>)
    let lNameComponent = (<TableCell>{user.lastName}</TableCell>)

    if(fMatch){
        let parts = user.firstName.split(fMatch[0],2)
        fNameComponent = (<TableCell>{parts[0]}<span style={{background:'#AAAAFF77'}}>{searchLine}</span>{user.firstName.slice(user.firstName.indexOf(searchLine)+searchLine.length)}</TableCell>)
    }

    if(lMatch){
        let parts = user.lastName.split(lMatch[0],2)
        lNameComponent = (<TableCell>{parts[0]}<span style={{background:'#AAAAFF77'}}>{searchLine}</span>{user.lastName.slice(user.lastName.indexOf(searchLine)+searchLine.length)}</TableCell>)
    }

    return(
        <TableRow>
            {fNameComponent}
            {lNameComponent}
            <TableCell>
                {user.age}
            </TableCell>
            <TableCell>
                {user.phone}
            </TableCell>
            <TableCell>
                {user.notes}
            </TableCell>
        </TableRow>
    )
}