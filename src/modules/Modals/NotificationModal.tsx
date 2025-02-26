import { useEffect } from "react";
import Heading from "@/containers/Heading";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import useNotificationModal from "./hooks/useNotificationModal";

const NotificationModal = () => {
  const notificationModal = useNotificationModal();

  const { handleSubmit } = useForm();

  useEffect(() => {
    const timer = setTimeout(() => {
      notificationModal.onOpen();
    }, 5000); 

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    notificationModal.onClose();
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Специальное предложение!"
        subtitle="Купите Prime-аккаунт и получите дополнительные преимущества."
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        Купить Prime-аккаунт
      </button>
    </div>
  );

  return (
    <Modal
      disabled={false}
      isOpen={notificationModal.isOpen}
      title="Премиум-доступ"
      actionLabel="Продолжить"
      onClose={notificationModal.onClose} 
      body={bodyContent}
      footer={footerContent}
      onSubmit={handleSubmit(handleClick)}
    />
  );
};

export default NotificationModal;
