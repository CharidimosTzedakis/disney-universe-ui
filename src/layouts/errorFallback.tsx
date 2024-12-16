import { Alert, Button } from "antd";
import { FallbackProps } from "react-error-boundary";

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <Alert
      message="An Error Occurred"
      description={
        <div>
          <p>{error.message}</p>
          <Button type="primary" onClick={resetErrorBoundary}>
            Retry
          </Button>
        </div>
      }
      type="error"
      showIcon
    />
  );
}
