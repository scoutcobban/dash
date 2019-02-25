import React, {Component} from 'react';
import GridLayout from 'react-grid-layout';
import uuidv1 from "uuid/v1";
import _ from 'lodash';


import {getUserDashboardConfig} from "./api";
import {
    Widget,
    MyJobsWidget,
    JobNeedsWidget,
    JobQuestionsWidget
} from "./widgets";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// Register all the widgets here, limit which role can add what?
const WIDGET_LIBRARY = {
    myJobs: {
        component: MyJobsWidget,
        roles: ["jobOwner"],
        title: "My Jobs in Scout"  // todo make this dynamic?
    },
    jobNeeds: {
        component: JobNeedsWidget,
        title: "Jobs that Need Love"
    },
    jobQuestions: {
        component: JobQuestionsWidget,
        title: "Job Questions"
    }
};

class App extends Component {
    render() {
        return (
            <div className="App">
                <header>
                    <h2>Dashboard</h2>
                </header>
                <Dashboard user={"Eamon Cournane"}/>
            </div>
        );
    }
}

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            layout: [],
            widgets: []
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        console.log("getting UserDashboardConfig " + this.props.user);
        getUserDashboardConfig(this.props.user, (data) => {
            console.log(this.props.user, "data", data);
            this.setState({...data, loading: false});
        });
    }

    layoutChange = (layout) => {
        console.log("Saved to the server:", layout);
        this.setState(layout);
    };

    addWidget = (name) => {
        const guid = uuidv1();
        console.log("adding guid", guid, name);
        const layout = this.state.layout.concat({
            i: guid,
            x: (this.state.layout.length * 4) % (this.state.cols || 12),
            y: Infinity, // puts it at the bottom
            w: 4,
            h: 1
        });
        const widgets = this.state.widgets.concat({
            key: guid, name: name, config: {}
        });
        this.setState({layout, widgets});
    };

    addMyJobs = () => {
        this.addWidget('myJobs');
    };

    addJobNeeds = () => {
        this.addWidget('jobNeeds');
    };

    addJobQuestions = () => {
        this.addWidget('jobQuestions');
    };

    removeWidget(guid) {
        console.log("removing guid", guid);
        const layout = _.reject(this.state.layout, {i: guid});
        const widgets = _.reject(this.state.widgets, {key: guid});
        this.setState({layout, widgets});
    }

    makeWidget(widget) {
        const removeStyle = {
            position: "absolute",
            right: "2px",
            top: 0,
            cursor: "pointer"
        };
        const component = WIDGET_LIBRARY[widget.name].component;
        const title = WIDGET_LIBRARY[widget.name].title;
        return <div key={widget.key}>
            <div>
                <span className="widget-title">{title}</span>
                <span className="remove"
                      style={removeStyle}
                      onClick={this.removeWidget.bind(this, widget.key)}
                >x</span>
            </div>
            <Widget guid={widget.key}
                    component={component}
                    config={widget.config}/>
        </div>
    }

    render() {
        let dash = null;
        if (this.state.loading) {
            dash = <div>loading...</div>;
        } else {
            const widgets = this.state.widgets.map((widget) => {
                return this.makeWidget(widget)
            });
            dash = (
                <GridLayout className="layout"
                               layout={this.state.layout}
                               onLayoutChange={this.layoutChange}
                               cols={12}
                               rowHeight={120}
                               width={800}>
                {widgets}
            </GridLayout>
            )
        }


        return (
            <div>
                <div className="controls">
                    <button onClick={this.addMyJobs}>
                        Add My Jobs in Scout
                    </button>
                    <button onClick={this.addJobNeeds}>
                        Add Jobs that Need Love
                    </button>
                    <button onClick={this.addJobQuestions}>
                        Add Job Questions
                    </button>
                </div>
                {dash}
            </div>
        );
    }
}

export default App;
