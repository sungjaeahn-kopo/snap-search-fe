import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface SeasonSelectorProps {
  seasons: string[];
  selectedSeason: string;
  onSeasonChange: (season: string) => void;
}

const SeasonSelector: React.FC<SeasonSelectorProps> = ({
  seasons,
  selectedSeason,
  onSeasonChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel
        id="season-select-label"
        sx={{
          fontFamily: "SUIT", // Select에도 폰트 적용
          fontSize: "18px",
          fontWeight: 700,
        }}
      >
        시즌
      </InputLabel>
      <Select
        labelId="season-select-label"
        value={selectedSeason}
        sx={{
          fontFamily: "SUIT", // Select에도 폰트 적용
          fontSize: "16px",
        }}
        onChange={(e) => onSeasonChange(e.target.value)}
      >
        {seasons.map((season) => (
          <MenuItem key={season} value={season}>
            {season}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SeasonSelector;
