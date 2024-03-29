import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import {createCategory, getCategory, updateCategory,} from './adminapicall';

import { isAutheticated } from "../../auth/helper";
import Base from "../../core/Base";


const UpdateCategory = ({match}) =>{
    
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    
    
    const {user, token} = isAutheticated();

    const goBack = () => {
        return(
            <div className="mt-5">
                <Link className="btn btn-sm btn-info mb-3"
                to="/admin/dashboard">
                    Admin Home
                </Link>
            </div>
        )
    };

    const preload = () => {
        getCategory(match.params.categoryId)
        .then((data) => {
            if(data.error){
                setError(data.error);
            }
            else{
               setName(data.name);
               
            }
        })
    };

    useEffect(()=>{
        preload();
    }, []);

    const handleChange = (event) => {
        setError(" ");
        setName(event.target.value); 
    };

    const successMessage = () => {
        if(success){
            return(
                <h4 className="text-success">
                    Category updated succesfully
                </h4>
            )
        }
    }

    const warningMessage = () => {
        if(error){
            return(
                <h4 className="text-danger">
                    {error}
                </h4>
            )
        }
    }


    const onSubmit = (event) =>{
        event.preventDefault();
        setError(" ");
        setSuccess(false);

        //backend request

        updateCategory(match.params.categoryId, user._id, token, {name})
        .then(data=>{
            if(data.error){
                setError(data.error);
                // alert(data.error);
            }
            else{
                setError("");
                setSuccess(true);
                setName("");
            }
        })
        .catch(err=>{
            console.log(err);
        })

    }

    const myCategoryForm = () =>{
        return(
            <form>
                <div className="form-group"> 
                    <p className="lead">
                        Enter the Category
                    </p>
                    <input type="text" 
                    className="form-control my-3"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                    placeholder="For Ex. Summer"    
                    />
                    <button onClick={onSubmit} className="btn btn-outline-info">
                        Update Category
                    </button>
                </div>
            </form>
        )
    }

    return(
        <Base 
        title="Update  category"
        description="Update your category"
        className="container bg-info p-4">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {myCategoryForm()}
                    {goBack()}
                </div>
                
            </div>
        </Base>
    )
}

export default UpdateCategory;