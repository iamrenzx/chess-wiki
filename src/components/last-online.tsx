import { IconClock } from "@tabler/icons-react";
import { formatTimeSince } from "../utils/date";
import StatCard from "./stat-card";
import { useEffect, useState } from "react";

type LastOnlineProps = {
  last_online: number;
};

const LastOnline = ({ last_online }: LastOnlineProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <StatCard
      icon={<IconClock size={20} />}
      color="orange"
      label="Last Online"
      value={`${formatTimeSince(last_online, currentTime)} ago`}
      monospace
    />
  );
};

export default LastOnline;
