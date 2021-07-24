import React,{useState,useEffect} from 'react';
import Base from '../core/Base';
import {Link} from "react-router-dom";
import {isAutheticated } from "../auth/helper";
import { deleteCategory, getCategories, updateProduct} from "./helper/adminapicall";
import AddCategory from './AddCategory';

const ManageCategories = () => {

    const [categories, setCategories] = useState([]);
    const [error,setError] = useState("");
    const[success,setSuccess] = useState([]);

    const { user, token } = isAutheticated();
  
    const preload = () => {
      getCategories().then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setCategories(data);
        }
      })
      .catch(err=>console.log(err));
    };
  
    useEffect(() => {
      preload();
    }, []);

    const deleteTheCategory = (categoryId) => {
      deleteCategory(categoryId, user._id, token)
      .then(data=>{
          if(data.error){
              setError(data.error);
              
              
          }
          else{
              setSuccess(true);
              preload();
          }
      })
      .catch(err=>console.log(err));
  };




    return (
    <Base title="Welcome admin" description="Manage Categories here">
      <h2 className="mb-4">All Categories:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total 3 Categories</h2>
          {
              categories.map((category, index) =>{
                  return(
                    <div key={index} className="row text-center mb-2">
                      <div className="col-4">
                      <h3 className="text-white text-left">{category.name}</h3>
                     </div>
                     
              <div className="col-4">

              <Link
                className="btn btn-success"
                to={`/admin/category/update/${category._id}`}
              >
                <span className="">Update</span>
              </Link>
            </div>
            <div className="col-4">
              <button onClick={() => {
                deleteTheCategory(category._id);
              }} className="btn btn-danger">
                Delete
              </button>
            </div>
            </div>
                      
                      
                  )
              })
          }

           
            
          </div>
        </div>
        
      
    </Base>
    );
};

export default ManageCategories;