// Intervals problems and solutions


/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {

    let isMerged = true;
    while(isMerged){
        isMerged = false
        for(let i =0; i<intervals.length; i++){
        let j = i+1;

            while(j<intervals.length){
                let intv1 = intervals[i];
                let intv2 = intervals[j];
                
                if( overlap(intv1, intv2)){
                
                    intervals[i][0] = Math.min(intv1[0], intv2[0]);
                    intervals[i][1] = Math.max(intv1[1], intv2[1]);
                
                    intervals.splice(j,1)
                    isMerged = true;
                }else{
                    j++
                }
            }
        }
    }
 

    return intervals
};

function overlap(intv1, intv2){
    return intv1[1] >= intv2[0] && intv1[0] <= intv2[1]
}

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {

    intervals.sort((a, b) => a[0] - b[0]);
    let result = [];
    result.push(intervals[0]);

    for (let i = 1; i < intervals.length; i++) {
        
        let prev = result[result.length - 1];
        let curr = intervals[i];

        if (prev[1] >= curr[0]) {
            prev[1] = Math.max(prev[1], curr[1])
        } else {
            result.push(curr)
        }
    }

    return result;
};