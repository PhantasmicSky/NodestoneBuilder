var skillData = {"Adele":["Blade of Will","Magic Dispatch","Skewering","Impale","Aether Forge","Eviscerate","Reign of Destruction","Cleave","Hunting Decree","Aether Bloom"],"Angelic Buster":["Soul Buster","Star Bubble","Lovely Sting","Pink Pummel","Soul Seeker","Shining Star Burst","Heavenly Crash","Celestial Roar","Trinity","Finale Ribbon","Soul Resonance","Supreme Supernova"],"Hero":["Brandish","Combo Fury","Final Attack","Intrepid Slash","Rush","Panic","Shout","Raging Blow","Puncture","Rising Rage"],"Hoyoung":["Humanity","Earth","Heaven","Evil-Sealing Gourd","Ghost Flame","Degeneration","Butterfly Dream","Star Vortex","Clone"],"Jett":["Starline One","Blaster Barrage","Starline Two","Stellar Impact","Vortex Cross","Falling Stars","Starline Three","Cosmic Upheaval","Starforce Salvo","Backup Beatdown","Planet Buster","Singularity Shock"],"Mihile":["Soul Blade","Royal Guard","Soul Driver","Radiant Driver","Trinity Attack","Four-Point Assault","Radiant Cross","Charging Light","Final Attack"]};
var selectedJob;
var nodestones = [];
var selectedSkills = [];
var cannotLead = [];
var nodeTally = [];
var nodeCollection = [];

function addNodestone(){
  var firstSkill = $("#skillOne").val();
  var secondSkill = $("#skillTwo").val();
  var thirdSkill = $("#skillThree").val();
  if ((firstSkill != secondSkill) && (firstSkill != thirdSkill) && (secondSkill != thirdSkill)){
      var currentNodestone = [firstSkill,secondSkill,thirdSkill];
     // console.log(isAlreadyIn(nodestones,currentNodestone));
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

function isAlreadyIn(arr, item){
    var itemString = JSON.stringify(item);
    var contain = arr.some(function(ele){
        return JSON.stringify(ele) === itemString;
    });
    return contain;
}

function newNode(nodeSet){
    var tableRef = document.getElementById("nodeList").getElementsByTagName("tbody")[0];
    var newRow   = tableRef.insertRow();
    var newCell  = newRow.insertCell(0);
    var newImg   = document.createElement("img");
    newImg.setAttribute("src","Images/"+ selectedJob + "/"+ nodeSet[0] + ".png");
    newCell.appendChild(newImg);
    var newText  = document.createTextNode("\n"+nodeSet[0]);
    newCell.appendChild(newText);
    var newCell  = newRow.insertCell(1);
    var newImg   = document.createElement("img");
    newImg.setAttribute("src","Images/"+ selectedJob + "/"+ nodeSet[1] + ".png");
    newCell.appendChild(newImg);
    var newText  = document.createTextNode("\n"+nodeSet[1]);
    newCell.appendChild(newText);
    var newCell  = newRow.insertCell(2);
    var newImg   = document.createElement("img");
    newImg.setAttribute("src","Images/"+ selectedJob + "/"+ nodeSet[2] + ".png");
    newCell.appendChild(newImg);
    var newText  = document.createTextNode("\n"+nodeSet[2]);
    newCell.appendChild(newText);
    var newCell  = newRow.insertCell(3);
    var newText  = document.createTextNode("SCORE");
    newCell.appendChild(newText);
    var newCell  = newRow.insertCell(4);
    var b = document.createElement('button');
    b.setAttribute("class","btn btn-primary");
    b.textContent = 'Add';
    b.onclick = function(){
        if(!isAlreadyIn(nodeCollection, nodestones[$(this).closest('tr').attr("name")]) && !isAlreadyIn(cannotLead,nodestones[$(this).closest('tr').attr("name")][0])){
            //console.log($(this).closest('td').parent()[0].sectionRowIndex);
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
    var newCell  = newRow.insertCell(5);
    var c = document.createElement('button');
    c.setAttribute("class","btn btn-primary");
    c.setAttribute("name","delete");
    c.textContent = 'Remove';
    c.onclick = function(){
        //console.log($(this).closest('td').parent()[0].sectionRowIndex);
        nodestones.splice($(this).closest('tr').attr("name"), 1);
        changeOrder($(this).closest('tr').attr("name"));
        //computeNodeScoreAll();
        $(this).closest('tr').remove();
        //console.log(nodestones);
        return false;
    };
    newCell.appendChild(c);
    $("#nodeList  tr:last").attr("name", ($("#nodeList tr").length)-2);
    if($("#nodeCombo tbody tr").length != 0){
        disableDeletion(true);
    }
    computeNodeScoreAll();
    //changeRowColor();
}

function loadJSON(){
    //console.log(skillData);
    for (jobs in skillData){
        var jobSelection = document.getElementById("jobSelect");
            jobSelection.innerHTML = jobSelection.innerHTML +
                '<option value="' + jobs + '">' + jobs + '</option>';
    }
}

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
    //console.log(selectedJob);
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
        //console.log(document.getElementById("nodestoneAdd"));
        document.getElementById("nodestoneAdd").style.display = "none";
    }
}

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
            /*newCell.onclick = function(){
                formulateTrios("'"+skillData[selectedJob][i]+"'");
            }
            newCell.addEventListener('click', function(){
                formulateTrios("'"+skillData[selectedJob][i]+"'");
            });*/
            //tableNode.innerHTML = tableNode.innerHTML + 
            //    '<tr onclick="formulateTrios(\''+skillData[selectedJob][i]+'\')" name="'+skillData[selectedJob][i]+'"><td><input type="checkbox" name="skillToCreate" value="'+ skillData[selectedJob][i] +'"></td><td><img src="Images/'+selectedJob+'/'+skillData[selectedJob][i]+'.png"/> '+ skillData[selectedJob][i]+'</td></tr>';
        }
        //tableNode.innerHTML = tableNode.innerHTML + 
        //    '<button type="button" class="btn btn-primary" onclick="formulateTrios()">Formula Trios</button>';
    }
}

