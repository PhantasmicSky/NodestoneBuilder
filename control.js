var skillData = {"Adele":["Blade of Will","Magic Dispatch","Skewering","Impale","Aether Forge","Eviscerate","Reign of Destruction","Cleave","Hunting Decree","Aether Bloom"],"Angelic Buster":["Soul Buster","Star Bubble","Lovely Sting","Pink Pummel","Soul Seeker","Shining Star Burst","Heavenly Crash","Celestial Roar","Trinity","Finale Ribbon","Soul Resonance","Supreme Supernova"],"Hero":["Brandish","Combo Fury","Final Attack","Intrepid Slash","Rush","Panic","Shout","Raging Blow","Puncture","Rising Rage"],"Hoyoung":["Humanity","Earth","Heaven","Evil-Sealing Gourd","Ghost Flame","Degeneration","Butterfly Dream","Star Vortex","Clone"],"Jett":["Starline One","Blaster Barrage","Starline Two","Stellar Impact","Vortex Cross","Falling Stars","Starline Three","Cosmic Upheaval","Starforce Salvo","Backup Beatdown","Planet Buster","Singularity Shock"],"Mihile":["Soul Blade","Royal Guard","Soul Driver","Radiant Driver","Trinity Attack","Four-Point Assault","Radiant Cross","Charging Light","Final Attack"],"Thunder Breaker":["Lightning Punch","Flash","Shark Sweep","Tidal Crash","Ascension","Thunder","Gale","Annihilate","Thunderbolt","Deep Rising"]};
var selectedJob;
var nodestones = [];
var selectedSkills = [];
var cannotLead = [];
var nodeTally = [];
var nodeCollection = [];

/**
 * Adds a new nodestone (created by the user)
 */
function addNodestone(){
  var firstSkill = $("#skillOne").val();
  var secondSkill = $("#skillTwo").val();
  var thirdSkill = $("#skillThree").val();
  if ((firstSkill != secondSkill) && (firstSkill != thirdSkill) && (secondSkill != thirdSkill)){
      var currentNodestone = [firstSkill,secondSkill,thirdSkill];
      if(isAlreadyIn(nodestones,currentNodestone)){
          alert("Node Combination Already Exists");
      }
      else {
        nodestones.push(currentNodestone);
        newNode(currentNodestone);
      }
      
  }
  else {
      alert("A Skill Cannot Appear in a node more than once.");
  }
};

/**
 * Checks whether "item" is already inside "arr" (an array)
 */

function isAlreadyIn(arr, item){
    var itemString = JSON.stringify(item);
    var contain = arr.some(function(ele){
        return JSON.stringify(ele) === itemString;
    });
    return contain;
}

/**
 * Creates a new entry in the nodestone collection panel based on data from nodeSet(an array of size 3) 
 */
