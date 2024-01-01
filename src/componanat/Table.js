import React,{useEffect,useState} from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'

export default function Table() {
    const Navigate = useNavigate();
  const [tabledata, settabledata] = useState([]);
  useEffect(() => {
    getdata();
  }, []);

  const getdata=()=>{
    const option = {
        method: "GET",
        headers: { "content-Type": "application/json" },
      };
  
      fetch("http://localhost:3002/registration", option)
        .then((response) => response.json())
        .then((response) => {
          settabledata(response);
        })
        .catch((err) => {
          alert("server down..");
          console.log(err);
        });
    };

        
// console.log(tabledata);

    const Rendertable = (props) =>{
        var i = 0;
        return props.tabledata.map((element) => {
          i++;
          let image_src="http://localhost:3002/uplods/"+element.img;
          // let image_src="https://webneel.com/daily/sites/default/files/images/daily/08-2018/1-nature-photography-spring-season-mumtazshamsee.jpg";
        return(
            <tr>
            <th>{i}</th>    
            <th scope="row" style={{color:"#666666;"}}>{element.fname}</th>
            <th scope="row" style={{color:"#666666;"}}>{element.lname}</th>
            <td><img src={image_src} className='tableimg' id='tableimg' ></img></td>
            {/* <td>{element.img}</td> */}
            <td>{element.state}</td>
            <td>{element.city}</td>
            <td>{element.email}</td>
            <td>{element.pass}</td>
            <td>{element.gender}</td>
            <th className="col">
                <i class="bi bi-pencil-square m-3 fs-4 bg-success text-white" 
                 onClick={() => editdata(element._id)}>

                 </i>
                <i class="bi bi-trash3-fill fs-4 bg-danger text-white"
                onClick={() => deletedata(element._id)}>
                </i>
            </th>
          </tr>
        );
    });
};
const editdata = (id) => {
  // console.log("edit id.." + id);
  Navigate("/form", { state: { id: id } });
};

const deletedata = (id) => {
  let isconform= window.confirm("do you want to delete data?")
  if(isconform){
    const options = {
      method: "PUT",
      headers: { "content-Type": "application/json" },
    };

    fetch(`http://localhost:3002/registration?id=${id}`, options)
          .then((response) => response.json())
          .then((response) => { 
          if(response.status===1){
            getdata()
            alert(response.message);
          }else{
            alert(response.message);
          }
        })
        .catch((err) =>{
          alert("server down")
          console.error(err)
        });
          

  }
  // console.log("delete id.." + id);
};

  return (
    <section class="intro">
  <div class="gradient-custom-1 h-100">
    <div class="mask d-flex align-items-center h-100">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12">
            <div class="table-responsive bg-white">
              <table class="table mb-0">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">First NAME</th>
                    <th scope="col">LAST NAME</th>
                    <th scope="col">IMAGE</th>
                    <th scope="col">STATE</th>
                    <th scope="col">CITY</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">PASSWORD</th>
                    <th scope="col">GENDER</th>
                    <th scope="col"><button type="button" class="btn btn-primary ">
                    <Link to="/form" className="nav-link text-light">
                        ADD NEW
                        </Link>
                        </button></th>
                  </tr>
                </thead>
                <tbody>
                 <Rendertable tabledata={tabledata}/>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
<Outlet/>
</section>
  )
}
