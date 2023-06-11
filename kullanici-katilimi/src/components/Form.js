import { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Label, FormFeedback, Input, FormGroup } from "reactstrap";
import { formSchema } from "../validation/Yup";

const Form = () => {
  const [user, setUser] = useState({
    firstName: "",
    surName: "",
    email: "",
    password: "",
    terms: false,
  });

  const [userError, setUserError] = useState({
    firstName: "",
    surname: "",
    email: "",
    password: "",
    terms: "",
  });

  const [users, setUsers] = useState([]);

  const [valid, setValid] = useState([]);

  useEffect(() => {
    formSchema
      .isValid(user)
      .then(rest => setValid(rest))
      .catch(rest => setValid(!rest));
  }, [user]);

  const submitHandler = e => {
    e.preventDefault();
    if (valid) {
      axios
        .post("https://reqres.in/api/users", user)
        .then(res => setUsers([...users, res.data]));
    }
  };

  const validation = (name, value) => {
    Yup.reach(formSchema, name)
      .validate(value)
      .then(() => setUserError({ ...userError, [name]: "" }))
      .catch(err => setUserError({ ...userError, [name]: err.errors[0] }));
    setUser({ ...user, [name]: value });
  };

  const changeHandler = e => {
    const { type, name, value, checked } = e.target;
    if (type === "checkbox") {
      setUser({ ...user, [name]: checked });
      validation(name, checked);
    } else {
      setUser({ ...user, [name]: value });
      validation(name, value);
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <FormGroup>
          <Label for="name">Kullanıcı Adı: </Label>
          <Input
            id="name"
            type="text"
            name="firstName"
            onChange={changeHandler}
            value={user.firstName}
            invalid={!!userError.firstName}
            placeholder="adınızı giriniz"
          />
          <FormFeedback>{userError.firstName}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="surname">Kullanıcı Soyadı: </Label>
          <Input
            id="surname"
            type="text"
            name="surname"
            onChange={changeHandler}
            value={user.surname}
            invalid={!!userError.surname}
            placeholder="soyadınızı giriniz"
          />
          <FormFeedback>{userError.surname}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="mail">Kullanıcı Mail Adresi: </Label>
          <Input
            id="mail"
            type="email"
            name="email"
            onChange={changeHandler}
            value={user.email}
            invalid={!!userError.email}
            placeholder="e-mail giriniz"
          />
          <FormFeedback>{userError.email}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="password">Kullanıcı Şifresi: </Label>
          <Input
            id="password"
            type="password"
            name="password"
            onChange={changeHandler}
            value={user.password}
            invalid={!!userError.password}
            placeholder="şifre giriniz"
          />
          <FormFeedback>{userError.password}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="terms">Kullanım şartlarını onaylıyor musunuz? </Label>{" "}
          <br />
          <Input
            id="terms"
            type="checkbox"
            name="terms"
            onChange={changeHandler}
            checked={user.terms}
          />
          <FormFeedback>{userError.terms}</FormFeedback>
        </FormGroup>
        <Button
          data-cy="button"
          type="submit"
          disabled={!valid}
          color="success"
        >
          Gönder
        </Button>
      </form>
      <br />
      <h2 style={{ color: "rgb(255, 0, 0)" }}>Üyeler</h2>
      <br />
      {users.map(item => (
        <div
          data-cy="yeniUye"
          style={{
            border: "2px rgb(255, 0, 0) solid",
            width: "60vh",
            margin: "auto",
          }}
        >
          <p>
            <span style={{ fontWeight: "bold" }}>Üye Ad-Soyad:</span>{" "}
            {item.firstName} {item.surname}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Üye Mail Adresi</span>{" "}
            {item.email}
          </p>
        </div>
      ))}
      <br />
    </div>
  );
};

export default Form;
