import { useAuth } from "../../context/AuthProvider";
import { FaAngleDown, FaDiscord } from "react-icons/fa";
import { useState } from "react";
import ServerMenu from "../serverByName/ServerMenu";
import { IoClose } from "react-icons/io5";
import Modal from "../ui/Modal";
import ServerInvitationModal from "../serverByName/ServerInvitationModal";
import Channels from "../channels/Channels";
import { IServer } from "../../types/servers";
import SideBarTools from "../shared/SideBarTools";

interface IServerSideBarProps {
  serverName: string;
  serverByName: IServer;
}

const ServerSideBar = ({ serverName, serverByName }: IServerSideBarProps) => {
  const { user } = useAuth();

  const [displayServerMenu, setDisplayServerMenu] = useState<boolean>(false);
  const [dispalyInvitationModal, setDisplayInvitaionModal] =
    useState<boolean>(false);
  const handleToggleServerMenu = () => {
    setDisplayServerMenu(!displayServerMenu);
  };
  const onOpenUserInvitationModal = () => {
    setDisplayInvitaionModal(true);
  };
  const handleCloseInvitationModal = () => {
    setDisplayInvitaionModal(false);
  };
  return (
    <div className="min-w-64 min-h-screen max-h-screen bg-accent-gray text-white flex flex-col justify-between">
      <div>
        <div
          onClick={handleToggleServerMenu}
          className="py-3 px-2 flex items-center justify-between border-b border-primary-gray hover:bg-hover-gray cursor-pointer relative"
        >
          <h1>{serverName}</h1>
          {displayServerMenu ? (
            <IoClose className="cursor-pointer" size={20} />
          ) : (
            <FaAngleDown className="cursor-pointer" size={20} />
          )}
          {displayServerMenu && (
            <ServerMenu onOpenUserInvitationModal={onOpenUserInvitationModal} />
          )}
        </div>

        <section className="cursor-pointer hover:bg-hover-gray p-2 mt-2 border-b border-gray-500">
          Events
        </section>
        <Channels serverByName={serverByName} />
      </div>
      <footer className="bg-primary-gray py-2 px-2 flex justify-between">
        {/* profile */}
        <div className="flex gap-1 rounded-md hover:bg-hover-gray cursor-pointer items-center p-1">
          <div className="bg-pink-500 min-w-9 h-9 aspect-square rounded-full flex items-center justify-center">
            <FaDiscord size={25} className="text-white" />
          </div>
          <div className="text-sm text-white">
            <h1>{user?.username}</h1>
            <h2>Online</h2>
          </div>
        </div>
        <SideBarTools />
      </footer>
      {dispalyInvitationModal && (
        <Modal>
          <ServerInvitationModal
            serverName={serverName}
            handleCloseModal={handleCloseInvitationModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default ServerSideBar;
