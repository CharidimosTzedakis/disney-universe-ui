import { Modal } from "antd";
import { useQuery } from "urql";
import { characterDetailsQueryDocument } from "@api/gqlQueries";
import { Typography, Image } from "antd";
import characterPlaceholder from "../../assets/characterPlaceholder.png";

const { Title } = Typography;

const TvShowsList = ({ tvShows }: { tvShows: (string | null)[] }) => (
  <ul>
    {tvShows
      .filter((tvShow) => Boolean(tvShow))
      .map((tvShow) => (
        <li key={tvShow}>{tvShow}</li>
      ))}
  </ul>
);

const VideoGamesList = ({ videoGames }: { videoGames: (string | null)[] }) => (
  <ul>
    {videoGames
      .filter((videoGame) => Boolean(videoGame))
      .map((videoGame) => (
        <li key={videoGame}>{videoGame}</li>
      ))}
  </ul>
);

export default function CharacterDetailsModal({
  selectedCharacter,
  isOpen,
  onClose,
}: {
  selectedCharacter: { id: number; name: string } | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [result] = useQuery({
    query: characterDetailsQueryDocument,
    variables: {
      filter: {
        id: selectedCharacter?.id,
      },
    },
  });
  const { data, fetching } = result;
  const { tvShows, videoGames, imageUrl } = data?.characters?.items?.[0] ?? {};

  return (
    <Modal
      title={selectedCharacter?.name}
      open={isOpen}
      onCancel={onClose}
      loading={fetching}
      footer={null}
    >
      <Image
        width={400}
        src={imageUrl ?? ""}
        alt={selectedCharacter?.name}
        preview={false}
        fallback={characterPlaceholder}
      />
      <Title level={5}>TV shows</Title>
      {tvShows && tvShows?.length > 0 ? <TvShowsList tvShows={tvShows} /> : "-"}
      <Title level={5}>Video games</Title>
      {videoGames && videoGames?.length > 0 ? (
        <VideoGamesList videoGames={videoGames} />
      ) : (
        "-"
      )}
    </Modal>
  );
}
