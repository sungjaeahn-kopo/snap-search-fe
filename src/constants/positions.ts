// src/constants/positions.ts
export enum PlayerPosition {
  Goalkeeper = "goalkeepers",
  Defender = "defenders",
  Midfielder = "midfielders",
  Attacker = "attackers",
}

export const PlayerPositionLabel: Record<PlayerPosition, string> = {
  [PlayerPosition.Goalkeeper]: "골키퍼",
  [PlayerPosition.Defender]: "수비수",
  [PlayerPosition.Midfielder]: "미드필더",
  [PlayerPosition.Attacker]: "공격수",
};
