"use client";

import { useQuery } from "react-query";
import { leagueService } from "@/api/services/leagueService";
import { Country } from "@/types/api";
import Image from "next/image";
import { Spinner } from "@/components/common/Spinner";
import Header from "@/components/common/Header";
import SeasonSelector from "@/components/common/SeasonSelector";
import { useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import CountryCard from "@/components/common/CountryCard";

export default function Home() {
  const [selectedSeason, setSelectedSeason] = useState("2024");
  const { data, isLoading, error } = useQuery<Country[]>(
    ["countries", selectedSeason],
    () => leagueService.getCountries(selectedSeason),
    {
      keepPreviousData: true, // 이전 데이터 유지 (UI 깜빡임 방지)
      refetchOnWindowFocus: false, // 포커스 이동시, 재호출 방지
    }
  );

  if (isLoading) return <Spinner />;
  // if (error) return <div>에러가 발생했습니다</div>;

  const seasons = Array.from({ length: 13 }, (_, i) => (2024 - i).toString());

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Header platformName="SNAP-SEARCH" />
      <Box sx={{ mt: 4, mb: 4 }}>
        <SeasonSelector
          seasons={seasons}
          selectedSeason={selectedSeason}
          onSeasonChange={setSelectedSeason}
        />
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
        }}
      >
        {data?.map((country) => (
          <CountryCard
            key={country.countryId}
            countryName={country.countryName}
            countryFlag={country.countryFlag}
          />
        ))}
      </Box>
    </Container>
  );
}
