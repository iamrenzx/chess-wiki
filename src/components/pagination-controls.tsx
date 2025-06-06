import { Group, Pagination } from "@mantine/core";

type Props = {
  page: number;
  total: number;
  onChange: (page: number) => void;
};

const PaginationControls = ({ page, total, onChange }: Props) => {
  return (
    <Group justify="center" my="md">
      <Pagination
        mt="lg"
        value={page}
        withEdges
        withControls
        onChange={onChange}
        total={total}
      />
    </Group>
  );
};

export default PaginationControls;
