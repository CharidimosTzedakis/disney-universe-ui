import { Provider } from "urql";
import DashboardLayout from "@layouts/dashboardLayout";
import urqlClient from "@api/urqlClient";
import "antd/dist/reset.css"; //antd css reset

function App() {
  return (
    <Provider value={urqlClient}>
      <DashboardLayout />
    </Provider>
  );
}

export default App;
