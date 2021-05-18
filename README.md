# Maplestory Tri-Node Builder (Beta v1.03)

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

- All jobs that are currently out in GMS (47 Jobs) is supported.
- Kain is Currently in Korean until it comes out to GMS.
- Mo Xuan is Currently in Trad. Chinese until it comes out in GMS (If it will even release outside TMS/CMS).

## Notes
- ~~* = Function not tested fully and might sometimes return "No Optimal Combination" even though there should be one.~~ 
