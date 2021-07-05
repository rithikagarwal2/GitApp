import {React,useEffect,useState} from 'react';
import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import { useAuth0 } from '@auth0/auth0-react';
const axios = require('axios');

function App() {
  const [projectsids,setprojectids]=useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(1);
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
  const fetchProjectids = async () => {
    const userdata= await axios.get('https://gitlab.com/api/v4/user?access_token=a47babe4ca273839ce99dc4e4a568ec343a17b3ca830128699c32b0f4e1c5555');
    console.log(userdata);
    const username= userdata.data.username;
    console.log(username);
    const res = await axios.get(`https://gitlab.com/api/v4/users?username=${username}`);
   
    console.log(res);
    
    console.log(res.data[0].id);
    const projects= await axios.get(`https://gitlab.com/api/v4/users/${res.data[0].id}/projects?access_token=a47babe4ca273839ce99dc4e4a568ec343a17b3ca830128699c32b0f4e1c5555`);

    console.log(projects);
    let arr =[];
    projects.data.map((obj)=>{
      arr.push([obj.id,obj.name]);
    })

    setprojectids(arr);



    
    console.log(arr);
    return arr;
  };

  fetchProjectids();
},[]);
  
  const { isLoading } = useAuth0();
  console.log(isLoading);
  if (isLoading) return <div>Loading...</div>
  
  


  // Change page
  const paginate = (pageNumber) => {setCurrentPage(pageNumber)};
  console.log(currentPage);

  return (
    <>

      <LoginButton/>
      
      <LogoutButton />
      <Profile pid={projectsids}
       postsPerPage={postsPerPage}
       totalPosts={10}
       paginate={paginate}
       currentPage={currentPage}/>
     
     
    </>
  );
}

export default App;