function newNode(nodeSet){
    var tableRef = document.getElementById("nodeList").getElementsByTagName("tbody")[0];
    var newRow   = tableRef.insertRow();
    var newCell  = newRow.insertCell(0);
    newCell.setAttribute("name","imageName");
    var newLiner = document.createElement("br");
    var newText  = document.createTextNode(nodeSet[0]+"\n"+nodeSet[1]+"\n"+nodeSet[2]);
    newCell.appendChild(newText);
    var newCell  = newRow.insertCell(1);
    newCell.setAttribute("name","imageCell");
    var newImg   = document.createElement("img");
    newImg.setAttribute("src","Images/"+ selectedJob + "/"+ nodeSet[0] + ".png");
    newImg.setAttribute("name","firstSlice");//trial
    newCell.appendChild(newImg);
    var newImg   = document.createElement("img");
    newImg.setAttribute("src","Images/"+ selectedJob + "/"+ nodeSet[1] + ".png");
    newImg.setAttribute("name","secondSlice");
    newCell.appendChild(newImg);
    var newImg   = document.createElement("img");
    newImg.setAttribute("src","Images/"+ selectedJob + "/"+ nodeSet[2] + ".png");
    newImg.setAttribute("name","thirdSlice");
    newCell.appendChild(newImg);
    var newCell  = newRow.insertCell(2);
    var newText  = document.createTextNode("SCORE");
    newCell.appendChild(newText);
    var newCell  = newRow.insertCell(3);
    var b = document.createElement('button');
    b.setAttribute("class","btn btn-primary");
    b.textContent = 'Add';
    b.onclick = function(){
        if(!isAlreadyIn(nodeCollection, nodestones[$(this).closest('tr').attr("name")]) && !isAlreadyIn(cannotLead,nodestones[$(this).closest('tr').attr("name")][0])){
            disableDeletion(true);
            $(this).closest('tr').removeClass("bg-danger bg-warning bg-success");
            $(this).closest('tr').addClass("bg-info");
            updateNodeScore(nodestones[$(this).closest('tr').attr("name")],"ADD");
            nodeCollection.push(nodestones[$(this).closest('tr').attr("name")]);
            cannotLead.push(nodestones[$(this).closest('tr').attr("name")][0]);
            computeNodeScoreAll();
            computeAuxData();
            copyToCollection($(this).closest('tr').attr("name"));
        }
        else{
            alert("The trio you are trying to add is either already in or the leading skill conflicts with items inside the list.");
        }

        return false;
    };
    newCell.appendChild(b); 
    var newCell  = newRow.insertCell(4);
    var c = document.createElement('button');
    c.setAttribute("class","btn btn-primary");
    c.setAttribute("name","delete");
    c.textContent = 'Remove';
    c.onclick = function(){
        nodestones.splice($(this).closest('tr').attr("name"), 1);
        changeOrder($(this).closest('tr').attr("name"));
        $(this).closest('tr').remove();
        return false;
    };
    newCell.appendChild(c);
    $("#nodeList  tr:last").attr("name", ($("#nodeList tr").length)-2);
    if($("#nodeCombo tbody tr").length != 0){
        disableDeletion(true);
    }
    computeNodeScoreAll();
}

/**
 * Originally was supposed to load all skill data from a JSON file.
 * Current use is to load all supported jobs in the "Select Job:" dropdown
 */
function loadJSON(){
    for (jobs in skillData){
        var jobSelection = document.getElementById("jobSelect");
            jobSelection.innerHTML = jobSelection.innerHTML +
                '<option value="' + jobs + '">' + jobs + '</option>';
    }
}

/**
 * Changes the list of skills a user can pick to rebuild their tri-nodes.
 * Also in charge of hiding certain div's based on selectedJob's value (should be moved to a separate function)
 */
function skillChange(){
    selectedJob = $("#jobSelect").val();
    initializeTally();
    selectorChange();
    clearLeftoverData();
    var firstNode = document.getElementById("skillOne");
    var secondNode = document.getElementById("skillTwo");
    var thirdNode = document.getElementById("skillThree");
    firstNode.innerHTML=null;
    secondNode.innerHTML=null;
    thirdNode.innerHTML=null;
    if(selectedJob.length > 0)
    {
        $("#normalOperation").attr("name","noOp");
        $("#helpOperation").attr("name","hiddenObj");
        for (i = 0; i < skillData[selectedJob].length; i++){
            firstNode.innerHTML = firstNode.innerHTML +
                    '<option value="' + skillData[selectedJob][i] + '">' + skillData[selectedJob][i] + '</option>';
                    secondNode.innerHTML = secondNode.innerHTML +
                    '<option value="' + skillData[selectedJob][i] + '">' + skillData[selectedJob][i] + '</option>';
                    thirdNode.innerHTML = thirdNode.innerHTML +
                    '<option value="' + skillData[selectedJob][i] + '">' + skillData[selectedJob][i] + '</option>';
        }
        document.getElementById("nodestoneAdd").style.display = "table-cell" 
    }
    else{
        $("#normalOperation").attr("name","hiddenObj");
        $("#helpOperation").attr("name","noOp");
        document.getElementById("nodestoneAdd").style.display = "none";
    }
}

/**
 * Changes the selectable skills in the first div which users pick to select which skills they would like their perfect trios to have
 */
