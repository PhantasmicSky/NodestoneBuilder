# Maplestory Tri-Node Builder (v1.12)

This tool has more or less been rendered obsolete with the introduction of allowing you to make your trinodes. Thank you for everyone who has used it through the years.

## Purpose
The web application allows users to find and formulate their trinode sets.

## Features

- Allows users to input all their trinode combinations
- Real time feedback on the current state of the trinode set
- Nodescore
  - To faciliate easier nodestone selection, a score of -1 to 6 is given as to how useful a specific trinode currently is given the already selected trinode. 
  - A score of 1 is added for each skill in the trinode that is deemed as useful(selected by user). 
  - Another score is added for each useful skill to the current pool of trinodes as long as adding the selected trinode would result in the skill appearing less than or equal to the number of copies per skill specified by the user.
- Compute for number of Ideal nodes and current node efficiency
- **[BETA]** Auto Build Function allows users to let the program try and build a perfect nodestone loadout using selected skills.*
- **[BETA]** Load Nodestone from Photo Function now added which allows users to paste a snip of their ingame screen to extract nodes from.**

## Things to do

- Improve the Auto Build function more.
- **[NOT SURE]** Remove Image Path Dependency on Names (Switch to SkillIDs for easier porting to other languages)
- Add Support for other languages.

## Currently Supported Jobs

- All jobs that are currently out in GMS (every Job except MoXuan) is supported.
- MoXuan(墨玄) is Currently in Trad. Chinese until it comes out in GMS (If it will even release outside TMS/CMS).
- Angelic Buster Revamp is not yet available.

## Notes
- \* = Function not tested fully and might sometimes return "No Optimal Combination" even though there should be one (Mostly happens when less than 3 skills are selected or if you already have more trios equipped than the number of trios to make your perfect loadout). Nodes are also built using brute force and might take minutes if there are a lot of nodes to build prefect tri's from. Might also cause browser to lock-up. If that happens, please use the Async Solver to move the solving to a web worker. 
- \* = While not fully tested, it is possible to equip some of the trios as the starting trios to build your perfect trios from (ex. If you have a Lv 25 trio that you would want to incorporate in the perfect trio build, equip that trio first before pressing Auto-Build). When the pop-up for equipping a trio that has already been equipped shows up, just press OK until all the prompts disappear and it should equip the remaining trios needed to create your perfect trinode setup.
- \*\* = Function might not be 100% accurate. From limited tests, there does not seem to be any trinode that gets wrongly identified. However, tests were not that extensive.

## Version Changes
- Version Changes have been moved to the CHANGELOG file