function formulateTrios(selectedOption){
    var nodeSlotData = 0;
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
    //selectedSkills = [];
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
    /*for (var i = 0; i < checkboxes.length; i++) {
        if(checkboxes[i].name=="skillToCreate"){
            selectedSkills.push(checkboxes[i].value)
            selectedFormulation++;
        }
    }*/
    //changeRowColor();
    var selectedFormulation = selectedSkills.length;
    nodeSlotData = 3-(selectedFormulation*2%3);
    if(nodeSlotData == 3){
        nodeSlotData = 0;
    }

    /*if(selectedFormulation >= 3){
       // alert(selectedFormulation +" skills selected. Resulting in " + Math.ceil(selectedFormulation*2/3) + " node(s) and " + nodeSlotData + " non-essential skill(s) in the last Trio.");
    }
    else{
        alert("Insufficient number of skills selected. Select at least three(3) skills.");
    }*/
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

function changeRowColor(){
    $("#nodeList > tbody  > tr").removeClass("bg-danger");
    $("#nodeList > tbody  > tr").removeClass("bg-success");
    //$("#nodeList > tbody  > tr").removeClass("bg-info");
    $("#nodeList > tbody  > tr").removeClass("bg-warning");
    $('#nodeList > tbody  > tr').each(
        function(index) {
            var nOne = $("td:nth-child(1)", this).text();
            var nTwo = $("td:nth-child(2)", this).text();
            var nThree = $("td:nth-child(3)", this).text();
            if((isAlreadyIn(selectedSkills, nOne) + isAlreadyIn(selectedSkills, nTwo) + isAlreadyIn(selectedSkills, nThree) == 0)  && !$(this).hasClass("bg-info")){
                $(this).addClass("bg-danger");
                //console.log($("td:nth-child(1)", this).text());
            }
            else if(isAlreadyIn(selectedSkills, nOne) + isAlreadyIn(selectedSkills, nTwo) + isAlreadyIn(selectedSkills, nThree) == 1  && !$(this).hasClass("bg-info")){
                $(this).addClass("bg-warning");
                //console.log($("td:nth-child(1)", this).text());
            }
            else if(isAlreadyIn(selectedSkills, nOne) + isAlreadyIn(selectedSkills, nTwo) + isAlreadyIn(selectedSkills, nThree) == 2  && !$(this).hasClass("bg-info")){
                $(this).addClass("bg-warning");
                //console.log($("td:nth-child(1)", this).text());
            }
            else if(isAlreadyIn(selectedSkills, nOne) + isAlreadyIn(selectedSkills, nTwo) + isAlreadyIn(selectedSkills, nThree) == 3  && !$(this).hasClass("bg-info")){
                $(this).addClass("bg-success");
                //console.log($("td:nth-child(1)", this).text());
            }
        }
    )  
}

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

function copyToCollection(selectName){
    var tableRef = document.getElementById("nodeCombo").getElementsByTagName("tbody")[0];
    var newRow   = tableRef.insertRow();
    var newCell  = newRow.insertCell(0);
    var newImg   = document.createElement("img");
    newImg.setAttribute("src","Images/"+ selectedJob + "/"+ nodestones[selectName][0] + ".png");
    newCell.appendChild(newImg);
    var newText  = document.createTextNode(" "+nodestones[selectName][0]);
    newCell.appendChild(newText);
    var newCell  = newRow.insertCell(1);
    var newImg   = document.createElement("img");
    newImg.setAttribute("src","Images/"+ selectedJob + "/"+ nodestones[selectName][1] + ".png");
    newCell.appendChild(newImg);
    var newText  = document.createTextNode(" "+nodestones[selectName][1]);
    newCell.appendChild(newText);
    var newCell  = newRow.insertCell(2);
    var newImg   = document.createElement("img");
    newImg.setAttribute("src","Images/"+ selectedJob + "/"+ nodestones[selectName][2] + ".png");
    newCell.appendChild(newImg);
    var newText  = document.createTextNode(" "+nodestones[selectName][2]);
    newCell.appendChild(newText);
    var newCell  = newRow.insertCell(3);
    var b = document.createElement('button');
    b.setAttribute("class","btn btn-primary");
    b.textContent = 'Remove';
        b.onclick = function(){
        //console.log($(this).closest('td').parent()[0].sectionRowIndex);
        $('#nodeList > tbody  > tr[name="'+selectName+'"]').removeClass("bg-info");
        nodeCollection.splice(($(this).closest('td').parent()[0].sectionRowIndex), 1);
        cannotLead.splice(($(this).closest('td').parent()[0].sectionRowIndex), 1);
        updateNodeScore(nodestones[$(this).closest('tr').attr("name")],"REMOVE");
        computeNodeScoreAll();
        //changeRowColor();
        //changeOrder($(this).closest('tr').attr("name"));
        $(this).closest('tr').remove();
        disableDeletion(false);
        computeAuxData();
        return false;
    };
    newCell.appendChild(b);
    $("#nodeCombo  tr:last").attr("name", selectName);
}

function disableDeletion(statusLock){
    if(statusLock == true){
        $("#nodeList").find("button[name='delete']").attr("disabled", true);
    }
    else if($("#nodeCombo tbody tr").length == 0){
        $("#nodeList").find("button[name='delete']").attr("disabled", false);
    }
}

function computeNodeScore(){
    for(i = 0; i < nodeCollection.length; i++){
        nodeTally[nodeCollection[i][0]] = nodeTally[nodeCollection[i][0]]-1;
        nodeTally[nodeCollection[i][1]] = nodeTally[nodeCollection[i][1]]-1;
        nodeTally[nodeCollection[i][2]] = nodeTally[nodeCollection[i][2]]-1;
    }
}

function computeNodeScoreAll(){
    $('#nodeList > tbody  > tr').each(
        function(index) {
            if(!$(this).hasClass("bg-info")){
                $(this).removeClass("bg-danger bg-warning bg-success");
            }
            /*var nOne = $("td:nth-child(1)", this).text();
            var nTwo = $("td:nth-child(2)", this).text();
            var nThree = $("td:nth-child(3)", this).text();*/
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
            $("td:nth-child(4)",this).text(nScore);
            //if((isAlreadyIn(selectedSkills, nOne) + isAlreadyIn(selectedSkills, nTwo) + isAlreadyIn(selectedSkills, nThree) == 0)  && !$(this).hasClass("bg-info")){
            if(nScore < 1 && !$(this).hasClass("bg-info")){
                $(this).addClass("bg-danger");
                //console.log($("td:nth-child(1)", this).text());
            }
            else if(nScore < 6 && !$(this).hasClass("bg-info")){
            //else if(isAlreadyIn(selectedSkills, nOne) + isAlreadyIn(selectedSkills, nTwo) + isAlreadyIn(selectedSkills, nThree) == 1  && !$(this).hasClass("bg-info")){
                $(this).addClass("bg-warning");
                //console.log($("td:nth-child(1)", this).text());
            }
            /*else if(isAlreadyIn(selectedSkills, nOne) + isAlreadyIn(selectedSkills, nTwo) + isAlreadyIn(selectedSkills, nThree) == 2  && !$(this).hasClass("bg-info")){
                $(this).addClass("bg-warning");
                //console.log($("td:nth-child(1)", this).text());
            }*/
            else if(nScore > 5 && !$(this).hasClass("bg-info")){
            //else if(isAlreadyIn(selectedSkills, nOne) + isAlreadyIn(selectedSkills, nTwo) + isAlreadyIn(selectedSkills, nThree) == 3  && !$(this).hasClass("bg-info")){
                $(this).addClass("bg-success");
                //console.log($("td:nth-child(1)", this).text());
            }
        }
    )

}

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
        //console.log(selectedSkills[i] + "->"+tally);
    }
    document.getElementsByName("nodeEfficiency")[0].innerHTML = tally + "/" + (nodeCollection.length)*3 + "(" + Math.round((tally/(nodeCollection.length*3)*100 + Number.EPSILON) * 100) / 100 + "% Efficiency)";
}