function selectorChange(){
    var tableNode = document.getElementById("skillOption1");
    tableNode.innerHTML = "";
    nodestones = [];
    selectedSkills = [];
    cannotLead = [];
    nodeCollection = [];
    document.getElementById("nodeList").getElementsByTagName("tbody")[0].innerHTML = "";
    document.getElementById("nodeCombo").getElementsByTagName("tbody")[0].innerHTML = "";
    selectedJob = $("#jobSelect").val();
    updateNodeScore(["A","B","C"],"Nothing");
    if(selectedJob.length > 0){
        var tableRef = document.getElementById("skillOption1");
        for (i = 0; i < skillData[selectedJob].length; i++){
            if(i%5 == 0){
                var newRow = tableRef.insertRow();
            }
            var newCell  = newRow.insertCell(i%5);
            var newImg   = document.createElement("img");
            newImg.setAttribute("src","Images/"+ selectedJob + "/"+ skillData[selectedJob][i] + ".png");
            newCell.appendChild(newImg);
            var newText  = document.createTextNode(" "+ skillData[selectedJob][i]);
            newCell.appendChild(newText);
            newCell.setAttribute("name", skillData[selectedJob][i]);
            newCell.setAttribute("onclick", "formulateTrios('"+skillData[selectedJob][i]+"')");
        }
    }
}

/**
 * UI Logic for the 1st div.
 * Also in charge of computing for a node statistic (Best Outcome)
 */
function formulateTrios(selectedOption){
    var nodeSlotData = 0;
    if(isAlreadyIn(selectedSkills,selectedOption)){
        selectedSkills = selectedSkills.filter(function(value, index, arr){ 
            return value != selectedOption;
        });
        $("#skillOption1 td[name='"+selectedOption+"']").removeClass("bg-primary");
    }
    else{
        selectedSkills.push(selectedOption);
        $("#skillOption1 td[name='"+selectedOption+"']").addClass("bg-primary");
    }
    var selectedFormulation = selectedSkills.length;
    nodeSlotData = 3-(selectedFormulation*2%3);
    if(nodeSlotData == 3){
        nodeSlotData = 0;
    }
    var nodePositive = (Math.ceil(selectedFormulation*2/3)*3)-nodeSlotData;
    console.log(nodePositive);
    document.getElementsByName("skillCounter")[0].innerHTML = selectedSkills.length;
    if(selectedFormulation == 1){
        document.getElementsByName("bestOutcome")[0].innerHTML = "2(2 slots for selected and 4 slots for any skill)" ;
    }
    else{
        document.getElementsByName("bestOutcome")[0].innerHTML = Math.ceil(selectedFormulation*2/3) + "(" + nodePositive + " slots for selected and " + nodeSlotData + " slot(s) for any skill)" ;
    }
    initializeTally();
    computeNodeScore();
    updateNodeScore(["A","B","C"],"Nothing");
    computeAuxData();
    computeNodeScoreAll();

}

/**
 * Changes the name (ID #) of every node affected when a node is deleted.
 * Ex. removing node ID # 34 would result in 34 being empty. Nodes with ID 35 onwards would shift down to ensure ID 34 is used
 * This is the reason why deleting nodes is not allowed while ANY tri-node is equipped 
 */
function changeOrder(deletedNode){
    $('#nodeList > tbody  > tr').each(
        function(index) {
            if($(this).attr("name") > deletedNode){
                $(this).attr("name", $(this).attr("name")-1);
            }
        }
    )
    $('#nodeCombo > tbody  > tr').each(
        function(index) {
            if($(this).attr("name") > deletedNode){
                $(this).attr("name", $(this).attr("name")-1);
            }
        }
    )
}

/**
 * Initializes the tally/count if a skill is already present in the equipped tri-node twice.
 * A count of 2 means that said skill can still be equipped 2 more time, etc.
 */
function initializeTally(){
    selectedJob = $("#jobSelect").val();
    nodeTally=[];
    if(selectedJob.length > 0){
        for (i = 0; i < skillData[selectedJob].length; i++){
            if(isAlreadyIn(selectedSkills,skillData[selectedJob][i])){
                nodeTally[skillData[selectedJob][i]] =  2;
            }
            else {
                nodeTally[skillData[selectedJob][i]] = 0;
            }
        }

    }
}

/**
 * Copies the selected node to equip to the Equipped nodes list (inside div 3)
 */
