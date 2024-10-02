// Sorting function
function sortTable(columnIndex) {
    const table = document.getElementById('ip-table');
    const rows = Array.from(table.rows).slice(1); // Exclude header row
    let ascending = table.getAttribute('data-sort-ascending') === 'true';

    rows.sort((a, b) => {
        const cellA = a.cells[columnIndex].innerText;
        const cellB = b.cells[columnIndex].innerText;

        if (cellA < cellB) return ascending ? -1 : 1;
        if (cellA > cellB) return ascending ? 1 : -1;
        return 0;
    });
    rows.forEach(row => table.appendChild(row)); // Reattach rows in sorted order

    // Toggle sorting order for the next click
    table.setAttribute('data-sort-ascending', !ascending);
}

// Remove a row from the table
function removeRow(button) {
    console.log("Remove button clicked");
    const row = button.closest('tr'); // Find the row containing the clicked button
    row.remove(); // Remove the entire row
}
