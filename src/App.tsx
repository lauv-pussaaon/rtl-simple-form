import RegisterForm from "./components/RegisterForm";
import RegisterService from "./services/RegisterService";

function App() {
    return <RegisterForm registerService={new RegisterService()} />;
}

export default App;
