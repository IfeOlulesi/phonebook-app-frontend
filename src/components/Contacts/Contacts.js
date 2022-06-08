import React, { useEffect, useState } from "react";
import contactService from "../../services/contacts";

import Filter from "./Filter";
import AddContacts from "./AddContacts";
import ShowContacts from "./ShowContacts";
import Notification from "./Notification";
import FormDialog from "./FormDialog";

import { useAuth0 } from "@auth0/auth0-react";

const Contacts = ({ user }) => {
  // const { isLoading } = useAuth0();
  
  const [accounts, setAccounts] = useState([]);
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
    contactService.getAll().then((allAccounts) => setAccounts(allAccounts));
  }, []);

  useEffect(() => {
    if (accounts.length > 0) {
      setContacts(accounts.filter( el => el.username === user.email)[0].contacts)
    }
  }, [accounts])


  const handleSubmit = (event) => {
    event.preventDefault();
    const contactNameExists = contacts.findIndex((el) => el.name === newName);
    const contactNumberExists = contacts.findIndex(
      (el) => el.number === newNumber
    );

    if (newName === "" || newNumber === "") {
      alert("Name and Number fields can't be empty");
    }
    else if (contactNameExists !== -1) { // if the name exists
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
    } else { //to add a new contact to an existing account

      const newContactDetails = {
        username: user.email,
        contacts: [
          ...contacts,
          {
            name: newName,
            number: newNumber,
            id: contacts[contacts.length -1].id + 1
          }
        ]
      }

      const updateIdArray = accounts.filter(account => account.username = user.email)
      let updateId = 0
      if (updateIdArray.length > 0) {
        updateId = updateIdArray[0].id;
      }

      contactService.update(updateId, newContactDetails).then((response) => {

        setNotification({
          status: "success",
          statusCode: response.status,
          statusText: "Contact Added!!",
        });
        setTimeout(() => {
          setNotification({
            ...notification,
            status: null,
          });
        }, 2000);

        setContacts(response.contacts) 
      })

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
    const contactId = contacts.findIndex((el) => el.name === editContactDetails.oldName);

    // payload = {
    //   username: "",
    //   contacts: [

    //   ]
    // }

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

export default Contacts;
