import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { ScopeLabels } from "../../interfaces/stadistics.interface";
import { DEFAULT_SCOPES_KEYS } from "../../config";

type ScopeButtonsProps = {
  scopeLabels: ScopeLabels;
  activeScope: string;
  setActiveScope: (value: string) => void;
  tabIndex: number;
};

export const ScopeButtons = ({
  activeScope,
  setActiveScope,
  scopeLabels,
  tabIndex
}: ScopeButtonsProps) => {

  
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
          {DEFAULT_SCOPES_KEYS.map((label: string, index: number) => (
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
