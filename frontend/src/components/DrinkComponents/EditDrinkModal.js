import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditDrinkForm from './EditDrinkForm';
// import reviewButton from '../DrinkComponents/images/thumbnail/check-in-button.svg'
import styled from 'styled-components';


let EditSty = styled.div`
    button{
        background-color: rgb(198, 135, 231);
        color: white;
        border:none;
        margin-top: 5px;
        border-radius: 3px;
        font-size: 16px;
        width: 50px;
        height: 20px;
    }

    button:hover{
        cursor: pointer;
        background-color: rgb(144 91 173);
    }
`

function EditDrinkFormModal({drink}) {
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
          <EditDrinkForm closeModal = {closeModal} drink = {drink}/>
        </Modal>
      )}
    </EditSty>
  );
}

export default EditDrinkFormModal
