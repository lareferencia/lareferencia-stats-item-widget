import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { ScopeLabels, Statistics } from "../../interfaces/stadistics.interface";

type ScopeButtonsProps = {
  scopeLabels: ScopeLabels;
  activeScope: string;
  setActiveScope: (value: string) => void;
  tabIndex: number;
  data: Statistics;
};

export const ScopeButtons = ({
  activeScope,
  setActiveScope,
  scopeLabels,
  tabIndex,
  data
}: ScopeButtonsProps) => {

  const scopes = [...data.level.buckets.map((bucket) => bucket.key), "ALL"];
  
  return (
    <Box display="flex" gap="8px" mt="1rem" flexWrap="wrap">
      <Menu>
        <MenuButton
          isDisabled={ tabIndex !== 0}
          as={ Button }
          rightIcon={ <ChevronDownIcon /> }
          size="xs"
          variant="outline"
        >
          {scopeLabels[activeScope as keyof ScopeLabels]}
        </MenuButton>
        <MenuList>
          {scopes.map((label: string, index: number) => (
            <MenuItem
              key={index}
              onClick={() => setActiveScope(label)}
              fontSize="sm"
            >
              {scopeLabels[label as keyof ScopeLabels]}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};
