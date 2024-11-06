import { useState } from "react";
import ReigsterForm from "../components/forms/ReigsterForm";
import { IUserRegisterCredentials } from "../types/user";
import { reigsterUser } from "../services/users";
import { AxiosResponse } from "axios";
import HeroImage from "../assets/HeroImage.svg";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import routes from "../constants/routes";
import validationSchema from "../schemas/userRegisterSchema";
import validateForm from "../utils/validateForm";

const Register = () => {
  const [userCredentials, setUserCredentials] =
    useState<IUserRegisterCredentials>({
      displayName: "",
      email: "",
      password: "",
      username: "",
    });

  const [userCredentialsError, setUserCredentialsError] =
    useState<IUserRegisterCredentials>({
      displayName: "",
      email: "",
      password: "",
      username: "",
    });

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<AxiosResponse<any> | undefined> => {
    e.preventDefault();
    setLoading(true);
    console.log("cedentials: ", userCredentials);
    try {
      const { errors, isValid } = await validateForm(
        validationSchema,
        userCredentials
      );
      if (isValid) {
        const resp = await reigsterUser(userCredentials);

        if (resp?.data.message === "Username is already in use") {
          setUserCredentialsError({
            displayName: "",
            email: "",
            password: "",
            username: resp.data.message,
          });
        }

        if (resp?.data.message === "Email is already in use") {
          setUserCredentialsError({
            displayName: "",
            email: resp.data.message,
            password: "",
            username: "",
          });
        }
        if (resp?.data.message === "User created successfuly") {
          navigate(routes.LOGIN);
        }
        return resp;
      } else {
        setUserCredentialsError(errors);
      }
    } catch (error) {
      console.log("err ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-primary-blue flex items-center justify-center relative z-50">
      <div className="bg-secondary-gray text-white rounded-md min-w-[360px] max-w-4xl p-6 z-50 relative">
        <div
          className="flex items-center mb-4 cursor-pointer"
          onClick={() => navigate(routes.HOME)}
        >
          <IoIosArrowBack size={20} />
          <span>Go back</span>
        </div>
        <ReigsterForm
          userCredentials={userCredentials}
          loading={loading}
          handleRegister={handleRegister}
          setUserCredentials={setUserCredentials}
          userCredentialsError={userCredentialsError}
        />
      </div>

      <img
        src={HeroImage}
        alt="hero image"
        className="bg-cover absolute -z-10 bottom-0 right-0 w-full"
      />
    </div>
  );
};

export default Register;
