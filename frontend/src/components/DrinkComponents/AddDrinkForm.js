import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { addDrink } from "../../store/drinks"
import {thumbImages} from "../DrinkComponents/image-handler"

let AddDrinkSty = styled.div`
    form{
        display:flex;
        flex-direction:column;
        gap:10px;
        padding: 4%;
        margin:0;
    }
    img{
        width:50px;
        margin:-1%
    }
    .select-category{
        display: flex;
        gap: 10px;
    }
    [type=radio] {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
      }
      [type=radio] + img {
        cursor: pointer;
      }
      [type=radio]:checked + img {
        border-radius: 50%;
        box-shadow:0px 0px 2px 2px rgb(65 4 152 / 46%)
      }

      label{
          display:flex;
          flex-direction: column;
          align-items: center;
          font-weight: bold;
      }

`

let AddDrinkForm = ({closeModal})=> {
    const dispatch = useDispatch()
    const [name,setName] = useState('')
    const [description, setDescription] = useState('')
    const[ categoryId, setCategoryId] = useState(null)
    const [errors, setErrors] = useState([]);

    const creatorId = useSelector( state => state.session.user.id)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        let errors = []
        if(!name) errors.push('Names are powerful, your potion needs one')
        if(!description) errors.push('please provide a description of your potion')
        if(!categoryId) errors.push('please select a school')

        if(errors.length === 0){
       dispatch(addDrink({name,description,categoryId,creatorId}))
            closeModal()
    }else{
        setErrors(errors)
    }


    }

    return(
        <AddDrinkSty>
        <>
            <form onSubmit = {async (e) => {
                await handleSubmit(e)
                }
            }>
                <label htmlFor = 'name'>
                    Name
                </label>
                <input type = 'text' placeholder = 'What is your potion called' onChange ={e => setName(e.target.value)}></input>
                <label htmlFor = 'description'>Description</label>
                    <textarea
                        id = 'description'
                        cols = '30'
                        rows ='5'
                        onChange= {e => setDescription(e.target.value)}
                        placeholder = 'Let us know what your potion is capable of'
                        value = {description}
                    >
                    </textarea>

                    <label htmlFor = 'category'>
                        What School Does It belong to?
                        <div className = 'select-category'>

                        <label htmlFor = 'conjuration'>
                            <input type = 'radio' name = 'category' value = '1' id = 'conjuration' onChange = {e => {setCategoryId(e.target.value)}}>
                            </input>
                            <img src = {thumbImages[1]} alt = 'conjuration'></img>
                            Conjuration
                        </label>

                        <label htmlFor = 'evocation'>
                            <input type = 'radio' name = 'category' value = '2' id = 'evocation' onChange = {e => {setCategoryId(e.target.value)}}>
                            </input>
                            <img src = {thumbImages[2]} alt = 'evocation'></img>
                            Evocation
                        </label>


                        <label htmlFor = 'enchantment'>
                            <input type = 'radio' name = 'category' value = '3' id = 'enchantment' onChange = {e => {setCategoryId(e.target.value)}}>
                            </input>
                            <img src = {thumbImages[3]} alt = 'enchantment'></img>
                            Enchantment
                        </label>


                        <label htmlFor = 'transmutation'>
                            <input type = 'radio' name = 'category' value = '4' id = 'transmutation' onChange = {e => {setCategoryId(e.target.value)}}>
                            </input>
                            <img src = {thumbImages[4]} alt = 'transmutation'></img>
                            Transmutation
                        </label>

                        <label htmlFor = 'illusion'>
                        <input type = 'radio' name = 'category' value = '5' id = 'illusion' onChange = {e => {setCategoryId(e.target.value)}}>
                        </input>
                        <img src = {thumbImages[5]} alt ='illusion'></img>
                        Ilusion
                        </label>


                        <label htmlFor = 'abjuration'>
                            <input type = 'radio' name = 'category' value = '6' id = 'abjuration' onChange = {e => {setCategoryId(e.target.value)}}>
                            </input>
                            <img src = {thumbImages[6]} alt = 'abjuration'></img>
                            Abjuration
                        </label>


                        <label htmlFor = 'divination'>
                            <input type = 'radio' name = 'category' value = '7' id = 'divination' onChange = {e => {setCategoryId(e.target.value)}}>
                            </input>
                            <img src = {thumbImages[7]} alt = 'divination'></img>
                            Divinataion
                        </label>

                        <label htmlFor = 'other'>
                        <input type = 'radio' name = 'category' value = '8' id = 'other' onChange = {e => {setCategoryId(e.target.value)}}>
                        </input>
                        <img src = {thumbImages[8]} alt = 'other'></img>
                        Other
                        </label>
                        </div>
                    </label>
                    <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
                <button type = 'submit'>Submit</button>
            </form>
        </>
        </AddDrinkSty>
    )
}

export default AddDrinkForm
