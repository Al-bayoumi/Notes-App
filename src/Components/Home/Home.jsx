import React from 'react'
import Note from '../Note/Note'
import axios from "axios"
import jwtDecode from "jwt-decode"
import { useFormik } from 'formik'
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import { Helmet } from 'react-helmet';

export default function Home() {

  // handle modal show and close
  let baseurl = 'https://route-movies-api.vercel.app/';
  const [userNotes, setUserNotes] = useState(null)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const token = localStorage.getItem("userToken")
  const userID = jwtDecode(token)._id

  // ************* DeleteNote ***********************************
  async function deleteNote(NoteID) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary mx-2',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes delete',
      cancelButtonText: 'No delete',
      // reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        (async () => {
          let { data } = await axios.delete(`${baseurl}deleteNote`, {
            data: {
              NoteID,
              token

            }
          })
          if (data.message === "deleted") {
            getUserNotes()
          }
        })()

        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })

  }
  // ************* /DeleteNote ***********************************

  // ************* getUserNotes ************************************
  async function getUserNotes() {
    let { data } = await axios.get(`${baseurl}getUserNotes`, {
      headers: {
        token,
        userID
      },
      params: {

      }

    })

    setUserNotes(data.Notes)
  }
  // ************* /getUserNotes ************************************

  // ************* addNote ******************************************
  async function addNote(note) {
    let { data } = await axios.post(`${baseurl}addNote`, note)
    console.log(data)
    if (data.message === 'success') {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      getUserNotes();
    }
  }

  let formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      userID,
      token
    },
    onSubmit: addNote
  })

  useEffect(() => {
    getUserNotes()
  }, [])

  // ************* /addNote ******************************************

  return (<>
    <Helmet>
      <title>Register</title>
    </Helmet>

    {/* Add Note  */}
    {/* Button  modal  */}
    <button onClick={handleShow} className="btn btn-primary float-end my-4 py-2 ">
      <i className="fa-solid fa-plus me-1 "></i> Add Note
    </button>
    {/* <!-- Modal --> */}
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="modal-title text-dark fs-5">Add Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form >
          <div className="py-3">
            <input onChange={formik.handleChange} className='form-control' placeholder='title' type="text"
              name='title' />
          </div>
          <div className="py-3">
            <textarea onChange={formik.handleChange} className='form-control' placeholder='Description'
              name="desc" cols="5" rows="7">
            </textarea>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="btn btn-primary" onClick={handleClose}>Close</Button>
        <Button variant="btn btn-secondary" onClick={() => { formik.handleSubmit(); handleClose() }}>
          Save Note
        </Button>
      </Modal.Footer>
    </Modal>


    {/* *********************************************************************************************************** */}
    {/* Display Note */}
    <div className="row py-5 ">
      {userNotes ? userNotes.map((note, index) => (<Note getUserNotes={getUserNotes} deleteNote={deleteNote}
        key={note._id} noteDetails={note} />)) : <h1 className='text-center found h2'>
        No Notes <span className='text-danger'>Found</span></h1>}
    </div>


  </>)
}
