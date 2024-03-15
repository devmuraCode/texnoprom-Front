import Modal from "@/modules/Modals/Modal";
import useRegisterModal from "@/modules/Modals/hooks/useRegisterModal";
import { useCallback, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const Form = () => {
  const useRegister = useRegisterModal();
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid, errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {},
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

 

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const valueWithoutSpaces = event.target.value.replace(/\s/g, ''); // Удаление пробелов
    setPhoneNumber(valueWithoutSpaces);
  };

  const validatePhoneNumber = () => {
    const phoneNumberRegex = /^\+998\d{9}$/;
    if (!phoneNumber.match(phoneNumberRegex)) {
      alert(
        "Пожалуйста, введите правильный номер телефона Узбекистана. Например: +998901234567. (БЕЗ ПРОБЕЛОВ!)"
      );
      return false;
    }
    closeRegisterModal();
    return true;
  };

  const closeRegisterModal = () => {
    useRegister.onClose(); // Функция для закрытия модального окна
  };

  const getBodyByStep = () => {
    return (
      <div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Войти в кабинет
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={(e) => {
                e.preventDefault();
                validatePhoneNumber();
              }}
            >
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Номер телефона
                </label>
                <div className="mt-2">
                  <input
                    id="tel"
                    name="tel"
                    type="tel"
                    autoComplete="tel"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Пароль
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Забыли пароль?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={validatePhoneNumber}
                >
                  Войти
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Нету аккаунта?{" "}
              <a
                href="#"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Зарегистрироваться
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Modal
        disabled={!isValid}
        isOpen={useRegister.isOpen}
        onClose={useRegister.onClose}
        title="Texnoprom"
        body={getBodyByStep()}
        onSubmit={handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default Form;
