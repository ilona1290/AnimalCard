export let LocaleText = {
    // Root
    noRowsLabel: 'Brak wyników.',
    noResultsOverlayLabel: 'Brak wyników odpowiadających zastasowynym kryteriom.',
  
    // Density selector toolbar button text
    toolbarDensity: 'Density',
    toolbarDensityLabel: 'Density',
    toolbarDensityCompact: 'Compact',
    toolbarDensityStandard: 'Standard',
    toolbarDensityComfortable: 'Comfortable',
  
    // Columns selector toolbar button text
    toolbarColumns: 'Kolumny',
    toolbarColumnsLabel: 'Wybierz kolumnę',
  
    // Filters toolbar button text
    toolbarFilters: 'Filtry',
    toolbarFiltersLabel: 'Pokaż filtry',
    toolbarFiltersTooltipHide: 'Ukryj filtry',
    toolbarFiltersTooltipShow: 'Pokaż filtry',
    toolbarFiltersTooltipActive: (count) =>
      count !== 1 ? `${count} zastosowanych filtrów` : `${count} zastosowany filter`,
  
    // Quick filter toolbar field
    toolbarQuickFilterPlaceholder: 'Szukaj...',
    toolbarQuickFilterLabel: 'Szukaj',
    toolbarQuickFilterDeleteIconLabel: 'Wyczyść',
  
    // Export selector toolbar button text
    toolbarExport: 'Eksport',
    toolbarExportLabel: 'Eksport',
    toolbarExportCSV: 'Pobierz jako CSV',
    toolbarExportPrint: 'Wydrukuj',
    toolbarExportExcel: 'Pobierz jako plik Excela',
  
    // Columns panel text
    columnsPanelTextFieldLabel: 'Znajdź kolumnę',
    columnsPanelTextFieldPlaceholder: 'Tytuł kolumny',
    columnsPanelDragIconLabel: 'Przestawianie kolumn',
    columnsPanelShowAllButton: 'Pokaż wszystko',
    columnsPanelHideAllButton: 'Ukryj wszystko',
  
    // Filter panel text
    filterPanelAddFilter: 'Dodaj nowy filtr',
    filterPanelRemoveAll: 'Usuń wszystkie filtry',
    filterPanelDeleteIconLabel: 'Usuń filtr',
    filterPanelLogicOperator: 'Operator logiczny',
    filterPanelOperator: 'Operator',
    filterPanelOperatorAnd: 'I',
    filterPanelOperatorOr: 'Lub',
    filterPanelColumns: 'Kolumny',
    filterPanelInputLabel: 'Wartość',
    filterPanelInputPlaceholder: 'Wartość',
  
    // Filter operators text
    filterOperatorContains: 'Zawiera',
    filterOperatorEquals: 'Identyczna co',
    filterOperatorStartsWith: 'starts with',
    filterOperatorEndsWith: 'ends with',
    filterOperatorIs: 'is',
    filterOperatorNot: 'is not',
    filterOperatorAfter: 'is after',
    filterOperatorOnOrAfter: 'is on or after',
    filterOperatorBefore: 'is before',
    filterOperatorOnOrBefore: 'is on or before',
    filterOperatorIsEmpty: 'is empty',
    filterOperatorIsNotEmpty: 'is not empty',
    filterOperatorIsAnyOf: 'is any of',
  
    // Filter values text
    filterValueAny: 'any',
    filterValueTrue: 'true',
    filterValueFalse: 'false',
  
    // Column menu text
    columnMenuLabel: 'Menu',
    columnMenuShowColumns: 'Show columns',
    columnMenuManageColumns: 'Manage columns',
    columnMenuFilter: 'Filter',
    columnMenuHideColumn: 'Hide column',
    columnMenuUnsort: 'Unsort',
    columnMenuSortAsc: 'Sort by ASC',
    columnMenuSortDesc: 'Sort by DESC',
  
    // Column header text
    columnHeaderFiltersTooltipActive: (count) =>
      count !== 1 ? `${count} active filters` : `${count} active filter`,
    columnHeaderFiltersLabel: 'Show filters',
    columnHeaderSortIconLabel: 'Sort',
  
    // Rows selected footer text
    footerRowSelected: (count) =>
      count !== 1
        ? `${count.toLocaleString()} rows selected`
        : `${count.toLocaleString()} row selected`,
  
    // Total row amount footer text
    footerTotalRows: 'Total Rows:',
  
    // Total visible row amount footer text
    footerTotalVisibleRows: (visibleCount, totalCount) =>
      `${visibleCount.toLocaleString()} of ${totalCount.toLocaleString()}`,
  
    // Checkbox selection text
    checkboxSelectionHeaderName: 'Checkbox selection',
    checkboxSelectionSelectAllRows: 'Select all rows',
    checkboxSelectionUnselectAllRows: 'Unselect all rows',
    checkboxSelectionSelectRow: 'Select row',
    checkboxSelectionUnselectRow: 'Unselect row',
  
    // Boolean cell text
    booleanCellTrueLabel: 'yes',
    booleanCellFalseLabel: 'no',
  
    // Actions cell more text
    actionsCellMore: 'more',
  
    // Column pinning text
    pinToLeft: 'Pin to left',
    pinToRight: 'Pin to right',
    unpin: 'Unpin',
  
    // Tree Data
    treeDataGroupingHeaderName: 'Group',
    treeDataExpand: 'see children',
    treeDataCollapse: 'hide children',
  
    // Grouping columns
    groupingColumnHeaderName: 'Group',
    groupColumn: (name) => `Group by ${name}`,
    unGroupColumn: (name) => `Stop grouping by ${name}`,
  
    // Master/detail
    detailPanelToggle: 'Detail panel toggle',
    expandDetailPanel: 'Expand',
    collapseDetailPanel: 'Collapse',
  
    // Used core components translation keys
    MuiTablePagination: {},
  
    // Row reordering text
    rowReorderingHeaderName: 'Row reordering',
  
    // Aggregation
    aggregationMenuItemHeader: 'Aggregation',
    aggregationFunctionLabelSum: 'sum',
    aggregationFunctionLabelAvg: 'avg',
    aggregationFunctionLabelMin: 'min',
    aggregationFunctionLabelMax: 'max',
    aggregationFunctionLabelSize: 'size',
  };