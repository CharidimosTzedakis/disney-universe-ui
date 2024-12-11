import { Modal } from "antd";
// import { useQuery } from "urql";

export default function CharacterDetailsModal({
  characterId,
  isOpen,
  onClose,
}: {
  characterId: number | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal title="Dummy Modal" open={isOpen} onClose={onClose}>
      <p>CharacterId is</p>
      <p>{characterId}</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
}
