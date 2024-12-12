import { useState } from "react";
import CharactersTable from "@components/charactersTable";
import CharacterDetailsModal from "@components/characterDetailsModal";
import { Flex, Layout, Typography, theme } from "antd";

const { Header, Content } = Layout;
const { Title } = Typography;

export default function DashboardLayout() {
  const [selectedCharacter, setSelectedCharacter] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Flex>
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            width: "100%",
            display: "flex",
            alignItems: "center",
            color: "white",
          }}
        >
          <Title level={2} style={{ color: "white", padding: 0 }}>
            Disney Characters Universe
          </Title>
        </Header>
        <Content
          style={{
            background: colorBgContainer,
            padding: 24,
            borderRadius: borderRadiusLG,
            maxWidth: 1600,
            height: "100vh",
          }}
        >
          <CharactersTable
            onCharacterSelect={({ id, name }: { id: number; name: string }) =>
              setSelectedCharacter({ id, name })
            }
          />
          <CharacterDetailsModal
            isOpen={!!selectedCharacter}
            selectedCharacter={selectedCharacter}
            onClose={() => {
              setSelectedCharacter(null);
            }}
          />
        </Content>
      </Layout>
    </Flex>
  );
}
