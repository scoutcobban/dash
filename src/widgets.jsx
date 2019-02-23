import React from "react";


function delayPromise(duration) {
    return function (cb, data) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(cb(data));
            }, duration)
        });
    };
}


export class Widget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            config: props.config
        };
    }

    setConfig = (config) => {
        console.log("Save widget config:", config, this.props.guid);
        this.setState({config: config});
    };

    render() {
        const props = {
            setConfig: this.setConfig,
            editing: this.state.editing,
            ...this.state.config
        };
        const widget = React.createElement(this.props.component, props);
        return <div className="widget-frame">
            {/*<div className="widget-title">{this.props.title}</div>*/}
            <div className="widget-body">{widget}</div>
        </div>
    }
}

export class MyJobsWidget extends React.Component {
    constructor(props) {
        console.log("props", props);
        super(props);
        this.state = {count: 0, jobs: [], loading: true};
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        console.log("getting MyJobsWidget " + this.props.filter);
        let apiMyJobs = delayPromise(Math.floor(Math.random() * 2000));
        apiMyJobs((data) => {
            console.log(this.props.filter, "data", data);
            this.setState({...data, loading: false});
        }, {
            count: Math.floor(Math.random() * 10),
            jobs: [{title: 'job title 1', reqId: '123'}, {
                title: 'job title 2',
                reqId: '456'
            }]
        });  // fake data
    }

    configChange = () => {  // This NEEDS to be an arrow func for callback
        console.log("configChange", this.props, this.state);
        const fakeConfig = {filter: "paused"};
        this.props.setConfig(fakeConfig);
        this.setState({loading: true})
        this.loadData();
    };

    render() {
        if (this.state.loading) {
            return <div>loading...</div>;
        }
        const count = this.state.count;
        const jobs = this.state.jobs.map((job) => {
            return <div key={job.reqId}>Job: {job.title}({job.reqId})</div>
        });
        return <div>
            {this.props.filter} jobs: {count}.<br/>
            {jobs}
            <button onClick={this.configChange}>change config</button>
        </div>;
    }
}

export class JobNeedsWidget extends React.Component {
    render() {
        return <div>Rat Surgeon (A2019ED)<br/> - Why do this job?</div>;
    }
}

export class JobQuestionsWidget extends React.Component {
    render() {
        return <div>What is your favorite color?</div>;
    }
}
