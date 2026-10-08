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
}

/**
 * @param {number[][]} firstList
 * @param {number[][]} secondList
 * @return {number[][]}
 */

var intervalIntersection = function (firstList, secondList) {
    let n = firstList.length;
    let m = secondList.length;

    let res = [];

    let i = 0;
    let j = 0;

    while (i < n && j < m) {
        let firstIntv = firstList[i];
        let secondIntv = secondList[j];

        if (isOverlap(firstIntv, secondIntv)) {
            let interSec = new Array(2);
            interSec[0] = Math.max(firstIntv[0], secondIntv[0]);
            interSec[1] = Math.min(firstIntv[1], secondIntv[1]);

            res.push(interSec);
        }

        if (firstIntv[1] < secondIntv[1]) {
            i++
        } else {
            j++
        }

    }

    return res
};

// var intervalIntersection = function(firstList, secondList) {

//     let res = [];

//     for(let i = 0; i<firstList.length; i++){

//         let firstIntv = firstList[i];

//         for(let j =0; j<secondList.length; j++){

//             let secondIntv = secondList[j];

//             if(isOverlap(firstIntv, secondIntv)){
//                 let interSec = new Array(2);
//                 interSec[0] = Math.max(firstIntv[0], secondIntv[0]);
//                 interSec[1] = Math.min(firstIntv[1], secondIntv[1]);

//                 res.push(interSec);
//             }
//         }
//     }

//     return res
// };

function isOverlap(intv1, intv2) {
    return intv1[1] >= intv2[0] && intv1[0] <= intv2[1]
}

/**
 * @param {number} days
 * @param {number[][]} meetings
 * @return {number}
 */
var countDays = function(days, meetings) {
    let n = meetings.length;
    meetings.sort((a,b) => a[0] - b[0]);
    let mergeMeetings = [];

    mergeMeetings.push(meetings[0]);

    for(let i = 1; i<n; i++){
        let prevIntv = mergeMeetings[mergeMeetings.length - 1];
        let currIntv = meetings[i]

        if(isOverlap(prevIntv, currIntv)){
            prevIntv[1] = Math.max(currIntv[1], prevIntv[1])
        }else{
            mergeMeetings.push(currIntv)
        }
    }

   // console.log(mergeMeetings)
    let totalDays = 0;
    for(let meeting of mergeMeetings){
        totalDays += (meeting[1] - meeting[0]) + 1
    }

   // console.log(days - totalDays)

    return days - totalDays
};


function isOverlap(intv1, intv2){

    return intv1[1] >= intv2[0] && intv1[0] <= intv2[1]
}


// optimized approach for leetcode 3169
var countDays = function(days, meetings) {
    let n = meetings.length;
    meetings.sort((a,b) => a[0] - b[0]);
    
    let maxEnd = meetings[0][1]
    let gap = 0;
    for(let i = 1; i<n; i++){

        if(maxEnd < meetings[i][0]){
            
            gap += (meetings[i][0] - maxEnd) - 1;

            maxEnd = meetings[i][1]
        }

        maxEnd = Math.max(maxEnd, meetings[i][1])
    }

    gap += meetings[0][0] - 1;

    gap = (days + gap) - maxEnd;

    return gap
};

/**
 * @param {number[][]} intervals
 * @return {number}
 */
var removeCoveredIntervals = function (intervals) {

    let n = intervals.length;

    intervals.sort((a, b) => {

        if (a[0] == b[0]) return b[1] - a[1];

        return a[0] - b[0]

    })

    let count = 1;
    let maxEnd = intervals[0][1];

    for(let i = 1; i<n; i++){
        let curr = intervals[i];

        if(maxEnd < curr[1]){
            count++;
            maxEnd = curr[1]
        }
    }

    return count;
};




// var removeCoveredIntervals = function (intervals) {

//     let n = intervals.length;

//     intervals.sort((a, b) => {

//         if (a[0] == b[0]) return b[1] - a[1];

//         return a[0] - b[0]

//     })

//     let newIntervals = []

//     newIntervals.push(intervals[0])

//     for (let i = 1; i < n; i++) {

//         let intv1 = intervals[i];
//         let intv2 = newIntervals[newIntervals.length - 1]

//         if (!isCovered(intv2, intv1)) {
//             newIntervals.push(intv1)
//         }
//     }

//     return newIntervals.length
// };

// function isCovered(intv1, intv2) {

//     return intv1[0] <= intv2[0] && intv2[1] <= intv1[1]
// }