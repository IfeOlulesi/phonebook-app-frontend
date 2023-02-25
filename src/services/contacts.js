import axios from 'axios';
// const baseUrl = `http://localhost:3010/accounts`;
const baseUrl = `http://localhost:3001/api/persons`;


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
  return request.then(res => {
    // console.log(res)
    return res.data
  })
}

const update = (id, payload) => {
  const request = axios.put(`${baseUrl}/${id}`, payload)
  return request.then(res => res.data)
}



// const request = axios.delete(`${baseUrl}/${id}`)
// const res = await request;
// // return 
// console.log(res);

export default { getAll, create, deleteContact, update }