function copyToCollection(selectName){
    var tableRef = document.getElementById("nodeCombo").getElementsByTagName("tbody")[0];
    var newRow   = tableRef.insertRow();
    var newCell  = newRow.insertCell(0);
    newCell.setAttribute("name","imageName");
    var newLiner = document.createElement("br");
    var newText  = document.createTextNode(nodestones[selectName][0]+"\n"+nodestones[selectName][1]+"\n"+nodestones[selectName][2]);
    newCell.appendChild(newText);
    var newCell  = newRow.insertCell(1);
    newCell.setAttribute("name","imageCell");
    var newImg   = document.createElement("img");
    newImg.setAttribute("src","Images/"+ selectedJob + "/"+ nodestones[selectName][0] + ".png");
    newImg.setAttribute("name","firstSlice");
    newCell.appendChild(newImg);
    var newImg   = document.createElement("img");
    newImg.setAttribute("src","Images/"+ selectedJob + "/"+ nodestones[selectName][1] + ".png");
    newImg.setAttribute("name","secondSlice");
    newCell.appendChild(newImg);
    var newImg   = document.createElement("img");
    newImg.setAttribute("src","Images/"+ selectedJob + "/"+ nodestones[selectName][2] + ".png");
    newImg.setAttribute("name","thirdSlice");
    newCell.appendChild(newImg);
    var newCell  = newRow.insertCell(2);
    var b = document.createElement('button');
    b.setAttribute("class","btn btn-primary");
    b.textContent = 'Remove';
        b.onclick = function(){
        $('#nodeList > tbody  > tr[name="'+selectName+'"]').removeClass("bg-info");
        nodeCollection.splice(($(this).closest('td').parent()[0].sectionRowIndex), 1);
        cannotLead.splice(($(this).closest('td').parent()[0].sectionRowIndex), 1);
        updateNodeScore(nodestones[$(this).closest('tr').attr("name")],"REMOVE");
        computeNodeScoreAll();
        $(this).closest('tr').remove();
        disableDeletion(false);
        computeAuxData();
        return false;
    };
    newCell.appendChild(b);
    $("#nodeCombo  tr:last").attr("name", selectName);
}

/**
 * Enables or disables deletion in nodestone list
 */
function disableDeletion(statusLock){
    if(statusLock == true){
        $("#nodeList").find("button[name='delete']").attr("disabled", true);
    }
    else if($("#nodeCombo tbody tr").length == 0){
        $("#nodeList").find("button[name='delete']").attr("disabled", false);
    }
}

/**
 * Deducts 1 to every skill currently equipped in the tally.
 */
function computeNodeScore(){
    for(i = 0; i < nodeCollection.length; i++){
        nodeTally[nodeCollection[i][0]] = nodeTally[nodeCollection[i][0]]-1;
        nodeTally[nodeCollection[i][1]] = nodeTally[nodeCollection[i][1]]-1;
        nodeTally[nodeCollection[i][2]] = nodeTally[nodeCollection[i][2]]-1;
    }
}

/**
 * Recomputes the nodescore for every skill inside the nodelist (div 2)
 * Fires off everytime a node is equipped, unequipped, or a skill is added or removed from the desired skills list
 */
function computeNodeScoreAll(){
    $('#nodeList > tbody  > tr').each(
        function(index) {
            if(!$(this).hasClass("bg-info")){
                $(this).removeClass("bg-danger bg-warning bg-success");
            }
            var nOne = nodestones[$(this).attr("name")][0];
            var nTwo = nodestones[$(this).attr("name")][1];
            var nThree = nodestones[$(this).attr("name")][2];
            var nScore = 0;
            if(isAlreadyIn(cannotLead,nOne)){
                nScore = -1;
            }
            else{
                if(isAlreadyIn(selectedSkills,nOne)){
                    nScore++;
                    if(nodeTally[nOne] > 0){
                        nScore++;
                    }
                }
                if(isAlreadyIn(selectedSkills,nTwo)){
                    nScore++;
                    if(nodeTally[nTwo] > 0){
                        nScore++;
                    }
                }
                if(isAlreadyIn(selectedSkills,nThree)){
                    nScore++;
                    if(nodeTally[nThree] > 0){
                        nScore++;
                    }
                }
                
            }
            $("td:nth-last-child(3)",this).text(nScore);
            if(nScore < 1 && !$(this).hasClass("bg-info")){
                $(this).addClass("bg-danger");
            }
            else if(nScore < 6 && !$(this).hasClass("bg-info")){
                $(this).addClass("bg-warning");
            }
            else if(nScore > 5 && !$(this).hasClass("bg-info")){
                $(this).addClass("bg-success");
            }
        }
    )

}

