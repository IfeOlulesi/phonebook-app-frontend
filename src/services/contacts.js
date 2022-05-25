import axios from 'axios';
const baseUrl = `http://localhost:3010/persons`;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data)
}

const create = newContact => {
  const request = axios.post(baseUrl, newContact);
  return request.then(response => response)
}

const deleteContact = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(res => res.status)
}

const update = (id, newContact) => {
  const request = axios.put(`${baseUrl}/${id}`, newContact)
  return request.then(res => res.data)
}

// const request = axios.delete(`${baseUrl}/${id}`)
// const res = await request;
// // return 
// console.log(res);

export default { getAll, create, deleteContact, update }