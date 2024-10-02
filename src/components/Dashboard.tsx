import CategoriesSidebar from "./CategoriesSidebar";
import ChatsDashboard from "./ChatsDashboard";

const Dashboard = () => {
  return (
    <div className="flex gap-5 h-full">
      <CategoriesSidebar />
      <ChatsDashboard />
    </div>
  );
};

export default Dashboard;
