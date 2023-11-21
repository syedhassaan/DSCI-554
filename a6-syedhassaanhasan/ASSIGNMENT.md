# # DSCI 554 Assignment 6

## Description

- Use data of your choice for the same 10 countries from A1 to implement a bar chart with smooth transitions between states triggered by user input
- Describe the data and cite your source in the page.
- Load the data in JSON format and implement a D3 bar chart complete with axes, axes labels, tick marks, tick mark labels and title.
- Use margin conventions, d3 data join, scales and axes to create the bar chart.
- Use separate html, css and Javascript files.
- Use html inputs of your choice to implement controls with the labels provided:
  1. `Reset` to reset to the initial settings (all 10 countries ordered alphabetic by name)
  2. `Order alphabetic by name`, `order ascending by value` and `order descending by value`
  3. `All 10`, `Filter top 5 by value` and `Filter bottom 5 by value`
- Use incremental commits that are consistent and tested

NB:

- Filter and order operations are independent
- Smooth transitions should be used to ensure object constancy!
- You cannot use a different d3 version than the one referenced in `package.json`

## Rubric

__15% of the grade is for the lab.__

### Bar chart (5 pts)

|               | Points | Description |
| ------------- | ------ | ----------- |
| Sophisticated | 4-5    | Chart well formatted, data is well formatted, imported as JSON, using margin conventions, uses D3 data join, axes, axes labels, tick marks, tick mark labels and title are well formatted, using scales appropriately. |
| Competent     | 2-3    | Chart is not well formatted, data is not well formatted or JSON improperly used, improper use of margin conventions, improper uses of D3 data join, axes, axes labels, tick marks, tick mark labels and title are not well formatted, not using scales appropriately.|
| Needs work    | 0-1    | Chart is not formatted, data is not formatted or JSON is not used, not using margin conventions, not using of D3 data join, axes, axes labels, tick marks, tick mark labels and title are not included, not using scales. |

### Smooth transitions (5 pts)

|               | Points | Description |
| ------------- | ------ | ----------- |
| Sophisticated | 4-5    | Smooth transitions based on user input reorder the bars and update the axes, axes labels, tick marks, tick mark labels and title are working well between any two combinations. Allows to show: all bars in alphabetic order (default), ascending order, descending order, show only top 5, show only bottom 5. |
| Competent     | 2-3    | Smooth transitions based on user input to reorder the bars not working well. Updates to the axes, axes labels, tick marks, tick mark labels and title are not working well between any two combinations. Does not allow to show well: all bars in alphabetic order (default), ascending order, descending order, show only top 5, show only bottom 5. |
| Needs work    | 0-1    | Smooth transitions based on user input to reorder the bars not working. Updates to the axes, axes labels, tick marks, tick mark labels and title are not working between any two combinations. Does not allow to show: all bars in alphabetic order (default), ascending order, descending order, show only top 5, show only bottom 5. |

### Development (5 pts)

|               | Points | Description |
| ------------- | ------ | ----------- |
| Sophisticated | 4-5    | Using sound development practices. Using js, css and html files. Using node libraries. Page is well formatted. Page describes the data and cite data source. Page works well. |
| Competent     | 2-3    | Not using well development practices. Not using well js, css and html files. Not using well node libraries. Page is not well formatted. Page does not describe the data or cite data source well. Page does not work well. |
| Needs work    | 0-1    | Not using sound development practices. Not using js, css and html files. Not using node libraries. Page is not formatted. Page does not describe the data and cite data source. Page does not work well. |

## Homework Guidelines

- Homework repository must be updated before the deadline
- Commits after the deadline will not be considered unless requested
- Late policy: 10% of total available points per each late day; duration less than 24 hours counts as one whole day
- Homework is expected to work in CHROME
