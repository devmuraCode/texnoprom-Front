import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "./hooks/useRegisterModal";
import Heading from "@/containers/Heading";
import Input from "@/components/Input/Input";
import Modal from "./Modal";
import { useAppDispatch } from "@/store/store";
import { authUser } from "@/features/Auth/modal/service/AuthUser";
import toast from 'react-hot-toast';
import useLoginModal from "./hooks/useLoginModal";

type Inputs = {
  username: string;
  password: string;
};

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
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
      registerModal.onClose();
    } catch (error) {
      toast.error('Аккаунт уже существует');
    } finally {
      setIsLoading(false);
    }
  };

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