/**
 * Updates nodescores in tally based on if a node is equipped or unequipped.
 * Also is responsible for updating the lower right table in div 3 which is responsible for keeping track of how many times a skill appears in the equipped nodes (might want to move this function)
 */
function updateNodeScore(subtractNode, conditions){
    if(conditions == "ADD"){
        nodeTally[subtractNode[0]]= nodeTally[subtractNode[0]]-1;
        nodeTally[subtractNode[1]]= nodeTally[subtractNode[1]]-1;
        nodeTally[subtractNode[2]]= nodeTally[subtractNode[2]]-1; 
    }
    else if (conditions == "REMOVE"){
        nodeTally[subtractNode[0]]= nodeTally[subtractNode[0]]+1;
        nodeTally[subtractNode[1]]= nodeTally[subtractNode[1]]+1;
        nodeTally[subtractNode[2]]= nodeTally[subtractNode[2]]+1; 
    }
    var tableRef = document.getElementById("nodeStatistics2").getElementsByTagName("tbody")[0];
    tableRef.innerHTML = "";
    if(selectedJob.length > 0){
        for(k = 0; k < skillData[selectedJob].length; k++){
            var newRow   = tableRef.insertRow();
            var newCell  = newRow.insertCell(0);
            var newImg   = document.createElement("img");
            newImg.setAttribute("src","Images/"+ selectedJob + "/"+ skillData[selectedJob][k] + ".png");
            newCell.appendChild(newImg);
            var newText  = document.createTextNode(" "+ skillData[selectedJob][k]);
            newCell.appendChild(newText);
            var newCell  = newRow.insertCell(1);
            if(isAlreadyIn(selectedSkills, skillData[selectedJob][k])){
                var newText  = document.createTextNode("YES");
                newCell.appendChild(newText);
                var newCell  = newRow.insertCell(2);
                var newText  = document.createTextNode(2-nodeTally[skillData[selectedJob][k]]);
                if(2-nodeTally[skillData[selectedJob][k]] == 2){
                    newRow.classList.add("bg-success");
                }
                else if(2-nodeTally[skillData[selectedJob][k]] < 2){
                    newRow.classList.add("bg-warning");
                }
                else{
                    newRow.classList.add("bg-danger");
                }
            }
            else {
                var newText = document.createTextNode("NO");
                newCell.appendChild(newText);
                var newCell  = newRow.insertCell(2);
                var newText  = document.createTextNode(-nodeTally[skillData[selectedJob][k]]);
                newRow.classList.add("bg-info");
            }
            newCell.appendChild(newText);
        }
    }
}

/**
 * Computes other data in the Nodestatistics tab (# of nodes used, efficiency)
 */
function computeAuxData(){
    document.getElementsByName("nodeUsage")[0].innerHTML = nodeCollection.length;
    var tally = 0;
    for(j = 0; j < selectedSkills.length; j++){
        if(nodeTally[selectedSkills[j]] == 1){
            tally = tally +1;
        }
        else if (nodeTally[selectedSkills[j]] < 1){
            tally = tally +2;
        }
    }
    document.getElementsByName("nodeEfficiency")[0].innerHTML = tally + "/" + (nodeCollection.length)*3 + "(" + Math.round((tally/(nodeCollection.length*3)*100 + Number.EPSILON) * 100) / 100 + "% Efficiency)";
}

/**
 * Clears skill appearance tracker and best outcome if job is suddenly switched
 */
function clearLeftoverData(){
    document.getElementsByName("skillCounter")[0].innerHTML = selectedSkills.length;
    document.getElementsByName("bestOutcome")[0].innerHTML = "0(0 slots for selected and 0 slots for any skill)" ;
    computeAuxData();

}

