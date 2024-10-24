import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "./hooks/useRegisterModal";
import Heading from "@/containers/Heading";
import Input from "@/components/Input/Input";
import Modal from "./Modal";
import { useAppDispatch } from "@/store/store";
import { authUser } from "@/features/Auth/modal/service/AuthUser";
import toast from 'react-hot-toast';
import useLoginModal from "./hooks/useLoginModal";
import useForgotPasswordModal from "./hooks/useForgotPassword";
import useVerify_phoneModal from "./hooks/useVerify_phoneModal";

type Inputs = {
  username: string;
  password: string;
  phone_number: string;
};

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const forgotPasswordModal = useForgotPasswordModal();
  const verifycationModal = useVerify_phoneModal()
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
      await dispatch(authUser(data)).unwrap();
      localStorage.setItem('phone_number', data.phone_number); 
      registerModal.onClose();
    } catch (error) {
      toast.error('Аккаунт уже существует');
    } finally {
      verifycationModal.onOpen();
      setIsLoading(false);
    }
  };

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
        // @ts-ignore
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
        // @ts-ignore
        register={register}
        errors={errors}
        required
      />
      <Input
        id="phone_number"
        name="phone_number"
        label="Номер телефона"
        type="tel"
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
            onClick={() => {
              loginModal.onOpen();
              registerModal.onClose();
            }}
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
        <p>
          Забыли пароль?
          <span
             onClick={() => {
              forgotPasswordModal.onOpen();
              registerModal.onClose();
            }}
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
        isOpen={registerModal.isOpen}
        title="Регистрация"
        actionLabel="Продолжить"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      />
    </div>
  );
};

export default RegisterModal;