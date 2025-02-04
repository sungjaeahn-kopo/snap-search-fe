import { makeAutoObservable } from "mobx";

class TeamStore {
  teamLogo?: string;
  isScrolled: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setTeamLogo(logo?: string) {
    this.teamLogo = logo;
  }

  setIsScrolled(value: boolean) {
    this.isScrolled = value;
  }
}

export const teamStore = new TeamStore();
