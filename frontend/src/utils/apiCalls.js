import BaseURL from "./BaseURL";

export const postApi = async(url,data) =>{
    const response = await fetch(BaseURL+url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body: JSON.stringify(data)
    });
    return response.json(); 
}

export const getApi = async(url) =>{
    const response = await fetch(BaseURL+url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        },
    });
    return response.json(); 
}
  
export const putApi = async(url,data) =>{
  const response = await fetch(BaseURL+url,{
    method:'PUT',
    headers:{
      'content-type':'application/json',
      'auth-token':localStorage.getItem('token')
    },
    body:JSON.stringify(data)
  });
  return response.json();
}

export const deleteApi = async(url)=>{
  const response = await fetch(BaseURL+url,{
    method:"DELETE",
    headers:{
      'content-type':'application/json',
      'auth-token':localStorage.getItem('token')
    },
  });
  return response.json();
}

export const postApiWithoutToken = async(url,data) =>{
  const response = await fetch(BaseURL+url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  });
  return response.json(); 
}