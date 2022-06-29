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

- **[NOT SURE]** Remove Image Path Dependency on Names (Switch to SkillIDs for easier porting to other languages)
- Add Support for other languages.

## Currently Supported Jobs

- All jobs that are currently out in GMS (every Job except MoXuan) is supported.
- MoXuan is Currently in Trad. Chinese until it comes out in GMS (If it will even release outside TMS/CMS).

## Notes
- \* = Function not tested fully and might sometimes return "No Optimal Combination" even though there should be one. Nodes are also built using brute force and might take minutes if there are a lot of nodes to build prefect tri's from. Might also cause browser to lock-up.

## Version Changes
- Version Changes have been moved to the CHANGELOG file