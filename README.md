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
- [3 -> 4] Explorer Revamp is still underway. Current updated Explorer jobs are **Bishop**, **Bowmaster**, and all **Pirates**
  - No Changes done to Bishop aside from Skill Images. Node Inventories from Version 1 should still be okay to use.
  - Bowmasters would need to rebuild Node inventory as some skills have been removed.
  - Buccaneers would need to rebuild Node inventory as some skills have been removed / merged in terms of boost nodes.
  - Cannoneers would have to adjust any skill number above 6 to 1 value lower as Monkey Wave was removed. (ex. A trinode saved as 2,7,12 it should be changed to become 2,6,11)
  - Corsairs would have to adjust any skill number above 1 to 2 values below it. (ex. A trinode saved as 2,7,12 should be changed to become 1,8,11) Sommersault Kick and Double Shot has boost nodes in the game files but are not implemented / long removed from the game. 
- [2 -> 3] Lara Skills have been translated. If switching from ver 2 -> 3, Change logic number to 3 and translate Lara's name (if the selected job of the save string is Lara[라라])
- [1 -> 2] Kain Skills have been translated. If switching from ver 1 -> 2 , Change logic number to 2 and translate Kain's name (if the selected job of the save string is Kain [카인])