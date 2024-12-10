import { Provider } from "urql";
import DashboardLayout from "@layouts/dashboardLayout";
import urqlClient from "@api/urqlClient";

function App() {
  return (
    <Provider value={urqlClient}>
      <DashboardLayout />
    </Provider>
  );
}

export default App;
