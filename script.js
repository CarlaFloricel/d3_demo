const books_data = [
    { id: "y1", books: 2, year: 2019 },
    { id: "y2", books: 48, year: 2020 },
    { id: "y3", books: 52, year: 2021 },
    { id: "y4", books: 16, year: 2022 }
];

const width = 400;
const height = 250;
let selected_data = books_data;

const svg = d3.select('#svg')
    .append('svg')
    .attr("width", width)
    .attr("height", height);



function renderBarChart() {
    console.log(selected_data)
    var x = d3.scaleBand()
        .range([10, width - 10])
        .domain(books_data.map(d => d.year))
        .padding(0.2);
    svg.append("g")
        .attr("transform", "translate(-10," + (height - 20) + ")")
        .call(d3.axisBottom(x))
        .selectAll("text");

    var y = d3.scaleLinear()
        .domain([0, d3.max(books_data, d => d.books)])
        .range([height, 40]);

    svg.selectAll('.rect')
        .data(selected_data, d => d.id)
        .enter()
        .append("rect")
        .attr("class", 'rect')
        .attr('width', 50)
        .attr('height', v => height - y(v.books))
        .attr("x", v => x(v.year))
        .attr("y", v => y(v.books) - 20)
        .attr("fill", "#69b3a2");
    svg.selectAll('.rect').data(selected_data, d => d.id).exit().remove()


    svg.selectAll(".label")
        .data(selected_data, d => d.id)
        .enter()
        .append('text')
        .text((v) => v.books)
        .attr("x", v => x(v.year) + 25)
        .attr("y", v => y(v.books) - 20)
        .attr("text-anchor", 'middle')
        .attr("class", "label")
    svg.selectAll('.label').data(selected_data, d => d.id).exit().remove()
}

renderBarChart()


let unselected_years = [];

const reading_years = d3.select("#years")
    .select('ul')
    .selectAll('li')
    .data(books_data)
    .enter()
    .append("li");

reading_years.append('span').text(data => "# books " + data.year).attr("id", (data) => data.id)
reading_years.append('input').attr("type", "checkbox").attr("checked", true)
    .on("change", (data) => {

        if (!unselected_years.includes(data.target.__data__.id)) {
            unselected_years.push(data.target.__data__.id);
        }
        else {
            unselected_years = unselected_years.filter(id => id !== data.target.__data__.id);
        }
        selected_data = books_data.filter(d => !unselected_years.includes(d.id)).sort()

        renderBarChart()
    })