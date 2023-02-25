import React, { useEffect, useState } from "react";

import {DeleteIcon, EditIcon} from "../../icons/customIcons";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import { CircularProgress } from '@material-ui/core'  

const ShowContacts = ({ contacts, filterQuery, deleteContact, editContact }) => {
  // huge bug here: filter accepts name, number and id...fix this

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (contacts.length < 1) {
      setTimeout(() => {
        setIsLoading(false);
      }, 7000);  
    }
    else if (contacts.length > 0) {
      setIsLoading(false);
    }
  }, [contacts])

  let filteredContacts = contacts.filter((contact) => 
      JSON.stringify(contact)
      .toLowerCase()
      .trim()
      .includes(filterQuery.toLowerCase())
  )

  let sortedFilteredContacts = [];
  if (filteredContacts.length > 0) {
    sortedFilteredContacts = filteredContacts.sort((a, b) => a.name > b.name ? 1 : -1)
  }

  return (
    <>
      <h2 style={{ color: "white" }}>Contacts</h2>
      <table>
        <thead>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Action</th>
        </thead>
        <tbody>
          {
            isLoading === true && 
            <div style={{
              color: "white",
              fontSize: "16px",
            }}>
              <CircularProgress />
            </div>
          }
          {
            sortedFilteredContacts.length > 0 &&
            
            sortedFilteredContacts.map((el) => (
              <tr key={el.name}>
                <td> {el.name} </td>
                <td> {el.number} </td>
                <td> 
                  <Tooltip arrow title="Delete">
                    <IconButton onClick={() => deleteContact(el.id)}> <DeleteIcon fillColor={"white"} /> </IconButton> 
                  </Tooltip>
                  {/* <Tooltip arrow title="Edit">
                    <IconButton onClick={() => editContact(el.id)}> <EditIcon fillColor={"white"} /> </IconButton> 
                  </Tooltip> */}
                </td>
              </tr>
            ))
          }
          

        </tbody>
      </table>
      
    </>
  );
}; 

export default ShowContacts;