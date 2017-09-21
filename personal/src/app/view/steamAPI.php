<?php
/**
 * Copyright 2016 Eric Enold <zyberspace@zyberware.org>
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
    $api_key = "99039202C2DC3A22DE55D4BB48384F7A";
    $steamid = "76561198017422646";

    //function getSteamBaseInfo() {
        //const BASE_URL = 'https://api.steampowered.com/';
       
        $api_url = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=$api_key&steamids=$steamid";
        /*
        http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=99039202C2DC3A22DE55D4BB48384F7A&steamids=76561198017422646
        */

        /*
        {
          "response": {
            "players": [
              {
                "steamid": "76561198017422646",
                "communityvisibilitystate": 3,
                "profilestate": 1,
                "personaname": "include beer.h",
                "lastlogoff": 1469799019,
                "profileurl": "http://steamcommunity.com/profiles/76561198017422646/",
                "avatar": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ff/ffe261c16ac3202cec0ccf543f8c98c634597b2c.jpg",
                "avatarmedium": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ff/ffe261c16ac3202cec0ccf543f8c98c634597b2c_medium.jpg",
                "avatarfull": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ff/ffe261c16ac3202cec0ccf543f8c98c634597b2c_full.jpg",
                "personastate": 1,
                "primaryclanid": "103582791432279787",
                "timecreated": 1259782893,
                "personastateflags": 0,
                "gameextrainfo": "Total War: WARHAMMER",
                "gameid": "364360"
              }
            ]
          }
        }
        */


        $steamJson = json_decode(file_get_contents($api_url),true);
        
        //return $steamJson; 
        $steamName = $steamJson["response"]["players"][0]["personaname"];
        $steamCommunityPage = $steamJson["response"]["players"][0]["profileurl"];
        $steamUserImg = $steamJson["response"]["players"][0]["avatarfull"];

        if(isset($steamJson["response"]["players"][0]["gameextrainfo"])) {
            $steamCurrentGameName = $steamJson["response"]["players"][0]["gameextrainfo"];
        }
        if(isset($steamJson["response"]["players"][0]["gameid"])) {
            $steamCurrentGameID = $steamJson["response"]["players"][0]["gameid"];
        }

        
        $steamOnline = intval($steamJson["response"]["players"][0]["personastate"]);
        /*

             http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=99039202C2DC3A22DE55D4BB48384F7A&steamid=76561198017422646&format=json
        */
        $api_game_url = "http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=$api_key&steamid=$steamid&format=json";
        $gameJson = json_decode(file_get_contents($api_game_url),true);
        // Recent game #1
        $steamRecentGamePlayingID0 = $gameJson["response"]["games"][0]["appid"];
        $steamRecentGameName0 = $gameJson["response"]["games"][0]["name"];        
        $steamGamePlayingImg0 = $gameJson["response"]["games"][0]["img_logo_url"]; 
        $steamRecentGamePlayTime0 =  $gameJson["response"]["games"][0]["playtime_forever"]; 
        // Recent game #2
        $steamRecentGamePlayingID1 = $gameJson["response"]["games"][1]["appid"];
        $steamRecentGameName1 = $gameJson["response"]["games"][1]["name"];        
        $steamGamePlayingImg1 = $gameJson["response"]["games"][1]["img_logo_url"]; 
        $steamRecentGamePlayTime1 =  $gameJson["response"]["games"][1]["playtime_forever"]; 
        // Recent game #3
        $steamRecentGamePlayingID2 = $gameJson["response"]["games"][2]["appid"];       
        $steamRecentGameName2 = $gameJson["response"]["games"][2]["name"];        
        $steamGamePlayingImg2 = $gameJson["response"]["games"][2]["img_logo_url"];
        $steamRecentGamePlayTime2 =  $gameJson["response"]["games"][2]["playtime_forever"]; 
    // }


    // function getSteamGameInfo($appId) {
        // 
        // $gameJson = json_decode(file_get_contents($api_url),true);
        //return $gameJson;
    //}
?>