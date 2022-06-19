# Maplestory Tri-Node Builder (Beta v1.04)

## Purpose
The web application allows users to find and formulate their trinode sets.

## Features

- Allows users to input all their trinode combinations
- Real time feedback on the current state of the trinode set
- Nodescore
  - To faciliate easier nodestone selection, a score of -1 to 6 is given as to how useful a specific trinode currently is given the already selected trinode. 
  - A score of 1 is added for each skill in the trinode that is deemed a useful(selected by user). 
  - Another score is added for each useful skill to the current pool of trinodes as long as adding the selected trinode would result in the skill appearing a total of 2 times or less in the current pool.
- Compute for number of Ideal nodes and current node efficiency
- **[BETA]** Auto Build Function allows users to let the program try and build a perfect nodestone loadout using selected skills. (Function is only available if no node is currently equipped.)*.

## Things to do

- ~~Add a help section to explain how to use the application.~~
- ~~Add better Section Labels.~~
- ~~Add Show/Hide for Various Sections~~
- ~~Add Better Indicators for When a Skill is already in the pool more than twice.~~
- ~~Add Sorting for current trinodes created.~~
- ~~Add Saving and Loading feature to save all the created trinodes.~~
- ~~Add Support for all jobs.~~
- ~~Add A 2 or 3 Swap option (Some players who are starting up prefer to build three (Lv16, Lv17, Lv17) nodes per skill instead of two (Lv25, Lv25) nodes per skill.~~
- Update Help Section
- Code Cleanup
- Optimize Auto-Build
- **[NOT SURE]** Remove Image Path Dependency on Names (Switch to SkillIDs for easier porting to other languages)
- Add Support for other languages.

## Currently Supported Jobs

- All jobs that are currently out in GMS (every Job except MoXuan) is supported.
- MoXuan is Currently in Trad. Chinese until it comes out in GMS (If it will even release outside TMS/CMS).

## Notes
- \* = Function not tested fully and might sometimes return "No Optimal Combination" even though there should be one. Nodes are also built using brute force and might take minutes if there are a lot of nodes to build prefect tri's from. Might also cause browser to lock-up.

## Version Changes
- [3 -> 4] Explorer Revamp have been implemented. Aside from Bishop, Ice Lightning Mage, Jett, and Pathfinders, other explorers are advised to rebuild their Node Inventories.
  - All jobs should change logic number to 4
  - No Changes done to Bishop and Ice Lightning Mage aside from Skill Images and Skill Names(when applicable). Node Inventories from Version 1 should still be okay to use as long as logic number is adjusted.
  - Bowmasters would need to rebuild Node inventory as some skills have been removed.
  - Buccaneers would need to rebuild Node inventory as some skills have been removed / merged in terms of boost nodes.
  - Cannoneers would have to subtract 1 to any skill value above 6 as Monkey Wave was removed. (ex. A trinode saved as 2,7,12 it should be changed to become 2,6,11)
  - Corsairs would have to subtract 2 to any skill value above 1. (ex. A trinode saved as 2,7,12 should be changed to become 1,8,11) Sommersault Kick and Double Shot has boost nodes in the game files but are not implemented / long removed from the game.
  - Dark Knights would have to subtract 1 to any skill value above 2. Any trinode with a skill value of "1" needs to be converted to "0". This is due to the removal of Slash Blast boost nodes as these were added to the nodestone builder and are in the game files but are not implemented / long removed from the game. Piercing Drive's removal also moved the skills around.
  - Dual Blades would have to convert skill value of 5 (Upper Stab) to either 11 (Final Cut), 14 (Asura's Anger) or 15 (Blade Clone) and then subtract 1 to all skill node values above 5 (Due to the removal of Upper Stab). Do the two operation in order (i.e. Final Cut is currently Skill Value 10 but the 2nd operation of subtracting 1 to all skill node values above 5 will correct the first operation of converting 5 to 11)
  - Fire Poison Mages would have to subtract 1 to any skill value. This is due to Energy Orb being present in the builder / game files despite not being implemented / long removed.
  - Heroes would need to subtract 1 to any skill value. This was due to Slash Blast being in the builder even though it is not implemented / long removed from the game. (ex. a trinode saved as 2,4,5 would become 1,3,4).
  - Marksmen would need to rebuild Node inventory due to many skills changing into other nodes.
  - Night Lords would need to convert 5 (Shadow Web) to either 6 (Dark Flare), 10 (Sudden Raid), 12 (Death Star). All skill values would then be subtracted by 2 due to Double Stab and Lucky Seven's removal then all values above 2 (after all the previous adjustments) would be subtracted by 1 to account for Shadow Web's removal. (ex. 2,5,10 (Shuriken Burst, Shadow Web, Sudden Raid) becomes 2,6,10 (Shadow Web became Dark Flare) then finally 0,3,7).
  - Paladins would need to convert 3 (Blizzard Charge) to either 5 (Divine Judgement), 9 (Heaven's Hammer), or 10 (Smite Shield). All skill values would be subtracted by 1 to fix Slash Blast's removal. All skill values after that that has a value above 2 would be subtracted by 1 more to fix Blizzard Charge's Removal.
  - Shadowers would need to convert 2 (Steal) to either 7 (Dark Flare), 10 (Sudden Raid), or 11 (Shadow Veil) then subtract all skill values by 3 to account for Double Stab, Lucky Seven, and Steal's removal.
- [2 -> 3] Lara Skills have been translated. If switching from ver 2 -> 3, Change logic number to 3 and translate Lara's name (if the selected job of the save string is Lara[라라])
- [1 -> 2] Kain Skills have been translated. If switching from ver 1 -> 2 , Change logic number to 2 and translate Kain's name (if the selected job of the save string is Kain [카인])