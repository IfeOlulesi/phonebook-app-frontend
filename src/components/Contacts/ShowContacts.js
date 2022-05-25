import React from "react";

import {DeleteIcon, EditIcon} from "../../icons/customIcons";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

const ShowContacts = ({ contacts, filterQuery, deleteContact, editContact }) => {
  // huge bug here: filter accepts name, number and id...fix this

  let filteredContacts = contacts.filter((contact) => 
      JSON.stringify(contact)
      .toLowerCase()
      .trim()
      .includes(filterQuery.toLowerCase())
  )

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
            filteredContacts.length > 0 ?
            
            filteredContacts.map((el) => (
              <tr key={el.name}>
                <td> {el.name} </td>
                <td> {el.number} </td>
                <td> 
                  <Tooltip arrow title="Delete">
                    <IconButton onClick={() => deleteContact(el.id)}> <DeleteIcon fillColor={"white"} /> </IconButton> 
                  </Tooltip>
                  <Tooltip arrow title="Edit">
                    <IconButton onClick={() => editContact(el.id)}> <EditIcon fillColor={"white"} /> </IconButton> 
                  </Tooltip>
                </td>
              </tr>
            ))

            :

            <div style={{
              color: "white",
              fontSize: "16px",
            }}>No matching contact found</div>
          }

        </tbody>
      </table>
      
    </>
  );
}; 

export default ShowContacts;