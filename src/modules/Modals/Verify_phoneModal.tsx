import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import http from "@/services/http";

import useRegisterModal from "./hooks/useRegisterModal";

import Heading from "@/containers/Heading";

import Input from "@/components/Input";

import Modal from "./Modal";
import useVerify_phoneModal from "./hooks/useVerify_phoneModal";
import useResetModal from "./hooks/useResetModal";

const Verify_phoneModal = () => {
  const verifycationModal = useVerify_phoneModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const phoneNumber = localStorage.getItem('phone_number');
    setIsLoading(true);
    const phoneData = {
      ...data,
      phone_number: phoneNumber || data.phone_number, 
    };
    console.log(phoneData);
    
    try {
      const response = await http.request.post(
        "/users/verify-phone/",
        phoneData
      );
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("user_id", response.data.user_id);
      verifycationModal.onClose();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onToggle = useCallback(() => {
    verifycationModal.onClose();
  }, [verifycationModal]);

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
      isOpen={verifycationModal.isOpen}
      title="Cмс верификация"
      actionLabel="Продолжить"
      onClose={verifycationModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default Verify_phoneModal;
