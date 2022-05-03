import { ActivePlayerData } from "./ActivePlayerData.model";
import { LiveGameEvent } from "./LiveGameEvent.model";
import { LiveGameInfo } from "./LiveGameInfo.model";
import { LivePlayerData } from "./LivePlayerData.model";

export interface LiveGameData {
  activePlayer: ActivePlayerData;
  allPlayers: LivePlayerData[];
  events: {
    Events: LiveGameEvent[];
  }
  gameData: LiveGameInfo;
}
