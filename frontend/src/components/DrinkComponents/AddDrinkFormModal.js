import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddDrinkForm from './AddDrinkForm';
import drinkButton from '../DrinkComponents/images/thumbnail/add-drink-icon.svg'
import styled from 'styled-components';

let DrinkModalSty = styled.div`
  display:flex;
  justify-content: center;
  margin:2%;
  img{
    width:100px;
  }
  img:hover{
    transform: scale(1.01)
  }
`

function DrinkFormModal() {
  const [showModal, setShowModal] = useState(false);

  const handleCick = () =>{
            setShowModal(true)
  }
    let closeModal = () => {
        setShowModal(false)
    }
  return (
    <DrinkModalSty>
    <>
    <img onClick={handleCick} alt= 'leave review'className = 'review-button' src = {drinkButton}/>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddDrinkForm closeModal = {closeModal}/>
        </Modal>
      )}
    </>
    </DrinkModalSty>
  );
}

export default DrinkFormModal
