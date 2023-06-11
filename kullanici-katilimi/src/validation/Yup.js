import * as Yup from "yup";

export const formSchema = Yup.object().shape({
  firstName: Yup.string().trim().required("Lütfen isiminizi giriniz"),
  surname: Yup.string().trim().required("Lütfen soyisiminizi giriniz"),
  email: Yup.string().email("Lütfen mail adresinizi giriniz").required(),
  password: Yup.string()
    .required("Lütfen şifrenizi giriniz")
    .min(5, "Şifreniz en az 5 karakterden oluşmalıdır"),
  terms: Yup.boolean()
    .oneOf([true], "Kullanım şartlarını onaylamalısınız")
    .required(),
});
