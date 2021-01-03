// import axios from 'axios';


export const login = (data) => dispatch => {
  dispatch({
      type : "LOGIN", 
      data : data
  })
  // axios.post(SERVERPORT + '/login' , data)
  // .then(res=>{
  //   var userdata = res.data;
  //   if(userdata)
  //   {
  //     sessionStorage.setItem('username',userdata.username);
  //     sessionStorage.setItem('email',userdata.email);
  //     sessionStorage.setItem('state',userdata.state);
  //   }
  //   else{
  //     alert('login failure')
  //   }
  // })
  // .catch(err=>{
  //   console.log(err);
  //   return;
  // })
}

export const addrow = (data) => dispatch => {
  dispatch({
    type : "ADDROW",
    data : data
  })
}