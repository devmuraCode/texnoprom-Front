import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { httpsClient } from "@/services/httpClient";

import Heading from "@/containers/Heading";

import Input from "@/components/Input";

import Modal from "./Modal";
import { useAppSelector } from "@/store/store";
import useUzumModal from "./hooks/useUzumModa";

const UzumModal = () => {
  const uzumModal = useUzumModal();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const { cartItems } = useAppSelector((state) => state.cart);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const { data: response } = await httpsClient.post(
        "uzum/nasiya/check-status",
        data,
        {
          headers,
        }
      );
      window.location.href = response.message.data.webview;
      setData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      uzumModal.onClose();
    }
  };

  const onToggle = useCallback(() => {
    uzumModal.onOpen();
  }, [uzumModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="phone"
        name="phone"
        label="Phone"
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
      <div className="text-neutral-500 text-center mt-4 font-light">
        <p>
          First time using Airbnb?
          <span
            onClick={onToggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            {" "}
            Create an account
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={uzumModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={uzumModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default UzumModal;
