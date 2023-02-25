import React, { useEffect, useState } from "react";
import contactService from "../../services/contacts";

import Filter from "./Filter";
import AddContacts from "./AddContacts";
import ShowContacts from "./ShowContacts";
import Notification from "./Notification";
import FormDialog from "./FormDialog";

// import { useAuth0 } from "@auth0/auth0-react";

const Contacts = ({ user }) => {
  // const { isLoading } = useAuth0();
  
  const [triggerAccountFetch, setTriggerAccountFetch] = useState(false)
  const [accounts, setAccounts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [editContactId, setEditContactId] = useState(0);
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
    // contactService.getAll().then((allAccounts) => setAccounts(allAccounts));

    //  ===========================
    contactService.getAll().then((contacts) => {
      console.log("All contacts", contacts)
      setContacts(contacts)
    })
    //  ===========================
    
    return () => {
      setTriggerAccountFetch(false);
    }
  }, [triggerAccountFetch]);

  // useEffect(() => {
  //   if (accounts.length > 0) {
  //     const accExists = accounts.filter( el => el.username === user.email);
  //     if (accExists.length > 0) {
  //       setContacts(accExists[0].contacts);
  //       setCurrentUser(accExists[0]);
  //     }
  //     else { // create new contact
  //       contactService.create({
  //         username: user.email,
  //         contactIdCount: 0,
  //         contacts: [],
  //       }).then((res) =>{
  //         setTriggerAccountFetch(true);
  //       });
  //     }
  //   }
  // }, [accounts]);


  const handleSubmit = (event) => {  // save a new contact
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
    } else if (contactNumberExists !== -1) { // if the number exists
      alert(
        `A contact with that number already exists - ${contacts[contactNumberExists].name}`
      );
      setNewName("");
      setNewNumber("");
    } 
    else { // to add a new contact to an existing account
      // var userDetails = accounts.filter(acc => acc.username === user.email)[0]; 

      // const newContactDetails = {
      //   username: user.email,
      //   contactIdCount: userDetails.contactIdCount + 1,
      //   contacts: [
      //     ...contacts,
      //     {
      //       name: newName,
      //       number: newNumber,
      //       id:  userDetails.contactIdCount + 1,
      //     }
      //   ]
      // }

      // const updateIdArray = accounts.filter(account => account.username === user.email)
      // let updateId = 0
      // if (updateIdArray.length > 0) {
      //   updateId = updateIdArray[0].id;
      // }

      // contactService.update(updateId, newContactDetails).then((response) => {
      contactService.create({
        name: newName,
        number: newNumber,
      }).then((response) => {
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
        // setContacts(response.contacts) 
      })

      setNewName("");
      setNewNumber("");
      setTriggerAccountFetch(true);

    }
  };

  const newNameHandler = event => setNewName(event.target.value);
  const newNumberHandler = event => setNewNumber(event.target.value);
  const filterHandler = event => setFilterQuery(event.target.value);

  const deleteContact = (id) => {
    const oldContactIndex = contacts.findIndex((el) => el.id === id);

    if (
      window.confirm(
        `Do you want to delete ${contacts[oldContactIndex].name} - ${contacts[oldContactIndex].number}`
      )
    ) {
      let oldContacts = ([...contacts])
      oldContacts.splice(oldContactIndex, 1);

      // var userDetails = accounts.filter(acc => acc.username === user.email)[0];
      // userDetails = {
      //   ...userDetails,
      //   contacts: oldContacts,
      // }

      // const updateIdArray = accounts.filter(account => account.username === user.email)
      // let updateId = 0
      // if (updateIdArray.length > 0) {
      //   updateId = updateIdArray[0].id;
      // }

      // contactService.update(updateId, userDetails).then((response) => {
      contactService.deleteContact(id).then((response) => {
        // setContacts(response.contacts)
        setContacts(response)

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
      })
      .catch((err) => console.log(err))
    }
  };

  const handleClickOpen = () => setOpen(true);
  const discardSave = () => setOpen(false);

  const handleEditSave = () => {  // save contact info after editing
    const editContactIndex = contacts.findIndex(contact => contact.id === editContactId)
    let bufferContacts = [...contacts]
    bufferContacts[editContactIndex] = {
      name: editContactDetails.newName,
      number: editContactDetails.newNumber,
      id: bufferContacts[editContactIndex].id,
    }

    let payload = {
      ...currentUser,
      contacts: bufferContacts
    }

    // console.log(payload)

    contactService.update(currentUser.id, payload).then((response) => {
      console.log(response)
      setContacts(response.contacts)
      // setTriggerAccountFetch(true);

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

      setOpen(false);
    });
  }

  const editContact = (id) => {
    setEditContactId(id)
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
        discardSave={discardSave} handleSave={handleEditSave} open={open} 
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
