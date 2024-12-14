import { CloseCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import classes from "./clearSearchResultsButton.module.scss";
import useSearchStore from "@stores/searchStore";

export default function ClearSearchResultsButton() {
  const { isLoading, searchMode, resetFilter } = useSearchStore();

  if (isLoading || !searchMode) {
    return null;
  }

  return (
    <Button
      type="primary"
      color="default"
      variant="dashed"
      icon={<CloseCircleOutlined />}
      className={classes.clearButton}
      onClick={resetFilter}
    >
      Clear search results
    </Button>
  );
}
