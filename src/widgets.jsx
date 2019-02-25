import React from "react";
import {getMyJobsData} from "./api";


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
            <div className="widget-body">{widget}</div>
        </div>
    }
}

export class MyJobsWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: this.props.filter || 'open',  // default config
            count: 0,
            jobs: [],
            loading: true
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        console.log("getting MyJobsWidget " + this.state.filter);
        getMyJobsData(this.state.filter, (data) => {
            console.log(this.state.filter, "data", data);
            this.setState({...data, loading: false});
        });
    }

    configChange = () => {  // This NEEDS to be an arrow func for callback
        const filter = "paused";
        console.log(`configChange to ${filter}`);
        const fakeConfig = {filter: filter};
        this.props.setConfig(fakeConfig);  // Widget class saves it to db.
        this.setState({loading: true, filter: filter});
        this.loadData();
    };

    render() {
        if (this.state.loading) {
            return <div>loading...</div>;
        }
        const count = this.state.count;
        const jobs = this.state.jobs.map((job) => {
            return <div key={job.reqId}>Job: {job.title} ({job.reqId})</div>
        });
        return <div>
            {this.state.filter} job count: {count}.<br/>
            {jobs}
            <button onClick={this.configChange}>change config</button>
        </div>;
    }
}

export class JobNeedsWidget extends React.Component {
    render() {
        return <div>
            <span>Software Wrangler (A2018EF)</span>
            <ul>
                <li>Submission: Joe Joeson</li>
                <li>Submission: James Jameson</li>
            </ul>
        </div>
    }
}

export class JobQuestionsWidget extends React.Component {
    render() {
        return <div>
            <span>Rat Surgeon (A2019ED)</span>
            <ul>
                <li>Why do this job?</li>
                <li>What is your favorite color?</li>
            </ul>
        </div>;
    }
}
