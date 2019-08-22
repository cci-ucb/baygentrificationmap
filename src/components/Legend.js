import React from 'react';

const Legend = (props) => {

    return (
    <div className="uk-card uk-card-default uk-card-body uk-width-1-2@m uk-card-small map-legend">
        <h5>{props.options.map_name}</h5>
        {props.options.legend_style === "standard" ?
        <div>
            <div className="legend-items">
                <div className="legend-label">{props.options.breaks[0]}</div>
                <div className="legend-label">&nbsp;</div>
                <div className="legend-label">{(props.options.breaks[1] + props.options.breaks[2])/2}</div>
                <div className="legend-label">&nbsp;</div>
                <div className="legend-label">{props.options.breaks[3]}</div>
            </div>
            <div className="legend-items">
                {[0,1,2,3,4].map( (i) => 
                    (<div className={"legend-color gradient-" + (i + 1) + (props.options.colors[i].toUpperCase() === '#FFFFFF' ? " with-border":"")} style={ { backgroundColor: props.options.colors[i] } } key={i} />)
                )}
            </div>
        </div> :
        props.options.legend_style === "classes" ?
        <div>
            <div className="legend-items">
                <div className="legend-label large">{props.options.classes[0]}</div>
                <div className="legend-label large">{props.options.classes[1]}</div>
            </div>
            <div className="legend-items">
                <div className="legend-color large color-no" style={ { backgroundColor: props.options.colors[0] } } />
                <div className="legend-color large color-yes" style={ { backgroundColor: props.options.colors[1] } } />
            </div>
        </div> : <div/>
        }
    </div>);
}

export default Legend; 
