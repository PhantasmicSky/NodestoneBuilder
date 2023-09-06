# Change Log

## [1.08] - 2023-09-06

### Added
  - Added the ability to load nodestones from ingame screenshots or snips.
    - For best results, please only include actual tri-nodes in your snips. Having other nodes might cause false matches and would load in the wrong nodes.
    - Some of the nodes might be falsely matched with another skill. Would likely compile cases for this. An example is Marksman's Snipe if in the 2nd Slot would get classified as High Speed Shot.
  - Added Option to select how many copies of each skill you want (from 2 copies to 6 copies)
  - Added Quick version notes summary upon visiting the page (Can be hidden until the next update by clicking "Close until next update")

### Changed
  - Options tab has been removed as that was only for placeholder data.
  - Help section has now been updated to reflect all the recent changes.
  - All jobs should change logic number to 8. If you are not a Marksman or you used Iron Arrow as the placeholder for Covering Fire, you should not need to change anything aside from the logic number to 8.

### Fixed
  - Kanna's Shikigami Haunting Icon has been fixed so that it uses the icon of Shikigami Haunting 4.
  - Khali's Void Blitz and Void Rush has been fixed to the correct icons (Old icons might have been from KMST).
  - Angelic Buster's Trinity Icon has been updated to the latest icon.
  - Bishop's Big Bang Icon has been updated to the latest icon.
  - Blaster's Magnum Launch has been updated to Rocket Rush and will now show the correct icon.
  - Hoyoung's Ghost Flame skill has been renamed to Seeking Ghost Flame
  - Ice Lightning Mage's Lightning Orb Icon has been fixed to the correct icon.
  - Kinesis' Mind Break has been updated to Mind Quake and will now show the correct icon.
  - Luminous' Morning Star and Armageddon(Unsure if it actually changed) skill icon has been updated to the latest icon.
  - Marksman's Final Attack and Piercing Arrow Skill icons have been updated to the latest icons.
  - Marksman's Iron Arrow has now been fixed to be Covering Fire and the icon has been updated to the correct icon.
  - Phantom's Carte Mille has been renamed to Mille Cartes and the skill Icon should now match the one in game.
  - Phantom's Carte Blanc has been renamed to Carte Noir and the skill Icon should now match the one in game.
  - Xenon's Hypogram Field skill icon has been updated to the latest icon.
  - Zero's Spin Cutter has been renamed to Blade Ring.

## [1.07] - 2023-06-14

### Added [2023-06-15]
  - Added Hayato's new node loadout. Changed the existing Hayato to "Hayato (Old)". Will remove once MapleSEA gets the Hayato Node Changes.
  - If you will use an old save string for Hayato, change the Job name to "Hayato (Old)". Hayatos are advised to rebuild node inventory.  

### Changed
  - Khali Skills are now in English. (If you have a collection for Khali, change 칼리 to Khali)
  - All Jobs should change logic number to 6.

### Fixed
  - Blaze Wizard and Wind Archer Skill Images have been fixed.
  - Some of Blaze Wizard's Skills were still using pre-revamp names and have been fixed.

## [1.06] - 2023-04-12

### Changed
- Added 칼리 (Kalli) Skills.
  - Skills and Job name will be in Korean until GMS release.

## [1.05] - 2022-11-15

### Changed
- Cygnus Knight Revamp Has been implemented.
  - All jobs should change logic number to 5.
  - Mihile and Dawn Warrior (Soul Master) should reconsider rebuilding from scratch. Other Cygnus Knights still map 1:1 and are unaffected.


## [1.04] - 2022-07-25

### Added
- Web worker auto build has been added. Use the "Auto Build \[Async\]" to delegate the brute force solver to a web worker and thus shouldn't display a "Not Responding" if the solver takes quite some time.
- \[2022-07-29\] Added an "Unequip all Trios" button to remove all the equipped tri-nodes. 

### Changed
- Explorer Revamp have been implemented. Aside from Bishop, Ice Lightning Mage, Jett, and Pathfinders, other explorers are advised to rebuild their Node Inventories.
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
  - Paladins would need to convert 3 (Blizzard Charge) to either 5 (Divine Judgement), 9 (Heaven's Hammer), or 10 (Smite Shield). All skill values would be subtracted by 1 to fix Slash Blast's removal. All skill values that have a value above 2 would be subtracted by 1 more to fix Blizzard Charge's Removal.
  - Shadowers would need to convert 2 (Steal) to either 7 (Dark Flare), 10 (Sudden Raid), or 11 (Shadow Veil) then subtract all skill values by 3 to account for Double Stab, Lucky Seven, and Steal's removal.

### Fixed
- Made some of the giant tables to display a horizontal scroll bar if view port becomes small
- Made the input text box of Save/Load to occupy the whole div


## [1.03]

### Added
- Auto builder function has been added. Selecting only 1 skill node to boost might bug the system out and return a "No Optimal Nodestone Combination" error even though you have two nodes that would boost the skill and won't cause any conflict.
- Changed the Nodestone creation process and the UI

## [1.02]

### Added

### Changed
- Lara Skills have been translated. If switching from ver 2 -> 3, Change logic number to 3 and translate Lara's name (if the selected job of the save string is Lara[라라])

### Fixed
 
## [1.01]
 
### Added
   
### Changed
- Kain Skills have been translated. If switching from ver 1 -> 2 , Change logic number to 2 and translate Kain's name (if the selected job of the save string is Kain [카인])
 
### Fixed