import React from "react"

import { TableCell, TableRow} from "@mui/material";

export const UserRow = ({user})=>{
    return(
        <TableRow>
            <TableCell>
                {user.firstName}
            </TableCell>
            <TableCell>
                {user.lastName}
            </TableCell>
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