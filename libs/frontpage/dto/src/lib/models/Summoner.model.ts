export interface Summoner {
   /**
   * ID of the summoner icon associated with the summoner.
   */
  profileIconId: number;
  /**
   * Summoner name
   */
  name: string;
  /**
   * Encrypted PUUID. Exact length of 78 characters.
   */
  puuid: string;
  /**
   * Summoner level associated with the summoner.
   */
  summonerLevel: number;
  /**
   * Date summoner was last modified specified as epoch milliseconds. The following events will update this timestamp: profile icon change, playing the tutorial or advanced tutorial, finishing a game, summoner name change
   */
  revisionDate: number;
  /**
   *  Encrypted summoner ID. Max length 63 characters.
   */
  id: string;
  /**
   * Encrypted account ID. Max length 56 characters.
   */
  accountId: string;
}
