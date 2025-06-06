import { SimpleGrid } from "@mantine/core";
import SkeletonCard from "../skeleton-card";

type Props = {
  items: number;
};
const HomeSkeleton = ({ items }: Props) => {
  return (
    <SimpleGrid cols={3} spacing="md">
      {Array.from({ length: items }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </SimpleGrid>
  );
};

export default HomeSkeleton;
