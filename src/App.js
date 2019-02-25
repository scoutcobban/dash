import React, {Component} from 'react';
import GridLayout from 'react-grid-layout';
import _ from 'lodash';
import {
    Widget,
    MyJobsWidget,
    JobNeedsWidget,
    JobQuestionsWidget
} from "./widgets";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
// const ReactGridLayout = WidthProvider(RGL);

const HIRING_HOST = "https://localhost:5000";

// Register all the widgets here, limit which role can add what
const WIDGET_LIBRARY = {
    myJobs: {
        component: MyJobsWidget,
        roles: ["job-owner"],
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
    static defaultProps = {
        className: "layout",
        items: 20,
        rowHeight: 30,
        onLayoutChange: function () {
        },
        cols: 12
    };

    constructor(props) {
        super(props);
        this.state = {
            layout: [
                {i: 'a', x: 0, y: 0, w: 4, h: 1},
                {i: 'b', x: 4, y: 0, w: 4, h: 1},
                {i: 'c', x: 8, y: 0, w: 4, h: 1}
            ],
            widgets: [
                {key: 'a', name: 'myJobs', config: {filter: "open"}},
                {key: 'b', name: 'myJobs', config: {filter: "closed"}},
                {key: 'c', name: 'jobQuestions', config: {jobId: "*"}},
            ]
        }

    }

    layoutChange = (layout) => {
        console.log("Saved to the server:", layout);
        this.setState(layout);
    };

    addWidget = () => {
        const guid = 'd';
        const name = 'jobNeeds';
        console.log("adding", name, "guid", guid);
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

        const widgets = this.state.widgets.map((widget) => {
            return this.makeWidget(widget)
        });

        return (
            <div className="App">

                <header>
                    <h2>Dashboard</h2>
                    <button onClick={this.addWidget}>Add Widget</button>
                </header>

                <GridLayout className="layout"
                            layout={this.state.layout}
                            onLayoutChange={this.layoutChange}
                            cols={12}
                            rowHeight={120}
                            width={800}>
                    {widgets}
                </GridLayout>
            </div>
        );
    }
}

export default App;