function clearLeftoverData(){
    document.getElementsByName("skillCounter")[0].innerHTML = selectedSkills.length;
    document.getElementsByName("bestOutcome")[0].innerHTML = "0(0 slots for selected and 0 slots for any skill)" ;
    computeAuxData();

}

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


$(window).on('resize load', function () {
    if ($(window).width() < 1000) {
        $("#leftCreator").addClass('col-12').removeClass('col-4');
        $("#rightCreator").addClass('col-12').removeClass('col-8');
        $("#leftCombo").addClass('col-12').removeClass('col-6');
        $("#rightCombo").addClass('col-12').removeClass('col-6');
    } else {
        $("#leftCreator").addClass('col-4').removeClass('col-12');
        $("#rightCreator").addClass('col-8').removeClass('col-12');
        $("#leftCombo").addClass('col-6').removeClass('col-12');
        $("#rightCombo").addClass('col-6').removeClass('col-12');
    }
 });  

 function divcollapse(sectionToCollapse){
     $("#"+sectionToCollapse+"").collapse("toggle");

     $("#"+sectionToCollapse+"Arrow").toggleClass("fa-chevron-circle-up");
     $("#"+sectionToCollapse+"Arrow").toggleClass("fa-chevron-circle-down");


 }


function checkVar(){
    console.log(nodestones);
    console.log(selectedSkills);
    console.log(cannotLead);
    console.log(nodeTally);
    console.log(nodeCollection);
}