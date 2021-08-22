import styled from 'styled-components'

import DrinkCategoriesPage from './DrinkCategoriesPage'

const Image = styled.div`
   .catimg{
       width:100px;
    height: 100px;
    margin-bottom: -20px;
    margin-top: -10px;
},

    .categories-container{
        margin-top: 60px;
        margin: 60px auto;
        display: grid;
        max-width:1000px;
        width:90%;
        height: auto;
        grid-template-rows: 1fr 1fr 1fr 1fr;
        grid-template-areas: ". con con ."
                             ". evo ench ."
                             " trans tit tit ill "
                             ". abj div ."
                             ". oth oth .";
    },
    .inner-cat{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .inner-cat:hover{
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: scale(1.09)
    }
    .inner-cat a{
        display: flex;
        flex-direction: column;
        text-decoration: none;
        font-family: "Charmonman";
        align-items: center;
        font-size: 20px;
        font-weight: bold;
    }
    .title{
        grid-area: tit;
        display:flex;
        justify-content:center;
        align-items: center;
        font-size: 20px;
        font-family: "Lato";
        text-align: center;
    }
    .title p {
        font-size: 30px;
        font-family: "Charmonman";
        font-weight: bold;
    }

    .magic{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center
    },




    .evocation{
        grid-area: evo;
        align-items:flex-start;
    }
    .conjuration {
        grid-area: con;
        justify-content: flex-end;

    }
    .transmutation{
        grid-area: trans;
        align-items:flex-end;

    }
    .illusion{
        grid-area: ill;
        align-items:flex-start;

    }
    .abjuration{
        grid-area: abj;
        align-items:flex-start;
    }
    .divination{
        grid-area: div;
        align-items:flex-end;
    }
    .other{
        grid-area: oth;
        justify-content: flex-start;
    }
    .enchantment{
        grid-area: ench;
        align-items:flex-end;

    }
`;

const CategorySty = ({isLoaded}) => {
    return (
        <>
         <Image>
            <DrinkCategoriesPage />
        </Image>
        </>
    )
}

export default CategorySty
