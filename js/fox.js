var Fox = {

    utils: {
        merge: function (base, extension) {
            for (prop in extension) {
                base[prop] = extension[prop];
            }
            return base;
        },
        styleString: function (style) {
            styleString = '';
            for (s in style) {
                styleString += s + ':' + style[s] + ';';
            }
            return styleString || '';
        }
    },

    makeLayout: function(art, options) {
        var layout;
        if (options && options.type=='flex') {
            layout = this.makeFlex(art, options);
        }
        return layout || this.makeTable(art, options);
    },

    makeFlex: function(art, options) {
        return null;
    },

    makeTable: function(art, options) {

        options = this.utils.merge({
            output: 'node',
            debug: false,
            map: {},
            styles: {}
        }, options);

        var colX = [], rowY = [];
        art.forEach(function (row, y) {
           row.split('').forEach(function (cell, x) {
                if (cell == '+') {
                    colX[x] = true;
                    rowY[y] = true;
                };
            });
        });

        // wish this was python
        var columns = [], rows = [];
        colX.forEach(function (flag, x) {
            if (flag) {
                columns.push(x);
            }
        });
        rowY.forEach(function (flag, y) {
            if (flag) {
                rows.push(y);
            }
        });

        var table = [], tableRow = [], tableCell = {},
            r = 0, rowLength = rows.length,
            c = 0, columnLength = columns.length,
            y, y1, yn, x, x1, xn,
            style, styleString;

        while (r < rowLength - 1) {
            console.log(r);
            c = 0;
            tableRow = [];
            y = rows[r];
            y1 = rows[r] + 1;
            while (c < columnLength - 1) {
                console.log(c);
                tableCell = {colspan:1, rowspan:1};
                x = columns[c];
                x1 = columns[c] + 1;
                if (art[y1][x] == '|' && art[y][x1] == '-') {
                    xn = columns[c + 1];
                    while (art[y1][xn] != '|') {
                        tableCell.colspan += 1;
                        xn = columns[c + tableCell.colspan];
                    }
                    yn = rows[r + 1];
                    while (art[yn][x1] != '-') {
                        tableCell.rowspan += 1;
                        yn = rows[r + tableCell.rowspan];
                    }
                    key = art[y1][x1];
                    if (key) {
                        if (options.map[key]) {
                            tableCell.content = options.map[key];
                        } else {
                            tableCell.content = key;
                        }
                        if (options.styles[key]) {
                            tableCell.style = this.utils.styleString(options.styles[key]);
                        }
                    }
                    tableRow.push(tableCell);
                }
                c += tableCell.colspan;
            }
            table.push(tableRow);
            r += 1;
        };
        if (options.styles['table']) {
            table.style = this.utils.styleString(options.styles['table']);
        }

        if (options.debug) {
            console.log({
                colX: colX,
                rowY: rowY,
                columns: columns,
                rows: rows,
                table: table
            });
        }

        if (options.output == 'obj') {
            return table;
        } else if (options.output=='node') {
            return this.toTableElement(table);
        } else if (options.output == 'html') {
            return this.toTableElement(table).outerHTML;
        }
        return null;
    },

    toTableElement: function (table) {
        var tableElement = document.createElement('table'), rowElement, cellElement;
        table.forEach(function (row) {
            rowElement = document.createElement('tr');
            row.forEach(function (cell) {
                cellElement = document.createElement('td');
                if (cell.colspan > 1) {
                    cellElement.setAttribute('colspan', cell.colspan);
                }
                if (cell.rowspan > 1) {
                    cellElement.setAttribute('rowspan', cell.rowspan);
                }
                if (cell.content.el) {
                    cellElement.appendChild(cell.content.el);
                } else if (cell.content.nodeType) {
                    cellElement.appendChild(cell.content);
                } else {
                    cellElement.innerHTML = cell.content;
                }
                cellElement.setAttribute('style', cell.style);
                rowElement.appendChild(cellElement);
            }, this);
            tableElement.appendChild(rowElement);
        }, this);
        tableElement.setAttribute('style', table.style);
        return tableElement;
    }

};