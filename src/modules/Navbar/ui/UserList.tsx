import useLoginModal from "@/modules/Modals/hooks/useLoginModal";
import useRegisterModal from "@/modules/Modals/hooks/useRegisterModal";
import { Menu } from "antd";

const UserList = () => {
  const registerModal = useRegisterModal();
  // @ts-ignore
  const loginModal = useLoginModal();
  return (
    <div className="relative bg-white">
      <div className="flex flex-row items-center gap-3">
        <div
          className="
              md:block
              text-sm 
              font-semibold 
              w-full
              py-3 
              px-4  
              hover:bg-neutral-100 
              transition 
              cursor-pointer
            "
        >
          <Menu mode="horizontal">
            <Menu.Item key="signup" onClick={registerModal.onOpen}>Sign up</Menu.Item>
          </Menu>
        </div>
      </div>

      <div
        className="
            absolute 
            shadow-md
            w-full
            bg-white 
            overflow-hidden 
            text-sm
          "
      >
        <div className="flex flex-col cursor-pointer">
          {/* КОНТЕНТ НАШИХ ПОЛЬЗОВАТЕЛЕЙ */}
          <div
            className="
              px-4 
              py-3 
              hover:bg-neutral-100 
              transition
              font-semibold
            "
          >
            {/* надо что то добавить */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
