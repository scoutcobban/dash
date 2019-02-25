import uuidv1 from "uuid/v1";

// This is used to give a faux asynchronous delay of load
function delayPromise(duration) {
    return function (cb, data) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve(cb(data));
            }, duration)
        });
    };
}

export function getMyJobsData(filter, success) {
    const count = Math.floor(Math.random() * 5);
    let jobs = [];
    for (let i = 0; i < count; i++) {
        jobs.push({title: `${filter} Job ${i + 1}`, reqId: `2019A${i}`});
    }
    let apiMyJobs = delayPromise(Math.floor(Math.random() * 2000));
    apiMyJobs(success, {count, jobs});
}

export function getUserDashboardConfig(user, success) {
    const guid1 = uuidv1();
    const guid2 = uuidv1();
    const guid3 = uuidv1();
    const layout = [
        {i: guid1, x: 0, y: 0, w: 4, h: 1},
        {i: guid2, x: 4, y: 0, w: 4, h: 1},
        {i: guid3, x: 8, y: 0, w: 4, h: 1}
    ];
    const widgets = [
        {key: guid1, name: 'myJobs', config: {filter: "open"}},
        {key: guid2, name: 'myJobs', config: {filter: "closed"}},
        {key: guid3, name: 'jobQuestions', config: {jobId: "*"}}
    ];
    let apiUserDashboard = delayPromise(Math.floor(Math.random() * 2000));
    apiUserDashboard(success, {layout, widgets});
}
