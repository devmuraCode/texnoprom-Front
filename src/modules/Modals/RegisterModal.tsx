import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "./hooks/useRegisterModal";
import useLoginModal from "./hooks/useLoginModal";
import Heading from "@/containers/Heading";
import Input from "@/components/Input/Input";
import Modal from "./Modal";
import { useAppDispatch } from "@/store/store";
import { authUser, loginUser } from "@/features/Auth/modal/service/AuthUser";
import toast from 'react-hot-toast';
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
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    try {
      await dispatch(authUser(data)).unwrap();
      await dispatch(loginUser(data)).unwrap();
      toast.success('Аккаунт успешно создан')
      registerModal.onClose();
    } catch (error) {
      toast.error('Аккаунт уже существует');
    } finally {
      setIsLoading(false);
    }
  };

  const onToggle = useCallback(() => {
    registerModal.onClose();
  }, [registerModal, loginModal]);

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
