import React, { useEffect, useState } from "react";
import contactService from "./services/contacts";
import "./index.css";

import Filter from "./components/Filter";
import AddContacts from "./components/AddContacts";
import ShowContacts from "./components/ShowContacts";
import Notification from "./components/Notification";
import FormDialog from "./components/FormDialog";


const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [editContactDetails, setEditContactDetails] = useState({
    oldName: "",
    oldNumber: 0,
    newName: "",
    newNumber: 0,
  })
  const [notification, setNotification] = useState({
    status: null,
    statusCode: null,
    statusText: null,
  });

  const [open, setOpen] = useState(false);

 
  useEffect(() => {
    contactService.getAll().then((allContacts) => setContacts(allContacts));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const contactNameExists = contacts.findIndex((el) => el.name === newName);
    const contactNumberExists = contacts.findIndex(
      (el) => el.number === newNumber
    );

    if (newName === "" || newNumber === "") {
      alert("Name and Number fields can't be empty");
    } 
    else if (contactNameExists !== -1) {
      if (
        window.confirm(
          `${contacts[contactNameExists].name} is already added to the phonebook. Do you want to replace the old number with the new one?`
        )
      ) {
        contactService
          .update(contacts[contactNameExists].id, {
            ...contacts[contactNameExists],
            number: newNumber,
          })
          .then((returnedContact) => {
            let temp = [...contacts];
            temp[contactNameExists] = {
              ...temp[contactNameExists],
              number: returnedContact.number,
            };
            setContacts(temp);
            setNotification({
              status: "success",
              statusCode: "200",
              statusText: "Updated Successfully!",
            });

            setTimeout(() => {
              setNotification({
                ...notification,
                status: null,
              });
            }, 2000);
          });
      }
    } else if (contactNumberExists !== -1) {
      alert(
        `A contact with that number already exists - ${contacts[contactNumberExists].name}`
      );
      setNewName("");
      setNewNumber("");
    } else {
      const newContact = {
        name: newName,
        number: newNumber,
        id: contacts[contacts.length - 1].id + 1,
      };

      contactService.create(newContact).then((response) => {
        setNotification({
          status: "success",
          statusCode: response.status,
          statusText: "Created Successfully!",
        });
        setTimeout(() => {
          setNotification({
            ...notification,
            status: null,
          });
        }, 2000);
        setContacts(contacts.concat(response.data));
      });

      setNewName("");
      setNewNumber("");
    }
  };

  const newNameHandler = (event) => {
    setNewName(event.target.value);
  };

  const newNumberHandler = (event) => {
    setNewNumber(event.target.value);
  };

  const filterHandler = (event) => {
    setFilterQuery(event.target.value);
  };

  const deleteContact = (id) => {
    const oldContactIndex = contacts.findIndex((el) => el.id === id);

    if (
      window.confirm(
        `Do you want to delete ${contacts[oldContactIndex].name} - ${contacts[oldContactIndex].number}`
      )
    ) {
      contactService
        .deleteContact(id)
        .then(() => {

          const newContacts = contacts.filter((el) => el.id !== id);
          setContacts(newContacts);
          setNotification({
            status: "success",
            statusCode: 200,
            statusText: "Deleted Successfully",
          });
          setTimeout(() => {
            setNotification({
              ...notification,
              status: null,
            });
          }, 2000);
          setFilterQuery("");
        })
        .catch(() => {
          setNotification({
            status: "error",
            statusCode: 200,
            statusText: "Contact has already been deleted",
          });
          setTimeout(() => {
            setNotification({
              ...notification,
              status: null,
            });
          }, 2000);

          // remove from contacts
          console.log(contacts, id)
          setContacts(contacts.filter((el) => el.id !== id))
        });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const discardSave = () => {
    setOpen(false);
  }

  const handleSave = () => {
    debugger
    const contactId = contacts.findIndex((el) => el.name === editContactDetails.oldName);

    contactService
      .update(contacts[contactId].id, {
        ...contacts[contactId],
        name: editContactDetails.newName,
        number: editContactDetails.newNumber,
      })
      .then((returnedContact) => {
        let temp = [...contacts];
        temp[contactId] = {
          ...temp[contactId],
          name: returnedContact.name,
          number: returnedContact.number,
        };
        setContacts(temp);
        setNotification({
          status: "success",
          statusCode: "200",
          statusText: "Updated Successfully!",
        });

        setTimeout(() => {
          setNotification({
            ...notification,
            status: null,
          });
        }, 2000);
      });
    setOpen(false);
  };

  const editContact = (id) => {
    debugger
    const oldContactDetails = contacts.filter(el => el.id === id)[0]
    setEditContactDetails({
      ...editContactDetails,
      oldName: oldContactDetails.name,
      oldNumber: oldContactDetails.number,
      newName: oldContactDetails.name,
      newNumber: oldContactDetails.number
    })
    
    handleClickOpen();
  };

  
  return (
    <>
      <div className="header">
        <h1 className="page-title" >Phonebook</h1>
        <p className="creator-credits">Created by IfeOlulesi </p>
      </div>
    
      <Notification message={notification} />
      <FormDialog 
        discardSave={discardSave} handleSave={handleSave} open={open} 
        newName={newName} setNewName={setNewName} newNumber={newNumber} 
        setNewNumber={setNewNumber} editContactDetails={editContactDetails}
        setEditContactDetails={setEditContactDetails}
      />

      <div className="root">
        <div className="functionSection">
          <Filter filterQuery={filterQuery} filterHandler={filterHandler} />

          <AddContacts
            newName={newName}
            newNameHandler={newNameHandler}
            newNumber={newNumber}
            newNumberHandler={newNumberHandler}
            handleSubmit={handleSubmit}
          />
        </div>

        <div className="displayContacts">
          <ShowContacts
            contacts={contacts}
            filterQuery={filterQuery}
            deleteContact={deleteContact}
            editContact={editContact}
          />
        </div>
      </div>
    </>
  );
};

export default App;
