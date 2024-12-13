import { useState } from "react";
import { Flex, Layout, Typography, theme, Divider } from "antd";
import CharactersTable from "@components/charactersTable";
import CharacterDetailsModal from "@components/characterDetailsModal";
import SearchForm from "@components/searchForm";
import CharactersPieChart from "@components/pieChart";
import classes from "./dashboardLayout.module.scss";

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
        <Header className={classes.headerContainer}>
          <Title level={2}>Disney Characters Universe</Title>
        </Header>
        <Content
          className={classes.contentContainer}
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Title level={2}>Search characters</Title>
          <Flex>
            <SearchForm />
          </Flex>
          <Divider />
          <Title level={2}>Characters Table</Title>
          <Flex vertical={false} wrap align="center" gap="middle">
            <CharactersTable
              onCharacterSelect={({ id, name }: { id: number; name: string }) =>
                setSelectedCharacter({ id, name })
              }
            />
            <CharactersPieChart />
          </Flex>

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
