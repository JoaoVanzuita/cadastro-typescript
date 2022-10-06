import Login from "../../pages/Login";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {

  if (localStorage.getItem('authToken')) {
    return children
  }

  return <Login />;
}
