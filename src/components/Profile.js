import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Pagination from './Pagination';

const Profile = (props) => {
 
  const { user, isAuthenticated } = useAuth0();
  const indexOfLastPost = (props.currentPage) * (props.postsPerPage);
  const indexOfFirstPost = indexOfLastPost - (props.postsPerPage);
  console.log(indexOfFirstPost,indexOfLastPost);
  
  return (
    isAuthenticated && ( 
     <div>
       <h1>gitlab Repo Details</h1>
     
<table>
  <tr>
    <th>Project Id</th>
    <th>Project Name</th>
    <th>Pipeline Status</th>
   
  </tr>
  {props.pid.map((element)=>{
         return (<tr>
           <td>{element[0]}</td>
           <td>{element[1]} </td>
           <td> --- </td>
         </tr>);
     })}

  
</table>


     
      
      <Pagination
        postsPerPage={props.postsPerPage}
        totalPosts={props.totalPosts}
        paginate={props.paginate}
      />
      </div>
    )
  )
}

export default Profile
