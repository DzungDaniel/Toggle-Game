
// DECLARATIONS
const table = document.getElementById('colorMatrix');
var numRows = parseInt(document.getElementById('rows').value, 10);
var numCols = parseInt(document.getElementById('cols').value, 10);
var matrix = [];
var visited = new Set();

class CellData
{
    constructor(y, x, color)
    {
        this.y = y;
        this.x = x;
        this.color = color;
    }
}

function getRandomColor() 
{
    const COLORS = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];
    const randomIndex = Math.floor(Math.random() * COLORS.length);
    return COLORS[randomIndex];
}

function renderColor()
{
    for (let i = 0; i < matrix.length; i++) 
    {
        for (let j = 0; j < matrix[i].length; j++) 
        {
            const cell = table.rows[i].cells[j];        
            const cellData = matrix[i][j];
            if (visited.has(cellData))
                cell.style.border = '3px solid black';
            else
                cell.style.border = '3px';
        }
    }
}

function getAdjs(cellData)
{
    const adjs = [];
    const directions = [
        { y: -1, x: 0 }, // Top
        { y: 0, x: 1 },  // Right
        { y: 1, x: 0 },  // Bottom
        { y: 0, x: -1 }  // Left
    ];

    directions.forEach(dir => {
        const x = dir.x + cellData.x;
        const y = dir.y + cellData.y;
        valid = x >= 0 && x < numCols &&
                y >= 0 && y < numRows;
        if (valid) adjs.push(matrix[y][x])
    });

    return adjs;
}

function dfs(cellData)
{
    if (visited.has(cellData)) 
        return;
    visited.add(cellData);
    
    const adjs = getAdjs(cellData);
    adjs.forEach(neighbor => {
        if (neighbor.color == cellData.color) 
            dfs(neighbor);
    });
}

function highLightChunk(cellData)
{
    visited.clear();
    dfs(cellData);
    renderColor();
}

function resetMatrix()
{
    numRows = parseInt(document.getElementById('rows').value, 10);
    numCols = parseInt(document.getElementById('cols').value, 10);
    matrix = [];

    // INIT DATA MATRIX
    for (let i = 0; i < numRows; i++) 
    {
        const row = [];
        for (let j = 0; j < numCols; j++) 
        {
            const color = getRandomColor();
            row.push(new CellData(i, j, color));
        }
        matrix.push(row);
    }
    
    // INIT UI MATRIX
    table.innerHTML = ''
    for (let i = 0; i < matrix.length; i++) 
    {
        const row = table.insertRow();
        for (let j = 0; j < matrix[i].length; j++) 
        {
            const cell = row.insertCell();        
            const cellData = matrix[i][j];
            cell.style.backgroundColor = cellData.color;
            cell.addEventListener('click', () => highLightChunk(cellData));
        }
    }
}

resetMatrix();