/*
    File: "https://wxuhao.github.io/js/mult_table.js"
91.61 GUI Programming I Assignment 5: Javascript
Xuhao Wang, UMass Lowell Student, xuhao_wang@student.uml.edu
Created July 29, 2020
Js for multiplication table
*/

// Called on button press
function go() {
    top1 = verify('top1');
    top2 = verify('top2');
    left1 = verify('left1');
    left2 = verify('left2');
    // Var used so that all error messages can be displayed before returning
    var valid = true;
    if (top2 < top1) {
        document.getElementById('top2').setAttribute('data-content', 'Ending must be > starting');
        $('#top2').popover('show');
        valid = false;
    }
    if (left2 < left1) {
        document.getElementById('left2').setAttribute('data-content', 'Ending must be > starting');
        $('#left2').popover('show');
        valid = false;
    }
    // Check if any are blank. Can't return before here in order to show errors
    if ([top1, top2, left1, left2].some((num) => num == null)) {
        return;
    }
    if (valid) {
        populateTable(top1, top2, left1, left2);
    }
}
// Verify input and display error messages
function verify(input) {
    value = document.getElementById(input).value;
    if (value > 50) {
        document.getElementById(input).setAttribute('data-content', 'Must be < 50');
        $('#' + input).popover('show');
    }
    else if (value < -50) {
        document.getElementById(input).setAttribute('data-content', 'Must be > -50');
        $('#' + input).popover('show');
    }
    else if (isNaN(value) || value == '') {
        document.getElementById(input).setAttribute('data-content', 'Must insert a number');
        $('#' + input).popover('show');
    }
    else {
        $('#' + input).popover('hide');
        return parseInt(value);
    }
}
// Create the table
function populateTable(topStart, topEnd, leftStart, leftEnd) {
    // Erase old table
    document.getElementById("tHead").innerHTML = '';
    document.getElementById("tBody").innerHTML = '';
    var table = document.getElementById("multTable");
    var topLength = topEnd - topStart;
    var leftLength = leftEnd - leftStart;
    // Create header row
    headRow = table.tHead.insertRow(0);
    console.log(headRow);
    // Create empty first cell
    headCell = document.createElement('th');
    headRow.appendChild(headCell);
    // Insert header cells
    for (i = 0; i <= topLength; i++) {
        headCell = document.createElement('th');
        headRow.appendChild(headCell);
        headCell.innerHTML = topStart + i;
    }
    // Insert table rows
    tBody = table.tBodies[0];
    for (i = 0; i < leftLength + 1; i++) {
        row = tBody.insertRow(i);
    }
    // Insert left header cells
    for (i = 0; i <= leftLength; i++) {
        row = table.rows[i + 1];
        cell = document.createElement('th');
        row.appendChild(cell);
        cell.innerHTML = leftStart + i;
    }
    // Populate table
    for (row = 1; row <= leftLength + 1; row++) {
        thisRow = table.rows[row];
        for (col = 1; col <= topLength + 1; col++) {
            cell = thisRow.insertCell(col);
            cell.innerHTML = (row + leftStart - 1) * (col + topStart - 1);
        }
    }
}
// Default table
populateTable(1, 5, 1, 5);