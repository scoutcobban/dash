import React from "react";

export class Widget extends React.Component {
    constructor(props) {
        super();
        this.state = {
            editing: false
        };
    }

    getConfig = () => {
        return {};
    };

    render() {
        const widget = React.createElement(this.props.component, this.props.config);
        return <div className="widget-top-level-class">{widget}</div>
    }
}

export class MyJobsWidget extends React.Component {
    render() {
        return <div>My {this.props.filter} Jobs in Scout {this.props.count}</div>;
    }
}

export class JobNeedsWidget extends React.Component {
    render() {
        return <div>Jobs that Need Love</div>;
    }
}

export class JobQuestionsWidget extends React.Component {
    render() {
        return <div>Job Questions {this.props.count}</div>;
    }
}
