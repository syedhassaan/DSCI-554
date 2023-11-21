# DSCI 554 Assignment 8

## Description

In this assignment you will create 4 maps:

1. Using countries from assignment 1 and UN data of your choice, build a proportional symbol map
2. Using countries from assignment 1 and UN data of your choice, build a choropleth map
3. Using data of your choice from the [County of Los Angeles Open Data website](https://data.lacounty.gov/browse?limitTo=maps&utf8=%E2%9C%93) build a D3 map.
4. Using [https://geohub.lacity.org/datasets/building-footprints/data?geometry=-118.299%2C34.018%2C-118.269%2C34.024&orderBy=BLD_ID&orderByAsc=false&where=BLD_ID](Los Angeles GeoHub Building Footprints) build a Mapbox map showing some counts of your choice for all building footprints in UPC (you can collaborate with your project group to share the work of creating the footprints).

__Must use latest available D3 from node.__

## Rubric

__15% of the grade is for the lab.__

### Development (5 pts)

| Quality       | Points | Description |
| ------------- | ------ | ----------- |
| Sophisticated | 4-5    | Good development practices are demonstrated. Using node. Page(s) render without errors. Pages are well formatted with a proper layout. The maps are well documented, include labels, legend, and title as appropriate. |
| Competent     | 2-3    | Good development practices are not well demonstrated. Not using node. Page(s) render with errors. Pages are not well formatted with a proper layout. The maps are not well documented, include labels, legend, and title as appropriate. |
| Needs work    | 0-1    | Good development practices are not demonstrated. Not using node. Page(s) do not render or render with errors. Pages are not formatted with a proper layout. The maps are not documented, include labels, legend, and title as appropriate. |

### Proportional symbol map (5 pts)

Using countries from assignment 1 and UN data of your choice, build a Proportional symbol map.

| Quality       | Points | Description |
| ------------- | ------ | ----------- |
| Sophisticated | 4-5    | Map data is well formatted in TopoJSON, using appropriate projection. Data is well formatted and imported. D3 data join is well used. Colors, labels, title and legend are well formatted and used, scales are well used. |
| Competent     | 2-3    | Map data is not well formatted in TopoJSON, not using appropriate projection. Data is not well formatted and imported. D3 data join is not well used. Colors, labels, title and legend are not well formatted and used, scales are not well used. |
| Needs work    | 0-1    | Map data is not formatted in TopoJSON, not using appropriate projection. Data is not formatted and imported. D3 data join is not used. Colors, labels, title and legend are not formatted and used, scales are not used. |

### Choropleth map (5 pts)

Using countries from assignment 1 and UN data of your choice, build a choropleth map.

Same rubric as the Proportional Symbol Map.

### Los Angeles County map (5 pts)

Using data of your choice from the [County of Los Angeles Open Data website](https://data.lacounty.gov/browse?limitTo=maps&utf8=%E2%9C%93) build a D3 map. Map should be in __projected TopoJSON__ format. You can map the data in the TopoJSON or map it in the page.

Same rubric as the Proportional Symbol Map.

### Mapbox Building Footprints Map (5 pts)

Using Mapbox create a map showing all building footprints for USC UPC. Use data from [https://geohub.lacity.org/datasets/building-footprints/data?geometry=-118.299%2C34.018%2C-118.269%2C34.024&orderBy=BLD_ID&orderByAsc=false&where=BLD_ID](Los Angeles GeoHub Building Footprints). Generate a synthetic dataset where each building footprint encodes some data (e.g., maximum number of people a building can allow, or the number of lecture hall seats, or the average number of people present during the week). Encode the value using a color scale and use it on the color the footprints. You can work within your project group to generate the footprint files.

| Quality       | Points | Description |
| ------------- | ------ | ----------- |
| Sophisticated | 4-5    | Map data are well formatted. Labels, title and legend are well formatted and used, scales are well used. |
| Competent     | 2-3    | Map data are not well formatted. Labels, title and legend are not well formatted and used, scales are not well used. |
| Needs work    | 0-1    | Map data are missing or not formatted. Labels, title and legend are missing or not well formatted, scales are not used. |

## Homework Guidelines

- Homework repository must be updated before the deadline
- Commits after the deadline will not be considered unless requested
- Late policy: 10% of total available points per each late day; duration less than 24 hours counts as one whole day
- Homework is expected to work in CHROME