/**
 * Sort function for headers
 */
$('table[name="sortable"] th').click(function(){
    var table = $(this).parents('table').eq(0)
    var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
    this.asc = !this.asc
    if (!this.asc){rows = rows.reverse()}
    for (var i = 0; i < rows.length; i++){table.append(rows[i])}
})
function comparer(index) {
    return function(a, b) {
        var valA = getCellValue(a, index), valB = getCellValue(b, index)
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
    }
}
function getCellValue(row, index){ return $(row).children('td').eq(index).text() }

/**
 * Some minor Web responsive additions
 */
$(window).on('resize load', function () {
    if ($(window).width() < 1000) {
        $("#leftCreator").addClass('col-12').removeClass('col-4');
        $("#rightCreator").addClass('col-12').removeClass('col-8');
        $("#leftCombo").addClass('col-12').removeClass('col-6');
        $("#rightCombo").addClass('col-12').removeClass('col-6');
    } 
    else {
        $("#leftCreator").addClass('col-4').removeClass('col-12');
        $("#rightCreator").addClass('col-8').removeClass('col-12');
        $("#leftCombo").addClass('col-6').removeClass('col-12');
        $("#rightCombo").addClass('col-6').removeClass('col-12');
    }
 });  

/**
 * Allows sections of the page to collapse
 */
function divcollapse(sectionToCollapse){
    $("#"+sectionToCollapse+"").collapse("toggle");
    $("#"+sectionToCollapse+"Arrow").toggleClass("fa-chevron-circle-up");
    $("#"+sectionToCollapse+"Arrow").toggleClass("fa-chevron-circle-down");
}

/**
 * Generates the save string
 */
function genList(){
    var generated;
    generated = $("#jobSelect").val() +"|";
    for(i = 0; i < nodestones.length; i++){
        generated = generated + skillData[selectedJob].indexOf(nodestones[i][0]) +","+ skillData[selectedJob].indexOf(nodestones[i][1]) +","+ skillData[selectedJob].indexOf(nodestones[i][2])+"|";
    }
    generated = generated.slice(0, -1);
    $("#saveLoadArea").val(generated);
}

/**
 * Loads the pasted save string
 * TODO: Check validity
 */
function loadList(){
    var listLoader = $("#saveLoadArea").val();
    listLoader = listLoader.split("|");
    selectedJob = $("#jobSelect").val(listLoader[0]);
    initializeTally();
    selectorChange();
    clearLeftoverData();
    for(i = 1; i < listLoader.length; i++){
        var temp = listLoader[i].split(",");
        temp[0] = skillData[selectedJob][temp[0]];
        temp[1] = skillData[selectedJob][temp[1]];
        temp[2] = skillData[selectedJob][temp[2]];
        nodestones.push(temp);
        newNode(temp);
    }
    var firstNode = document.getElementById("skillOne");
    var secondNode = document.getElementById("skillTwo");
    var thirdNode = document.getElementById("skillThree");
    firstNode.innerHTML=null;
    secondNode.innerHTML=null;
    thirdNode.innerHTML=null;
    if(selectedJob.length > 0)
    {
        for (i = 0; i < skillData[selectedJob].length; i++){
            firstNode.innerHTML = firstNode.innerHTML +
                    '<option value="' + skillData[selectedJob][i] + '">' + skillData[selectedJob][i] + '</option>';
                    secondNode.innerHTML = secondNode.innerHTML +
                    '<option value="' + skillData[selectedJob][i] + '">' + skillData[selectedJob][i] + '</option>';
                    thirdNode.innerHTML = thirdNode.innerHTML +
                    '<option value="' + skillData[selectedJob][i] + '">' + skillData[selectedJob][i] + '</option>';
        }
        document.getElementById("nodestoneAdd").style.display = "table-cell" 
    }
    else{
        document.getElementById("nodestoneAdd").style.display = "none";
    }
}

/**
 * Debug function just to check values of variables
 */
function checkVar(){
    console.log(nodestones);
    console.log(selectedSkills);
    console.log(cannotLead);
    console.log(nodeTally);
    console.log(nodeCollection);
}