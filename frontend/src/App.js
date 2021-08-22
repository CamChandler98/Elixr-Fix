import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import CategorySty from "./components/DrinkComponents/Category-PageStyle";
import CategoryPage from "./components/DrinkComponents/Category-Page";
import DrinkPage from "./components/DrinkComponents/DrinkPage";
import LatestReviews from "./components/ReviewComponents/LatestReviews";
import ReviewPage from "./components/ReviewComponents/ReviewPage";
import SpalshPage from "./components/ReviewComponents/SpalshPage";
import ProfilePage from "./components/UserComponents/ProfilePage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // const sessionUser = useSelector(state => state.session.user);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Switch>
      <Route exact path = '/'>
        <SpalshPage isLoaded = {isLoaded}/>
      </Route>
      <>
      <Navigation isLoaded={isLoaded} />
      <Route exact path ='/thecoven'>
        <LatestReviews/>
      </Route>
      <Route isLoaded = {isLoaded} exact path = "/categories">
            <CategorySty isLoaded = {isLoaded}/>
          </Route>
          <Route path = {'/categories/:categoryId/:categoryName'}>
          <CategoryPage />
        </Route>
        <Route exact path = {'/drinks/:drinkId'}>
          <DrinkPage />
        </Route>
        <Route path = {'/reviews/:reviewId'} component = {ReviewPage} />
        {/* {isLoaded && <Route path = {'/review/new'} component = {sessionUser ? AddReviewForm : LoginFormPage}/>} */}
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path = '/users/:username'>
            <ProfilePage />
          </Route>
        </Switch>
      )
      }</>
      </Switch>
    </>
  );
}

export default App;
