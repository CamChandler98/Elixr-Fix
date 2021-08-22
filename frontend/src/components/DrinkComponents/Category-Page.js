import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import DrinkDetails from "./DrinkDetailComponents/DrinkDetails"
import './Category-Page.css'

const CategoryPage = () =>{
    let {categoryId, categoryName} = useParams()
    const [drinkList, setDrinkList] = useState([])

    useEffect(()=>{
        async function fetchData(){
            let res = await fetch(`/api/categories/${categoryId}/drinks`)

            let drinks = await res.json()

            setDrinkList(drinks)
        }
        fetchData()
    },[categoryId])

    return(
        <div className = 'drinks-container'>
            <h2>{categoryName}</h2>
            {drinkList.map(drink => {
                return (
                    <DrinkDetails key = {drink.id} drinkId = {drink.id}/>
                )
            })}
        </div>
    )
}

export default CategoryPage
