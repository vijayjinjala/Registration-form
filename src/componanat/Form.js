import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Form() {
  const location = useLocation();
    useEffect(()=>{
  if(location.state){
    getdata(location.state.id)
  }
    }, []);

      const [passwordType, setPasswordType] = useState("password");
      const togglePassword =()=>{
      if(passwordType==="password")
      {
       setPasswordType("text")
       return;
      }
      setPasswordType("password")
    }

    const [PasswordType2, setPasswordType2] = useState("password");
    const togglePassword2 =()=>{
    if(PasswordType2==="password")
    {
     setPasswordType2("text")
     return;
    }
    setPasswordType2("password")
  }

    const getdata=(id)=>{
      console.log(JSON.stringify({id:id})); 
      const options = {
        method:'GET',
        headers: { "content-Type": "application/json" },
        // body:json.stringify({id:id})
      };
      fetch(`http://localhost:3002/registration?id=${id}`, options)
        .then(response => response.json())
        .then((response)=>{
          console.log(response);
          formik.setFieldValue("id",response[0]._id)
          formik.setFieldValue("fname",response[0].fname)
          formik.setFieldValue("lname",response[0].lname)
          formik.setFieldValue("state",response[0].state)
          formik.setFieldValue("city",response[0].city)
          formik.setFieldValue("email",response[0].email)
          formik.setFieldValue("pass",response[0].pass)
          formik.setFieldValue("gender",response[0].gender)
        })
        .catch((err)=>{
          alert("server down..")
          console.log(err);
        });
    }

  const Navigate = useNavigate();
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      id:"",
      fname: "",
      lname: "",
      state: "",
      city: "",
      email: "",
      pass: "",
      cpass: "",
      gender: "",
    },
    validationSchema: Yup.object({
      fname: Yup.string().label().required("Enter your first name*"),
      lname: Yup.string().label().required("Enter your last name*"),
      state: Yup.string().label().required("Enter your state name*"),
      city: Yup.string().label().required("Enter your city name*"),
      email: Yup.string().label().email().required("Enter your valid email*"),
      pass: Yup.string().required("Password is required"),
      cpass: Yup.string().oneOf(
        [Yup.ref("pass"), null],
        "Passwords must match"),
    }),

    onSubmit: function (values) {
      const options = {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "content-Type": "application/json" },
      };

      fetch("http://localhost:3002/registration", options)
        .then((response) => response.json())
        .then((response) => { console.log(response)
        alert(response.message)
        if(response.status===1){
          Navigate("/")
        }
      })
        .catch((err) => console.error(err));
    },
  });


  return (
    <>
      <section className="h-100 bg-dark">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card card-registration my-4">
                <div className="row g-0">
                  <div className="col-xl-6 d-none d-xl-block">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                      alt="Sample photo"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-xl-6">
                    <form onSubmit={formik.handleSubmit}>
                      <div className="card-body p-md-5 text-black">
                        <h3 className="mb-5 text-uppercase">
                          Student registration form
                        </h3>
                        <div className="ibox">
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKqsXA8K7oaMV5y017LJUJTYuDhH2bIodoTA&usqp=CAU" />
                        </div>

                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input
                                type="fname"
                                id="fname"
                                placeholder="First name"
                                className={`form-control  ${
                                  formik.touched.fname && formik.errors.fname
                                    ? "red-border": ""} `}
                                value={formik.values.fname}
                                onChange={formik.handleChange}
                              />
                              <span className="text-red">
                                {formik.errors.fname}
                              </span>
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input
                                type="lname"
                                id="lname"
                                placeholder="Last name"
                                className={`form-control  ${
                                  formik.touched.lname && formik.errors.lname
                                    ? "red-border" : ""} `}
                                value={formik.values.lname}
                                onChange={formik.handleChange}
                              />
                              <span className="text-red">
                                {formik.errors.lname}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input
                                type="text"
                                id="state"
                                placeholder="Enter state name"
                                className={`form-control  ${
                                  formik.touched.state && formik.errors.state
                                    ? "red-border" : "" } `}
                                value={formik.values.state}
                                onChange={formik.handleChange}
                              />
                              <span className="text-red">
                                {formik.errors.state}
                              </span>
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input
                                type="text"
                                id="city"
                                placeholder="Enter city name"
                                className={`form-control  ${
                                  formik.touched.city && formik.errors.city
                                    ? "red-border": ""} `}
                                value={formik.values.city}
                                onChange={formik.handleChange}
                              />
                              <span className="text-red">
                                {formik.errors.city}
                              </span>
                            </div>


                          </div>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="email"
                            placeholder="Enter email address"
                            className={`form-control  ${
                              formik.touched.email && formik.errors.email
                                ? "red-border" : ""} `}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                          />
                          <span className="text-red">
                            {formik.errors.email}
                          </span>
                        </div>

                        <div className="row">
                          <div className="col">
                            <div className="input-group mb-3">
                              <input
                                type={passwordType==="password"?"password":"text"}
                                id="pass"
                                className={`form-control  ${formik.touched.pass && formik.errors.pass ? "red-border" : ""} `}
                                value={formik.values.pass}
                                onChange={formik.handleChange}
                                placeholder="Password"
                              />
                              <span className="input-group-text" onClick={togglePassword}>
                                { passwordType==="password"? <i className="bi bi-eye-slash-fill"></i> :<i className="bi bi-eye-fill"></i> }
                              </span>
                            </div>
                            <span className="text-red">
                              {formik.errors.pass}
                            </span>
                          </div>

                          <div className="col">
                            <div className="input-group mb-3">
                              <input
                                type={PasswordType2==="password"?"password":"text"}
                                id="cpass"
                                className={`form-control  ${formik.touched.cpass && formik.errors.cpass ? "red-border" : ""} `}
                                value={formik.values.cpass}
                                onChange={formik.handleChange}
                                placeholder="confirm Password"
                              />
                              <span className="input-group-text" onClick={togglePassword2}>
                              { PasswordType2==="password"? <i className="bi bi-eye-slash-fill"></i> :<i className="bi bi-eye-fill"></i> }
                              </span>
                            </div>
                            <span className="text-red">
                              {formik.errors.cpass}
                            </span>
                          </div>
                        </div>

                        <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">
                          <h6 className="mb-0 me-4">Gender: </h6>
                          <div className="form-check form-check-inline mb-0 me-4">
                            <input
                              className="form-check-input"
                              onChange={formik.handleChange}
                              value="female"
                              defaultChecked={formik.gender === "female"}
                              type="radio"
                              name="gender"
                              id="femaleGender"
                            />
                            <label className="form-check-label">Female</label>
                          </div>

                          <div className="form-check form-check-inline mb-0 me-4">
                            <input
                              className="form-check-input"
                              onChange={formik.handleChange}
                              defaultChecked={formik.gender === "male"}
                              value="male"
                              type="radio"
                              name="gender"
                              id="maleGender"
                            />
                            <label className="form-check-label">Male</label>
                          </div>

                          <div className="form-check form-check-inline mb-0">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="otherGender"
                              onChange={formik.handleChange}
                              defaultChecked={formik.gender === "other"}
                              value="other"
                            />
                            <label className="form-check-label">Other</label>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <select
                              class="form-select form-select-lg mb-3"
                              aria-label=".form-select-lg example"
                              value={formik.course}
                              onChange={formik.handleChange}
                            >
                              <option selected>select your course</option>
                              <option value="1">BCA</option>
                              <option value="2">BSC IT</option>
                              <option value="3">BBA</option>
                              <option value="3">B.com</option>
                              <option value="3">BA</option>
                            </select>
                          </div>
                        </div>

                        <div className="d-flex justify-content-end pt-3">
                          <button
                            type="submit"
                            className="btn btn-warning btn-lg ms-2"
                          >
                            Submit form
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
