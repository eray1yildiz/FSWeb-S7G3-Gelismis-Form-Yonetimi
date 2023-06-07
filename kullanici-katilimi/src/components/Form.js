import { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Label, FormFeedback, Input, FormGroup } from "reactstrap";
import { formSchema } from "../validation/Yup";

const Form = () => {
  const [user, setUser] = useState({
    firstName: "",
    surname: "",
    email: "",
    password: "",
    terms: false,
  });

  const [kullanicilar, setKullanicilar] = useState([]);

  const [userError, setUserError] = useState({
    firstName: "",
    surname: "",
    email: "",
    password: "",
    terms: "",
  });

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
      axios.post("https://reqres.in/api/users", user).then(res => {
        setKullanicilar([...kullanicilar, res.data]);
      });
    }
  };

  const validation = (name, value) => {
    Yup.reach(formSchema, name)
      .validate(value)
      .then(() => {
        setUserError({ ...userError, [name]: "" });
      })
      .catch(err => {
        setUserError({ ...userError, [name]: err.errors[0] });
      });
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
          <Label for="name">İsim: </Label>
          <Input
            id="name"
            type="text"
            name="firstName"
            onChange={changeHandler}
            value={user.firstName}
            invalid={!!userError.firstName}
            placeholder="isminizi giriniz"
          />
          <FormFeedback>{userError.firstName}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="surname">Soyisim: </Label>
          <Input
            id="surname"
            type="text"
            name="surname"
            onChange={changeHandler}
            value={user.surname}
            invalid={!!userError.surname}
            placeholder="soyisminizi giriniz"
          />
          <FormFeedback>{userError.surname}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="mail">Email: </Label>
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
          <Label for="password">Şifre: </Label>
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
          <Label for="terms">Kullanım Şartları:</Label>
          <Input
            id="terms"
            type="checkbox"
            name="terms"
            onChange={changeHandler}
            checked={user.terms}
          />
          <FormFeedback>{userError.terms}</FormFeedback>
        </FormGroup>
        <button type="submit" value="submit" disabled={!valid}>
          Gönder
        </button>
      </form>
      {kullanicilar.map(item => (
        <p>{item.firstName}</p>
      ))}
    </div>
  );
};

export default Form;
