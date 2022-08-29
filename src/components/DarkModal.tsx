import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { ContentsListingModalProps } from "../types/components/DarkModal";

const DarkModal = ({
  isOpen,
  onClose,
  children,
}: ContentsListingModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.700" />
      <ModalContent
        maxW="850px"
        p="20px"
        bgColor="modalBgBlack"
        color="fontWhite"
      >
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DarkModal;
