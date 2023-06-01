import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';



export default function Register({ saveUserData }) {

  let baseurl = 'https://route-movies-api.vercel.app/'
  let Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState('');

  async function handleRegister(values) {
    setIsLoading(true);
    let { data } = await axios.post(`${baseurl}signup`, values).catch((error) => {
      setIsLoading(false);
      setMessageError(`${error.response.data.errors.param}:${error.response.data.errors.msg}`)
    })
    if (data.message === 'success') {
      localStorage.setItem('userToken', data.token);
      saveUserData();
      setIsLoading(false);
      Navigate('/login')
    }
  }

  let validationSchema = Yup.object({
    first_name: Yup.string().required('first name is required').min(3, 'first name minlength is 3')
      .max(20, 'first name maxlength is 20'),
    last_name: Yup.string().required('last name is required').min(3, 'last name minlength is 3')
      .max(20, 'last name maxlength is 20'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('password is required')
      .matches(/^[A-Z][a-z0-9!@]{3,16}$/, 'password must start with uppercase......'),
    age: Yup.number().required('age is required').max(60, 'age maxlength is 60').min(20, 'age minlength is 20'),
  })

  let formik = useFormik({
    initialValues: {

      first_name: "",
      last_name: "",
      email: "",
      password: "",
      age: ""
    },
    validationSchema,
    onSubmit: handleRegister
  });

  return (<>
   <Helmet>
      <title>Register</title>
    </Helmet>
    <div className="container mx-auto ">
      <div className="row min-vh-100 d-flex justify-content-center align-items-center pb-lg-5 ">
        <div className='col-md-10 pb-lg-5'>
          <div className='bg-light bg-opacity-25 shadow w-100 mx-auto  p-5 rounded-4'>
            <h1 className='fw-bold register text-center'>Registeration Form :</h1>
            <div className='pt-3'>
              <form onSubmit={formik.handleSubmit}>
                {messageError.length > 0 ? <div className="alert alert-danger">{messageError}</div> : null}

                {/*first_name  */}
                <div className="my-3">
                  <label htmlFor="first_name">First Name :</label>
                  <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.first_name}
                    className='form-control mt-1' type="text" name="first_name" id="first_name" />
                  {formik.errors.first_name && formik.touched.first_name ? <div className='alert alert-danger'>
                    {formik.errors.first_name}</div> : null}
                </div>

                {/* last_name */}
                <div className="my-3">
                  <label htmlFor="last_name">Last Name :</label>
                  <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.last_name}
                    className='form-control mt-1' type="text" name="last_name" id="last_name" />
                  {formik.errors.last_name && formik.touched.last_name ? <div className='alert alert-danger'>
                    {formik.errors.last_name}
                  </div> : null}
                </div>

                {/*  email*/}
                <div className="my-3">
                  <label htmlFor="email">Email :</label>
                  <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}
                    className='form-control mt-1' type="email" name="email" id="email" />
                  {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>
                    {formik.errors.email}</div> :
                    null}
                </div>

                {/* password */}
                <div className="my-3">
                  <label htmlFor="password">Password :</label>
                  <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}
                    className='form-control mt-1' type="password" name="password" id="password" />
                  {formik.errors.password && formik.touched.password ? (<div className='alert alert-danger'>
                    {formik.errors.password}
                  </div>) : null}
                </div>

                {/* age */}
                <div className="my-3">
                  <label htmlFor="age">Age :</label>
                  <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.age}
                    className='form-control mt-1' type="number" name="age" id="age" />
                  {formik.errors.age && formik.touched.age ? <div className='alert alert-danger'>{formik.errors.age}</div> :
                    null}
                </div>

                {/* button  */}
                <div className="float-start">
                  {isLoading ? <button className='btn bg-primary text-white' type='button'>
                    <i className="fas fa-spinner fa-spin"></i>
                  </button> : <button disabled={!(formik.isValid && formik.dirty)}
                    className='btn bg-primary text-white' type='submit'>Register</button>}
                </div>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>

  </>)
}
