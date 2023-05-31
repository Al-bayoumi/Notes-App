import { useFormik } from 'formik';
import React, { useState } from 'react'
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Login({ saveUserData }) {

  let baseurl = 'https://route-movies-api.vercel.app/';
  let Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState('');

  async function handleLogin(values) {
    setIsLoading(true);
    let { data } = await axios.post(`${baseurl}signin`, values).catch((errr) => {
      setIsLoading(false);
      setMessageError(`${errr.response.data.errors.param}:${errr.response.data.errors.msg}`)
    })
    if (data.message === 'success') {
      localStorage.setItem('userToken', data.token);
      saveUserData();
      setIsLoading(false);
      Navigate('/')
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('password is required')
      .matches(/^[A-Z][a-z0-9!@]{3,16}$/, 'password must start with uppercase......'),
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleLogin
  });

  return (<>
    <div className="container mx-auto ">
      <div className="row min-vh-100 d-flex justify-content-center align-items-center pb-lg-5 ">
        <div className='col-md-10 pb-lg-5'>
          <div className='bg-light bg-opacity-25 shadow w-100 mx-auto  p-5 rounded-4'>
            <h1 className='fw-bold register text-center'>Sign Up Now :</h1>
            <div className='pt-3'>
              <form onSubmit={formik.handleSubmit}>
                {messageError.length > 0 ? <div className="alert alert-danger">{messageError}</div> : null}

                <div className="my-3">
                  <label htmlFor="email">Email :</label>
                  <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}
                    className='form-control mt-2' type="email" name="email" id="email" />
                  {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>
                    {formik.errors.email}</div> :
                    null}
                </div>

                <div className="my-3">
                  <label htmlFor="password">Password :</label>
                  <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}
                    className='form-control mt-2' type="password" name="password" id="password" />
                  {formik.errors.password && formik.touched.password ? (<div className='alert alert-danger'>
                    {formik.errors.password}
                  </div>) : null}
                </div>

                <div className="d-flex float-start">
                  {isLoading ? <button className='btn bg-primary text-white' type='button'>
                    <i className="fas fa-spinner fa-spin"></i>
                  </button> : <button disabled={!(formik.isValid && formik.dirty)}
                    className='btn bg-primary text-white' type='submit'>Login</button>}
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  </>)
}
