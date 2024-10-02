import Files from "./Files";
import InfoItems from "./InfoItems";
import Members from "./Members";

const ChatInfo = () => {
  return (
    <div className="flex-[0.5] flex flex-col gap-3">
      <InfoItems />
      <Members />
      <Files />
    </div>
  );
};

export default ChatInfo;
