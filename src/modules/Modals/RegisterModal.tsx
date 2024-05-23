import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "./hooks/useRegisterModal";
import useLoginModal from "./hooks/useLoginModal";
import Heading from "@/containers/Heading";
import Input from "@/components/Input/Input";
import Button from "@/containers/Button";
import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { authUser } from "@/features/Auth/modal/service/AuthUser";
import { useNavigate } from "react-router-dom";

type Inputs = {
  username: string;
  password: string;
};

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading] = useState(false);
  const dispatch = useAppDispatch();
  const loginForm = useAppSelector((state) => state.loginForm);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    dispatch(authUser(data));
  };

  useEffect(() => {
    if (loginForm.fulfilled) {
      registerModal.onClose();
      loginModal.onOpen();
    }
  }, [loginForm, navigate]);

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Добро пожаловать в Технопром"
        subtitle="Завести аккаунт!"
      />

      <Input
        id="username"
        name="username"
        label="Имя пользователя"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        name="password"
        label="Пароль"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />

      <div
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>
          У вас уже есть аккаунт?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {" "}
            Log in
          </span>
        </p>
      </div>
    </div>
  );
  return (
    <div>
      <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        // @ts-ignore
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      />
    </div>
  );
};

export default RegisterModal;
