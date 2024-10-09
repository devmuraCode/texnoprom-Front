import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Heading from "@/containers/Heading";
import Input from "@/components/Input/Input";
import Modal from "./Modal";
import { useAppDispatch } from "@/store/store";
import toast from 'react-hot-toast';
import useResetModal from "./hooks/useResetModal";
import { resetPassword } from "@/features/Auth/modal/service/ResetPassword";

type Inputs = {
  verification_code: string;
  new_password: string;
  phone_number: string;
};

const Reset_Password_Modal = () => {
  const resetModal = useResetModal();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    try {
      await dispatch(resetPassword(data)).unwrap();
      toast.success('Пароль успешно сброшен');
      resetModal.onClose();
    } catch (error) {
      toast.error('Ошибка сброса пароля');
    } finally {
      setIsLoading(false);
    }
  };

  const onToggle = useCallback(() => {
    resetModal.onClose();
  }, [resetModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Добро пожаловать в Технопром"
        subtitle="Сбросить пароль!"
      />
      <Input
        id="phone_number"
        name="phone_number"
        label="Номер телефона"
        disabled={isLoading}
        // @ts-ignore
        register={register}
        errors={errors}
        required
      />
      <Input
        id="verification_code"
        name="verification_code"
        label="Код подтверждения"
        type="text"
        disabled={isLoading}  
        // @ts-ignore
        register={register}
        errors={errors}
        required
      />
      <Input
        id="new_password"
        name="new_password"
        label="Новый пароль"
        type="password"
        disabled={isLoading}  
        // @ts-ignore
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
            Войти
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        disabled={isLoading}
        isOpen={resetModal.isOpen}
        title="Сбросить пароль"
        actionLabel="Сбросить"
        onClose={resetModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      />
    </div>
  );
};

export default Reset_Password_Modal;
