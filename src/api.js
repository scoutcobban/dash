function delayPromise(duration) {
    return function (cb, data) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(cb(data));
            }, duration)
        });
    };
}

export function getMyJobsData(filter, success) {
    const count = Math.floor(Math.random() * 5);
    let jobs = [];
    for(let i=0; i<count; i++){
        jobs.push({title: `${filter} Job ${i+1}`, reqId: `2019A${i}`});
    }
    let apiMyJobs = delayPromise(Math.floor(Math.random() * 2000));
    apiMyJobs(success, {count: count, jobs: jobs});  // fake data
}

// export function getUserDashboardConfig(user, success) {
//     const
// }
