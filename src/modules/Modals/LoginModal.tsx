import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import http from "@/services/http";

import useLoginModal from "./hooks/useLoginModal";
import useRegisterModal from "./hooks/useRegisterModal";

import Heading from "@/containers/Heading";

import Input from "@/components/Input";

import Modal from "./Modal";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const phoneData = {
      ...data,
      phone_number: data.phone_number,
    };
    console.log(phoneData);
    
    try {
      const response = await http.request.post(
        "/users/verify-phone/",
        phoneData
      );
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("user_id", response.data.user_id);
      loginModal.onClose();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Добро пожаловать"
        subtitle="Войдите в свою учетную запись!"
      />
      <Input
        id="verification_code"
        label="Пароль"
        name="verification_code"
        type="text"
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
      text-neutral-500 text-center mt-4 font-light"
      >
        <p>
          Впервые пользуетесь Технопромом?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {" "}
            Завести аккаунт
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Логин"
      actionLabel="Продолжить"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
