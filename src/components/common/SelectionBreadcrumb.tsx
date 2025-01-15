import React from "react";
import { Box, Typography, Breadcrumbs, Link, Button } from "@mui/material";

interface SelectionBreadcrumbProps {
  selectedSeason: string;
  selectedCountry?: { id: number; name: string } | null;
  selectedLeague?: { id: number; name: string } | null;
  onSeasonClick: () => void;
  onCountryClick?: () => void;
  onLeagueClick?: () => void;
  onReset?: () => void; // 선택 초기화를 위한 콜백 함수
}

const SelectionBreadcrumb: React.FC<SelectionBreadcrumbProps> = ({
  selectedSeason,
  selectedCountry,
  selectedLeague,
  onSeasonClick,
  onCountryClick,
  onLeagueClick,
  onReset,
}) => {
  return (
    <Box
      sx={{
        padding: "16px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        marginBottom: "16px",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: "SUIT",
          fontWeight: 600,
          marginBottom: "16px",
          textAlign: "center",
        }}
      >
        현재 선택 상태
      </Typography>

      {/* Breadcrumbs */}
      <Breadcrumbs
        separator=">"
        aria-label="breadcrumb"
        sx={{
          fontFamily: "SUIT",
          fontSize: "14px",
          fontWeight: 400,
          marginBottom: "16px",
        }}
      >
        {/* 시즌 */}
        <Link
          underline="hover"
          color="inherit"
          onClick={onSeasonClick}
          sx={{
            cursor: "pointer",
            fontWeight: 500,
            fontSize: "14px",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          {selectedSeason}
        </Link>

        {/* 국가 */}
        {selectedCountry?.name &&
          (onCountryClick ? (
            <Link
              underline="hover"
              color="inherit"
              onClick={onCountryClick}
              sx={{
                cursor: "pointer",
                fontWeight: 500,
                fontSize: "14px",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {selectedCountry?.name}
            </Link>
          ) : (
            <Typography
              color="text.primary"
              sx={{
                fontFamily: "SUIT",
                fontWeight: 500,
                fontSize: "14px",
              }}
            >
              {selectedCountry?.name}
            </Typography>
          ))}

        {/* 리그 */}
        {selectedLeague?.name &&
          (onLeagueClick ? (
            <Link
              underline="hover"
              color="inherit"
              onClick={onLeagueClick}
              sx={{
                cursor: "pointer",
                fontWeight: 500,
                fontSize: "14px",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {selectedLeague?.name}
            </Link>
          ) : (
            <Typography
              color="text.primary"
              sx={{
                fontFamily: "SUIT",
                fontWeight: 500,
                fontSize: "14px",
              }}
            >
              {selectedLeague?.name}
            </Typography>
          ))}
      </Breadcrumbs>

      {/* 초기화 버튼 */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={onReset}
        fullWidth
        sx={{
          fontFamily: "SUIT",
          fontSize: "14px",
          textTransform: "none",
          fontWeight: 400,
        }}
      >
        선택 초기화
      </Button>
    </Box>
  );
};

export default SelectionBreadcrumb;
