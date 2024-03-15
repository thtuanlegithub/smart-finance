import React, { useState } from "react";
import MainTabNavigation from "./src/layouts/MainTabNavigation";
import AuthenticationRoute from "./src/layouts/AuthenticationRoute";

function App(props) {
  const [user, setUser] = useState(null);
  const handleSignOut = () => {
    setUser(null);
  }
  if (!user) {
    return (
      <AuthenticationRoute onSignIn={(user) => setUser({ user })} />
    )
  }
  return (
    <MainTabNavigation user={user} onSignOut={handleSignOut} />
  );
}



export default App;