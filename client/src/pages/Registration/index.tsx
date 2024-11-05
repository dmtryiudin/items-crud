import { useState } from "react";
import { Button, ErrorBanner, Input, NavLink } from "../../components";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./styles.module.scss";
import { Inputs } from "./types";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    try {
      const { data: response } = await api.post<{ accessToken: string }>(
        "/auth/registration",
        { ...data }
      );

      if (!response.accessToken) {
        throw new Error();
      }

      localStorage.setItem("accessToken", response.accessToken);
      return navigate("/");
    } catch (e: any) {
      const status = e.status;
      const message = e?.response?.data?.message;

      if ((status === 401 || status === 400) && message) {
        setError(message);
      } else {
        setError("Something went wrong. Try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const closeErrorBanner = () => {
    setError("");
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <ErrorBanner isOpened={!!error} close={closeErrorBanner} text={error} />
      <h2 className={styles.heading}>Create new account</h2>
      <Input
        label="Username"
        error={errors.username?.message}
        placeholder="Username"
        {...register("username", {
          required: "This field is required",
          maxLength: { value: 70, message: "Max length is 70" },
        })}
      />
      <Input
        label="Password"
        error={errors.password?.message}
        placeholder="Password"
        type="password"
        {...register("password", {
          required: "This field is required",
          pattern: {
            value:
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            message:
              "Minimum eight characters, at least one letter, one number and one special character",
          },
        })}
      />
      <div className={styles.formBottom}>
        <div className={styles.buttonsWrapper}>
          <Button type="submit" isLoading={isLoading}>
            Create account
          </Button>
          <Button onClick={() => reset()} variant="secondary" type="reset">
            Reset
          </Button>
        </div>
        <NavLink to="/auth/login">Login</NavLink>
      </div>
    </form>
  );
};
