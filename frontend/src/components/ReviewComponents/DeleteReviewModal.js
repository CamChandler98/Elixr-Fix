
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteReview from './DeleteReview';

import styled from 'styled-components';

let ButtonSty = styled.div`
    button{

            background-color: rgb(216 73 171);
            color: white;
            border:none;
            padding: 6% 10%;
            margin-top: 5px;
            border-radius: 3px;
            font-size: 16px
    }
    button:hover{
      background-color: rgb(148 54 118);
    }
`
function DeleteReviewModal({reviewId}) {
    const [showModal, setShowModal] = useState(false);

    const handleClick = () =>{
              setShowModal(true)
    }
      let closeModal = () => {
          setShowModal(false)
      }
    return (
      <>
      <ButtonSty>
      <button onClick = {handleClick}>Delete</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <DeleteReview closeModal = {closeModal} reviewId ={reviewId}/>
          </Modal>
        )}
        </ButtonSty>
      </>
    );
  }

  export default DeleteReviewModal
