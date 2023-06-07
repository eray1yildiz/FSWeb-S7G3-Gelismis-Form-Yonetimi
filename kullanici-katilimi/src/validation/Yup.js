import * as Yup from "yup";

export const formSchema = Yup.object().shape({
  firstName: Yup.string().trim().required("İsminizi giriniz"),

  surname: Yup.string().trim().required("Soy isminizi giriniz"),

  email: Yup.string().email("Mail adresinizi giriniz").required(),

  password: Yup.string()
    .required("Şifrenizi giriniz")
    .min(4, "şifre en az 4 karakter olmalı"),

  terms: Yup.boolean()
    .oneOf([true], "Kullanım şartlarını onaylayın")
    .required(),
});
