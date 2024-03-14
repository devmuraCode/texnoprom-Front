import Modal from "@/modules/Modals/Modal";
import useRegisterModal from "@/modules/Modals/hooks/useRegisterModal";
import { FieldValues, useForm } from "react-hook-form";

const Form = () => {
    const useRegister = useRegisterModal();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { isValid, errors },
        reset,
      } = useForm<FieldValues>({
        defaultValues: {
          
        },
      });

    const onSubmit = (data: FieldValues) => {
        console.log(data);
    }
      
    const getBodyByStep = () => {
        return(
            <div>
                <h1>Texnoprom</h1>
            </div>
        )
    }

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
