import axios from 'axios';

const request = (url,params,callback)=>{
    let response = ""
    axios.post(`http://localhost:5000/${url}`,params,
      {headers: {
        'Content-Type': 'application/json'
      }})
      .then(response=>{
        callback(response.request._response)
      })
      .catch(function (error) {
        response(error)
      });
}

const requestGet = (url,callback)=>{
  let response = ""
  axios.get(`http://localhost:5000/${url}`,
    {headers: {
      'Content-Type': 'application/json'
    }})
    .then(response=>{
      callback(response.request._response)
    })
    .catch(function (error) {
      response(error)
    });
}

module.exports = {request,requestGet}