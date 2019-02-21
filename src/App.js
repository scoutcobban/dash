import React, {Component} from 'react';
import ReactGridLayout from "react-grid-layout";
import './App.css';
import {Widget, MyJobsWidget, JobNeedsWidget, JobQuestionsWidget} from "./widgets";

const HIRING_HOST = "https://localhost:5000";

const WIDGET_LIBRARY = {
    myJobs: {component: MyJobsWidget, roles: ["job-owner"]},
    jobNeeds: {
        component: JobNeedsWidget,
        dataUrl: HIRING_HOST + "/hiring/my-jobs-dashboard"
    },
    jobQuestions: {component: JobQuestionsWidget}
};

class App extends Component {
  render() {
    const component1 = WIDGET_LIBRARY['myJobs'].component; //TODO conver to map from user data load
    const config1 = {filter: "open", count: 2};
    const component2 = WIDGET_LIBRARY['myJobs'].component;
    const config2 = {filter: "closed", count: 3};
    const component3 = WIDGET_LIBRARY['jobQuestions'].component;
    const config3 = {count: 6};

    const layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
      {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: 'c', x: 4, y: 0, w: 1, h: 2}
    ];

    return (
      <div className="App">
        <header className="App-header">
          <div>Header</div>
<ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
          <Widget key="a" component={component1} config={config1} />
          <Widget key="b" component={component2} config={config2} />
          <Widget key="c" component={component3} config={config3} />
</ReactGridLayout>
          <div>Footer</div>
        </header>
      </div>
    );
  }
}

export default App;
