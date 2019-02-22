import React, {Component} from 'react';
import ReactGridLayout from "react-grid-layout";
import './App.css';
import {
    Widget,
    MyJobsWidget,
    JobNeedsWidget,
    JobQuestionsWidget
} from "./widgets";

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
        dataUrl: HIRING_HOST + "/hiring/my-jobs-dashboard",
        title: "Jobs that Need Love"
    },
    jobQuestions: {
        component: JobQuestionsWidget,
        title: "Job Questions"
    }
};

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            layout: [
                {i: 'a', x: 0, y: 0, w: 2, h: 2},
                {i: 'b', x: 1, y: 0, w: 2, h: 2},
                {i: 'c', x: 2, y: 0, w: 2, h: 4}
            ],
            widgets: [
                {key: 'a', name: 'myJobs', config:{filter: "open"}},
                {key: 'b', name: 'myJobs', config:{filter: "closed"}},
                {key: 'c', name: 'jobQuestions', config:{jobId: "*"}},
            ]
        }

    }

    layoutChange = (layout) => {
        console.log("Saved to the server:", layout);
        this.setState(layout);
    }

    addWidget(){

    }

      // onRemoveItem(i) {
      //   console.log("removing", i);
      //   this.setState({ items: _.reject(this.state.items, { i: i }) });
      // }

    makeWidget(widget){
        const component = WIDGET_LIBRARY[widget.name].component;
        const title = WIDGET_LIBRARY[widget.name].title;
        return <Widget key={widget.key}
                       id={widget.key}
                       component={component}
                       title={title}
                       config={widget.config}/>
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

                <ReactGridLayout className="layout"
                                 layout={this.state.layout}
                                 onLayoutChange={this.layoutChange}
                                 cols={12}
                                 rowHeight={120}
                                 width={800}>
                    {widgets}
                </ReactGridLayout>
            </div>
        );
    }
}

export default App;
