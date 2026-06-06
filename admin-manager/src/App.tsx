import { useAuth } from "./auth/useAuth";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";

function App() {
  const { authed, configured, login, logout } = useAuth();

  if (!authed) {
    return <Login configured={configured} onLogin={login} />;
  }
  return <Dashboard onLogout={logout} />;
}

export default App;
