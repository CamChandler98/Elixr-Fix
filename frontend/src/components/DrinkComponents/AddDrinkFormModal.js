import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddDrinkForm from './AddDrinkForm';
import drinkButton from '../DrinkComponents/images/thumbnail/add-drink-icon.svg'



function DrinkFormModal() {
  const [showModal, setShowModal] = useState(false);

  const handleCick = () =>{
            setShowModal(true)
  }
    let closeModal = () => {
        setShowModal(false)
    }
  return (
    <>
    <img onClick={handleCick} alt= 'leave review'className = 'review-button' src = {drinkButton}/>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddDrinkForm closeModal = {closeModal}/>
        </Modal>
      )}
    </>
  );
}

export default DrinkFormModal
