import Heading from "@/containers/Heading";
import Modal from "./Modal";
import useWelcomeModal from "./hooks/useWelcomeModal";
import { useForm } from "react-hook-form";

const WelcomeModal = () => {
  const welcomeModal = useWelcomeModal();

  const {
    handleSubmit,
    // @ts-ignore
    formState: { errors },
  } = useForm();

  // @ts-ignore
  const handleClick = (e: any) => {
    welcomeModal.onClose();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Добро пожаловать в Технопром"
        subtitle="вы успешно зарегистрировались"
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
      ></div>
    </div>
  );

  return (
    <div>
      <Modal
        disabled={false}
        isOpen={welcomeModal.isOpen}
        title=""
        actionLabel="Продолжить"
        onClose={handleSubmit(handleClick)}
        body={bodyContent}
        footer={footerContent}
        onSubmit={handleSubmit(handleClick)}
      />
    </div>
  );
};

export default WelcomeModal;
