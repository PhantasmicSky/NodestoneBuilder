Test: 1|Adele|0,2,5|6,7,5|5,7,6|7,5,6|6,5,7|4,5,7|4,0,3
Eviscerate , Reign, Cleave
    void printCombination(/*arr[], int n, int r*/)  
    {  
        // A temporary array to store 
        // all combination one by one
        var arr = nodestone;
        var n = nodestone.length;
        var r = Math.ceil(selectedSkills.length*2/3);  
        var data = [];  
    
        // Print all combination using 
        // temprary array 'data[]'  
        combinationUtil(arr, data, 0, n-1, 0, r);  
    };
    
    /* arr[] ---> Input Array  
    data[] ---> Temporary array to  
    store current combination  
    start & end ---> Staring and 
    Ending indexes in arr[]  
    index ---> Current index in data[]  
    r ---> Size of a combination to be printed */
    void combinationUtil(arr, data,  
                        start, end,  
                        index, r)  
    {  
        // Current combination is ready 
        // to be printed, print it  
        if (index == r)  
        {  
            /*for (var j = 0; j < r; j++)  
                cout << data[j] << " ";  
            cout << endl;  */
            console.log(data);
            return;  
        }  
    
        // replace index with all possible  
        // elements. The condition "end-i+1 >= r-index" 
        // makes sure that including one element  
        // at index will make a combination with  
        // remaining elements at remaining positions  
        for (var i = start; i <= end &&  
            end - i + 1 >= r - index; i++)  
        {  
            data[index] = arr[i];  
            combinationUtil(arr, data, i+1,  
                            end, index+1, r);  
        }  
    };    
    // This code is contributed by rathbhupendra 
    function legalLeading(data){
        var leads = [];
        console.log(data);
        for(var i = 0; i < data.length; i++){
            if(isAlreadyIn(leads, data[i][0])){
               // console.log(data[i][0] + " is already inside " + leads);
                return false;
            }
            else{
                leads.push(data[i][0]);
            }
        }
        return true;

    };