import React, { useEffect } from "react";
import data from "./data.json";
import { useState } from "react";
import { TableCell, Table , TextField, Card, TableHead, TableBody, TableRow, Typography} from "@mui/material";
import { UserRow } from "./userRow";
import { HighlightRow } from "./highlightRow";

const userModule = ()=>{
    const [searchLine, setSearchLine] = useState("");
    const [userList, setUserList] = useState();
    const [filteredUserList, setFilteredUserList] = useState();

    useEffect(()=>{
        setUserList(data);
    },[])

    useEffect(()=>{
        setFilteredUserList(userList?.filter(user => {
            return user.firstName.indexOf(searchLine) != -1 ||
            user.lastName.indexOf(searchLine) != -1 
        }))
    },[searchLine])

    return (
        <Card sx={{p:2, m:5}}>
            <TextField sx={{alignSelf:'flex-start', display:'flex', mb:5}}  placeholder="Search..." onChange={(e)=>setSearchLine(e.target.value)}>{searchLine}</TextField>
            <Table>
                <TableHead>
                    <TableCell>
                        First name
                    </TableCell>
                    <TableCell>
                        Last name
                    </TableCell>
                    <TableCell>
                        Age
                    </TableCell>
                    <TableCell>
                        Phone
                    </TableCell>
                    <TableCell>
                        Notes
                    </TableCell>
                </TableHead>
                <TableBody>
                    {
                        searchLine ?
                            filteredUserList && filteredUserList.map(user=> 
                                <HighlightRow user={user} searchLine={searchLine}/>
                            )
                        :
                            userList && userList.map( user=> 
                                <UserRow user={user}/>
                            )
                    }
                </TableBody>
            </Table>            
        </Card>
    )
}

export default userModule;