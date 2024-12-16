import { useState } from "react";
import { Flex, Layout, Typography, theme, Divider } from "antd";
import { ErrorBoundary } from "react-error-boundary";
import CharactersTable from "@components/charactersTable";
import CharacterDetailsModal from "@components/characterDetailsModal";
import SearchForm from "@components/searchForm";
import CharactersPieChart from "@components/pieChart";
import ClearSearchResultsButton from "@components/clearSearchResultsButton";
import ErrorFallback from "@layouts/errorFallback";
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
          <Flex>
            <Title level={2}>Characters Table</Title>
            <ClearSearchResultsButton />
          </Flex>
          <Flex vertical={false} wrap align="center" gap="middle">
            <CharactersTable
              onCharacterSelect={({ id, name }: { id: number; name: string }) =>
                setSelectedCharacter({ id, name })
              }
            />
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              fallback={undefined}
            >
              <CharactersPieChart />
            </ErrorBoundary>
          </Flex>

          <ErrorBoundary FallbackComponent={ErrorFallback} fallback={undefined}>
            <CharacterDetailsModal
              isOpen={!!selectedCharacter}
              selectedCharacter={selectedCharacter}
              onClose={() => {
                setSelectedCharacter(null);
              }}
            />
          </ErrorBoundary>
        </Content>
      </Layout>
    </Flex>
  );
}
