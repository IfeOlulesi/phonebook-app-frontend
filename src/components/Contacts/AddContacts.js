import React from "react";

const AddContacts = ({
  newName,
  newNameHandler,
  newNumber,
  newNumberHandler,
  handleSubmit,
}) => {
  return (
    <form>
      <h3>Add Contact</h3>
      <div>
        <input
          value={newName}
          type="text"
          onChange={newNameHandler}
          className="addSearch"
          placeholder="Name"
        />
      </div>
      <div>
        <input
          value={newNumber}
          type="number"
          onChange={newNumberHandler}
          className="addSearch"
          placeholder="Phone number"
        />
      </div>
      <button type="submit" onClick={handleSubmit} className="addButton">
        add
      </button>
    </form>
  );
};

export default AddContacts;