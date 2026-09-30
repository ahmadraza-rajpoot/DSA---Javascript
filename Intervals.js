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