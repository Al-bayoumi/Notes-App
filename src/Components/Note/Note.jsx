import { useFormik } from 'formik';
import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios"



export default function Note({ noteDetails, deleteNote, getUserNotes }) {


  // handle modal show and close
  let baseurl = 'https://route-movies-api.vercel.app/';
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  async function updateNote(values) {
    let { data } = await axios.put(`${baseurl}updateNote`, values)
    if (data.message === "updated") {
      getUserNotes()
    }
  }

  let formik = useFormik({
    initialValues: {
      title: noteDetails.title,
      desc: noteDetails.desc,
      NoteID: noteDetails._id,
      token: localStorage.getItem("userToken")
    },
    onSubmit: updateNote
  })

  return (<>

    {/*update Note  */}
    {/* <!-- Modal --> */}

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Note</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form>
          <div className="py-2">
            <input onChange={formik.handleChange} defaultValue={noteDetails.title} className='form-control my-2'
              type="text" placeholder='title' name='title' id='title' />
          </div>
          <div className="py-2">
            <textarea onChange={formik.handleChange} defaultValue={noteDetails.desc}
              className='form-control' placeholder='Description' name="desc"
              cols="5" rows="7">
            </textarea>
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="btn btn-primary" onClick={handleClose}>Close</Button>
        <Button variant="btn btn-secondary" onClick={() => { formik.handleSubmit(); handleClose() }}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>

    {/* Display Note */}
    <div className="col-md-3 gy-2  ">
      <div className=" bg-warning p-4 rounded-2 shadow-sm ">
        <div className="icons float-end">
          <i onClick={() => { deleteNote(noteDetails._id) }} className='fa-solid fa-trash px-2 cursor-pointer'></i>
          <i onClick={handleShow} className='fa-solid fa-pen-to-square px-2 cursor-pointer'></i>
        </div>
        <div className="clearfix ">
          <h4>{noteDetails.title}</h4>
          <p>{noteDetails.desc}</p>
        </div>
      </div>
    </div>



  </>)
}
