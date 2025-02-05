import Input from "../../components/Inputs";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import Error from "../../components/errors";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Radio from "../../components/radio";
import { createUser } from "../../services/auth";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();
  function registerUser(e) {
    e.preventDefault();
    if (name && email && password && role) {
      createUser(name, email, password, role).then((data) => {
        if (data.code) {
          setError(data.message);
          hideMessage();
        }
        if (data.token) {
          localStorage.setItem("name", data.name);
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.role);
          navigate("/panel", { message: "redirecionando" })
          return data
        }
      })
    } else {
      setError("Preencha os campos corretamente");
      hideMessage();
    }

    function hideMessage() {
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const [error, setError] = useState("");

  return (
    <>
      <Header />
      <section className="container-register">
        <aside className="container-banner">
          <Banner />
        </aside>
        <form className="register" onSubmit={registerUser} required>
          <h1 className="register-indicator">Cadastro</h1>
          <Input
            className="user-name"
            type="text"
            placeholder="nome"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            className="email"
            type="email"
            placeholder="email@email.com"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            className="password"
            type="password"
            placeholder="senha"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="checkbox">
            <Radio
              name="role"
              className="user-waitress"
              value="waitress"
              checked={role === "waitress"}
              onChange={(e) => setRole(e.target.value)}
              label="Atendimento"
            />
            <Radio
              name="role"
              className="user-kitchen"
              value="kitchen"
              checked={role === "kitchen"}
              onChange={(e) => setRole(e.target.value)}
              label="Cozinha"
            />
          </div>
          <Error text={error} className="error-register" />
          <Button className="button-register" type="submit" children="Cadastrar" />
          <a className="login-link" href="/">
            {" "}
            Ou entre aqui
          </a>
        </form>
      </section>
      <Footer />
    </>
  );
}

export default Register;
