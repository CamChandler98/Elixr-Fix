import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditReviewForm from './EditReviewForm';
// import reviewButton from '../DrinkComponents/images/thumbnail/check-in-button.svg'
import styled from 'styled-components';


let EditSty = styled.div`
    button{
        background-color: rgb(198, 135, 231);
        color: white;
        border:none;
        padding: 6% 10%;
        margin-top: 5px;
        border-radius: 3px;
        font-size: 16px;
        width: 50px;
    }

    button:hover{
        cursor: pointer;
        background-color: rgb(144 91 173);
    }
`

function EditReviewFormModal({review ,drinkId}) {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () =>{
            setShowModal(true)
  }
    let closeModal = () => {
        setShowModal(false)
    }
  return (
    <EditSty>
    <button onClick = {handleClick}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReviewForm drinkId = {drinkId} closeModal = {closeModal} review ={review}/>
        </Modal>
      )}
    </EditSty>
  );
}

export default EditReviewFormModal
