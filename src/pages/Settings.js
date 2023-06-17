// import React, { useState } from 'react'
// import axios from 'axios';

// const client = axios.create({
//   baseURL: "http://127.0.0.1:8000"
// });

// const Settings = () => {

//   const [currentUser, setCurrentUser] = useState();

//   function submitLogout(e) {
//     e.preventDefault();
    
//     client.post(
//       "/api/logout",
      
//       { withCredentials: true }
//     )
//     .then(function (res) {
//       setCurrentUser(false);
//     });
// }
// if(currentUser) {

// }
//   return (
//     <div>
//       <form onSubmit={e => submitLogout(e)}>
//         <button type="submit" variant="light">Log out</button>
//       </form>
//     </div>
//   )
// }

// export default Settings

import React from 'react'

const Settings = () => {
  return (
    <div>Settings</div>
  )
}

export default Settings