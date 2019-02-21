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

const WIDGET_LIBRARY = {
    myJobs: {
        component: MyJobsWidget,
        roles: ["job-owner"],
        title: "My Jobs in Scout"
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
            layout_loaded: [
                {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
                {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
                {i: 'c', x: 4, y: 0, w: 1, h: 2}
            ],
            widgets_loaded: [
                {key: 'a', name: 'myJobs', config:{filter: "open"}},
                {key: 'b', name: 'myJobs', config:{filter: "closed"}},
                {key: 'c', name: 'jobQuestions', config:{jobId: "*"}},
            ]
        }

    }

    getConfig(){

    }

    render() {

        const widgets = this.state.widgets_loaded.map((widget)=>{
            const component = WIDGET_LIBRARY[widget.name].component;
            const title = WIDGET_LIBRARY[widget.name].title;
            return <Widget key={widget.key} component={component} title={title} config={widget.config}/>
        });

        return (
            <div className="App">

                <header>
                    <h2>Dashboard</h2>
                </header>

                <ReactGridLayout className="layout" layout={this.state.layout_loaded} cols={12}
                                 rowHeight={120} width={800}>
                    {widgets}
                </ReactGridLayout>
            </div>
        );
    }
}

export default App;
