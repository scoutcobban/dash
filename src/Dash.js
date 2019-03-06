import React from "react";
import { Responsive, WidthProvider } from 'react-grid-layout';
/**
 * This layout demonstrates how to sync multiple responsive layouts to localstorage.
 */

const ResponsiveGridLayout = WidthProvider(Responsive);

class Dash extends React.Component {
  render() {
    // layout is an array of objects, see the demo for more complete usage
    let itemLayout = {
        lg: [
            {i: '1', x: 0, y: 0, w: 1, h: 1},
            {i: '2', x: 1, y: 0, w: 1, h: 1},
            {i: '3', x: 2, y: 0, w: 1, h: 1},
            {i: '4', x: 3, y: 0, w: 1, h: 1}
        ],
        md: [
            {i: '1', x: 0, y: 0, w: 1, h: 1},
            {i: '2', x: 1, y: 0, w: 1, h: 1},
            {i: '3', x: 2, y: 0, w: 1, h: 1},
            {i: '4', x: 0, y: 0, w: 1, h: 1}
        ],
        sm: [
            {i: '1', x: 0, y: 0, w: 1, h: 1},
            {i: '2', x: 1, y: 0, w: 1, h: 1},
            {i: '3', x: 0, y: 0, w: 1, h: 1},
            {i: '4', x: 1, y: 0, w: 1, h: 1}
        ],
        xs: [
            {i: '1', x: 0, y: 0, w: 1, h: 1},
            {i: '2', x: 0, y: 0, w: 1, h: 1},
            {i: '3', x: 0, y: 0, w: 1, h: 1},
            {i: '4', x: 0, y: 0, w: 1, h: 1}
        ]
    };

    // values used in the ResponsiveGridLayout props
    const containerPadVal = 16;
    const marginVal = 16;
    const rowHeightVal = 300;

    const itemWidth = 360;
    const itemWidthMin = itemWidth - 20;
    const itemWidthMax = itemWidth + 20;
    const itemMargin = marginVal / 2;
    const fullItem = (itemMargin * 2 ) + itemWidth;

    console.log("full", fullItem);

    const colLg = 4;
    const colMd = 3;
    const colSm = 2;
    const colXs = 1;

    console.log("bp", colLg, colMd, colSm, colXs);

    const breakLg = fullItem * colLg;
    const breakMd = fullItem * colMd;
    const breakSm = fullItem * colSm;
    const breakXs = fullItem * colXs;

    console.log("bp", breakLg, breakMd, breakSm, breakXs);

    return (
      <ResponsiveGridLayout
        className="scout-layout"
        // breakpoints based on assumed item width of 360
        breakpoints={{
            lg: breakLg,
            md: breakMd,
            sm: breakSm,
            xs: breakXs
        }}
        cols={{
            lg: colLg,
            md: colMd,
            sm: colSm,
            xs: colXs
        }}
        layouts={itemLayout}
        // margin between items - default is [10, 10]
        // TO DO: get values from JS/SCSS shared values
        margin={[marginVal, marginVal]}
        // padding inside the container - default is [10, 10]
        // TO DO: get values from JS/SCSS shared values
        containerPadding={[containerPadVal, containerPadVal]}
        rowHeight={rowHeightVal}
        isDraggable={false}
        isResizable={false}
      >
        <div key="1">1</div>
        <div key="2">2</div>
        <div key="3">3</div>
        <div key="4">4</div>
      </ResponsiveGridLayout>
    )
  }
}

export default Dash;
