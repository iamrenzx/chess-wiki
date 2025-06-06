import { Center, Stack, Text, Button } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

const ErrorFallback = ({ onRetry }: { onRetry?: () => void }) => {
  return (
    <Center h="100%">
      <Stack align="center">
        <IconAlertTriangle size={64} color="red" />
        <Text size="xl" fw={700} c="red">
          Something went wrong
        </Text>
        <Text c="dimmed" ta="center">
          We couldn't load the data. Please try again later.
        </Text>
        {onRetry && (
          <Button variant="light" color="white" onClick={onRetry}>
            Retry
          </Button>
        )}
      </Stack>
    </Center>
  );
};

export default ErrorFallback;
