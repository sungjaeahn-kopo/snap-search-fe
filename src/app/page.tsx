"use client";

import { useQuery } from "react-query";
import { leagueService } from "@/api/services/leagueService";
import { Country, League, Team } from "@/types/api";
import { Spinner } from "@/components/common/Spinner";
import Header from "@/components/common/Header";
import SeasonSelector from "@/components/common/SeasonSelector";
import { useState } from "react";
import { Box, Container } from "@mui/material";
import CountryCard from "@/components/common/CountryCard";
import Image from "next/image";
import LeagueCard from "@/components/common/LeagueCard";
import SelectionBreadcrumb from "@/components/common/SelectionBreadcrumb";
import TeamCard from "@/components/common/TeamCard";

export default function Home() {
  const [selectedSeason, setSelectedSeason] = useState("2024");
  const [selectedCountry, setSelectedCountry] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const { data: countries, isLoading: isLoadingCountries } = useQuery<
    Country[]
  >(["countries", selectedSeason], () =>
    leagueService.getCountries(selectedSeason)
  );

  const { data: leagues, isLoading: isLoadingLeagues } = useQuery<League[]>(
    ["leagues", selectedCountry?.id, selectedSeason],
    () => {
      if (!selectedCountry?.id) return Promise.resolve([]); // countryId가 없으면 빈 배열 반환
      return leagueService.getLeaguesByCountry(
        selectedCountry?.id,
        selectedSeason
      );
    },
    {
      enabled: !!selectedCountry?.id, // countryId가 있을 때만 호출
    }
  );

  const { data: teams, isLoading: isLoadingTeams } = useQuery<Team[]>(
    ["teams", selectedLeague?.id, selectedSeason],
    () => {
      if (!selectedCountry?.id || !selectedLeague?.id)
        return Promise.resolve([]); // countryId가 없으면 빈 배열 반환
      return leagueService.getTeamsByLeague(
        selectedCountry?.id,
        selectedLeague?.id,
        selectedSeason
      );
    },
    {
      enabled: !!selectedCountry?.id && !!selectedLeague?.id, // countryId가 있을 때만 호출
    }
  );

  if (isLoadingCountries || isLoadingLeagues || isLoadingTeams)
    return <Spinner />;
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
      <Box>
        <SelectionBreadcrumb
          selectedSeason={selectedSeason}
          selectedCountry={selectedCountry}
          selectedLeague={selectedLeague}
          onSeasonClick={() => {
            setSelectedCountry(null);
            setSelectedLeague(null);
          }}
          onCountryClick={() => {
            setSelectedLeague(null);
            // setSelectedCountry({ id: countryId, name: "국가 이름" }); // Replace with actual name
          }}
          onLeagueClick={() => {
            // setSelectedLeague({ id: leagueId, name: "리그 이름" }); // Replace with actual name
          }}
          onReset={() => {
            setSelectedSeason("2024");
            setSelectedCountry(null);
            setSelectedLeague(null);
          }}
        />
      </Box>
      {selectedSeason && !selectedCountry?.id && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "16px",
          }}
        >
          {countries?.map((country) => (
            <CountryCard
              key={country.countryId}
              countryName={country.countryName}
              countryFlag={country.countryFlag}
              countryId={country.countryId}
              onCountrySelect={() =>
                setSelectedCountry({
                  id: country.countryId,
                  name: country.countryName,
                })
              } // CountryCard 클릭 시 countryId 설정
            />
          ))}
        </Box>
      )}
      {selectedCountry?.id && !selectedLeague?.id && (
        <Box sx={{ mt: 4 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "16px",
            }}
          >
            {leagues?.map((league) => (
              <LeagueCard
                key={league.leagueId}
                leagueName={league.leagueName}
                leagueLogo={league.leagueLogo}
                leagueId={league.leagueId}
                onLeagueSelect={() =>
                  setSelectedLeague({
                    id: league.leagueId,
                    name: league.leagueName,
                  })
                } // LeagueCard 클릭 시 leagueId 설정
              />
            ))}
          </Box>
        </Box>
      )}
      {selectedCountry?.id && selectedLeague?.id && (
        <Box sx={{ mt: 4 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "16px",
            }}
          >
            {teams?.map((team) => (
              <TeamCard
                key={team.teamId}
                teamName={team.teamName}
                teamLogo={team.teamLogo}
              />
            ))}
          </Box>
        </Box>
      )}
    </Container>
  );
}
