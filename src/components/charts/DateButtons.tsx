import { Box, Button } from "@chakra-ui/react";
import { TFunction } from "i18next";

type DateButtonsProps = {
  translate: TFunction;
  startDate: string;
  setStartDate: (value: string) => void;
};
export const DateButtons = ({
  translate,
  setStartDate,
  startDate,
}: DateButtonsProps) => {

  const dates = [
    {
      value: "now-6M",
      label: `6 ${translate("month")}`,
    },
    {
      value: "now-1y",
      label: `1 ${translate("year")}`,
    },
    {
      value: "now-3y",
      label: `3 ${translate("year")}`,
    },
  ];

  return (
    <Box display="flex" gap="8px" mt="1rem" flexWrap="wrap">
      {dates.map(({ label, value }) => (
        <Button
          onClick={() => setStartDate(value)}
          key={label}
          size="xs"
          variant={startDate === value ? "solid" : "outline"}
        >
          {label}
        </Button>
      ))}
    </Box>
  );
};
