import React from 'react';

const Legend = (props) => {

    return (
    <div className="uk-card uk-card-default uk-card-body uk-width-1-2@m uk-card-small map-legend">
        <h5>{props.options.map_name}</h5>
        {props.options.legend_style === "standard" ?
        <div>
            <div className="legend-items">
                <div className="legend-label">{"< " + props.options.breaks[0]}</div>
                <div className="legend-label">&nbsp;</div>
                <div className="legend-label">{(props.options.breaks[1] + props.options.breaks[2])/2}</div>
                <div className="legend-label">&nbsp;</div>
                <div className="legend-label">{"> " + props.options.breaks[3]}</div>
            </div>
            <div className="legend-items">
                {[0,1,2,3,4].map( (i) => 
                    (<div className={"legend-color gradient-" + (i + 1) + (props.options.colors[i].toUpperCase() === '#FFFFFF' ? " with-border":"")} 
                    style={ { backgroundColor: props.options.colors[i] } } key={i} />)
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
        </div> : 
        props.options.legend_style === "custom" && props.options.column_name === "udp_2015_1" ?
        <div>
            <h6>Lower income (LI) tracts</h6>
                <div className="legend-dot" style={ { backgroundColor: '#d9d7e9' }} /> 
                <span>Not Losing Low Income Households</span>
                <br/>
                <div className="legend-dot" style={ { backgroundColor: '#b7b5d6' }} />
                <span>At Risk of Gentrification and/or Displacement</span>
                <br/>
                <div className="legend-dot" style={ { backgroundColor: '#9080ba' }} />
                <span>Ongoing Gentrification and/or Displacement</span>
            <h6>Moderate to high income (MHI) tracts</h6>
                <div className="legend-dot" style={ { backgroundColor: '#F3D289' }} />
                <span>Advanced Gentrification</span>
                <br/>
                <div className="legend-dot" style={ { backgroundColor: '#feedde' }} />
                <span>Not Losing Low Income Households</span>
                <br/>
                <div className="legend-dot" style={ { backgroundColor: '#fdbe85' }} />
                <span>At Risk of Exclusion</span>
                <br/>
                <div className="legend-dot" style={ { backgroundColor: '#fd8d3c' }} />
                <span>Ongoing Exclusion</span>
                <br/>
                <div className="legend-dot" style={ { backgroundColor: '#d94701' }} />
                <span>Advanced Exclusion</span>
            <br/>
        </div> :
         props.options.legend_style === "custom" && props.options.column_name === "commercial_gent_status" ?
         <div>
            <div className="legend-dot" style={ { backgroundColor: '#d7d7d7' }} /> 
            <span>Did not gentrify</span>
            <br/>
            <div className="legend-dot" style={ { backgroundColor: '#a6cee3' }} />
            <span>Gentrified 1990-2000</span>
            <br/>
            <div className="legend-dot" style={ { backgroundColor: '#1f78b4' }} />
            <span>Gentrified 2000-2013</span>
            <br/>
            <div className="legend-dot" style={ { backgroundColor: '#33a02c' }} />
            <span>Gentrified both periods</span>
        </div> :
        <div/>
        }
    </div>);
}

export default Legend; 
