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
                d === '' ? '' :
                    '#CCCCCC');
            }
            else if (options.column_name === "status") {
                return (d) => (
                d === '' ? '' :
                    '#CCCCCC');
            }
        }
        else {
            return (d) => ('#CCCCCC');
        }
    },
    
    symbolize(value, symbol) {
        return (symbol === '$' ? '$' + value : 
        symbol === 'word' ? (value === 1 ? 'Yes' : value === 0 ? 'No' : 'Unknown'):
        value + symbol)
    }

}