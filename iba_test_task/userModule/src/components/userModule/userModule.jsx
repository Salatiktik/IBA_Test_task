import React, { useEffect } from "react";
import data from "./data.json";
import { useState } from "react";
import { TableCell, Table , TextField, Card, TableHead, TableBody, TableRow} from "@mui/material";

const userModule = ()=>{
    const [searchLine, setSearchLine] = useState("");
    const [userList, setUserList] = useState();
    const [filteredUserList, setFilteredUserList] = useState();

    useEffect(()=>{
        setUserList(data?.users);
    },[])

    useEffect(()=>{
        setFilteredUserList(userList?.filter(user => {
            return user.firstName.indexOf(searchLine) != -1 ||
            user.lastName.indexOf(searchLine) != -1 
        }))
    },[searchLine])

    return (
        <Card sx={{p:2, maxWidth:'70vw'}}>
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
                                filteredUserList && filteredUserList.map(
                                    user=>{
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
                                )
                            :
                                userList && userList.map(
                                    user=><TableRow>
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
                </TableBody>
            </Table>            
        </Card>
    )
}

export default userModule;
