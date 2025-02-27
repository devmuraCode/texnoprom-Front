import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import http from "@/services/http";

import useRegisterModal from "./hooks/useRegisterModal";

import Heading from "@/containers/Heading";

import Input from "@/components/Input";

import Modal from "./Modal";
import useForgotPasswordModal from "./hooks/useForgotPassword";
import useResetModal from "./hooks/useResetModal";
import { toast } from "react-toastify";

const Send_Reset_Code_Modal = () => {
  const forgotPasswordModal = useForgotPasswordModal();
  const resetModal = useResetModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await http.request.post("/users/send_reset_code/", {
        phone_number: data.phone_number,
      });

      localStorage.setItem("phone_number", data.phone_number);

      forgotPasswordModal.onClose();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      toast.error('Код для восстановления пароля отправлен на ваш номер телефона');
      resetModal.onOpen();
      setIsLoading(false);
    }
  };

  const onToggle = useCallback(() => {
    forgotPasswordModal.onClose();
    resetModal.onOpen();
  }, [forgotPasswordModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Cмс верификация"
        subtitle="Пожалуйста, введите свой номер телефона"
      />
      <Input
        id="phone_number"
        label="Номер телефона"
        name="phone_number"
        type="tel"
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

      <div className="text-neutral-500 text-center mt-4 font-light">
        <p>
          Впервые пользуетесь Технопромом?
          <span
            onClick={onToggle}
            className="text-neutral-800 cursor-pointer hover:underline"
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
      isOpen={forgotPasswordModal.isOpen}
      title="Забыли пароль?"
      actionLabel="Продолжить"
      onClose={forgotPasswordModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default Send_Reset_Code_Modal;
