export default {

    getColorFunction(options) {
        if (options.legend_style === "standard") {
        return (d) => (
            d < options.breaks[0] ? options.colors[0] :
            d < options.breaks[1] ? options.colors[1] :
            d < options.breaks[2] ? options.colors[2] :
            d < options.breaks[3] ? options.colors[3] :
            d >= options.breaks[3] ? options.colors[4] :
            '#CCCCCC');
        }
        else if (options.legend_style === "classes") {
        return (d) => (
            d === options.breaks[0] ? options.colors[0] :
            d === options.breaks[1] ? options.colors[1] :
            '#CCCCCC');
        }
        else if (options.legend_style === "custom") {
            if (options.column_name === "udp_2015_1") {
                return (d) => (
                d === 'LI - Not Losing Low Income Households or Very Early Stages of Gentrification/Displacement' ? '#d9d7e9' :
                d === 'LI - At Risk of Gentrification and/or Displacement' ? '#b7b5d6' :
                d === 'LI - Ongoing Gentrification and/or Displacement' ? '#9080ba' :
                d === 'MHI - Advanced Gentrification' ? '#F3D289' :
                d === 'MHI - Not Losing Low Income Households or Very Early Stages of Displacement' ? '#feedde' :
                d === 'MHI - At Risk of Exclusion' ? '#fdbe85' :
                d === 'MHI - Ongoing Exclusion' ? '#fd8d3c' :
                d === 'MHI - Advanced Exclusion' ? '#d94701' :
                    '#CCCCCC');
            }
            else if (options.column_name === "commercial_gent_status") {
                return (d) => (
                d === 'Did not gentrify' ? '#d7d7d7' :
                d === 'Gentrified 1990-2000' ? '#a6cee3' :
                d === 'Gentrified 2000-2013' ? '#1f78b4' :
                d === 'Gentrified both periods' ? '#33a02c' :
                    '#CCCCCC00');
            }
        }
        else {
            return (d) => ('#CCCCCC');
        }
    },

    symbolize(value, symbol) {
        const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        return (symbol === '$' ? '$' + numberWithCommas(value) : 
        symbol === 'word' ? (value === 1 ? 'Yes' : value === 0 ? 'No' : 'Unknown'):
        numberWithCommas(value) + symbol)
    }
    
}