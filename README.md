# Maplestory Tri-Node Builder (Beta v1.06)

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
- **[BETA]** Auto Build Function allows users to let the program try and build a perfect nodestone loadout using selected skills.*.

## Things to do

- **[NOT SURE]** Remove Image Path Dependency on Names (Switch to SkillIDs for easier porting to other languages)
- Add Support for other languages.

## Currently Supported Jobs

- All jobs that are currently out in GMS (every Job except MoXuan) is supported.
- MoXuan is Currently in Trad. Chinese until it comes out in GMS (If it will even release outside TMS/CMS).

## Notes
- \* = Function not tested fully and might sometimes return "No Optimal Combination" even though there should be one (Mostly happens when less than 3 skills are selected or if you already have more trios equipped than the number of trios to make your perfect loadout). Nodes are also built using brute force and might take minutes if there are a lot of nodes to build prefect tri's from. Might also cause browser to lock-up. If that happens, please use the Async Solver to move the solving to a web worker. 
- \* = While not fully tested, it is possible to equip some of the trios as the starting trios to build your perfect trios from (ex. You have a Lv 25 trio that you would want to incorporate, equip that trio first before pressing Auto-Build). When the pop-up for equipping a trio that has already been equipped shows up, just press OK until all the prompts disappear and it should equip the remaining trios needed to create your perfect trinode setup.

## Version Changes
- Version Changes have been moved to the CHANGELOG file