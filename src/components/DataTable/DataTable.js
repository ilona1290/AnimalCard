import React from "react";
import { DataGrid, plPL, GridToolbarContainer, GridToolbarFilterButton, gridClasses, GridColumnMenu, getGridStringOperators, getGridDateOperators } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Box, Toolbar } from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import ClickAwayListener from '@mui/base/ClickAwayListener';

import "./DataTable.css"
import  { LocaleText } from '../../LocaleText'

const theme = createTheme({
    typography: {
      // Tell MUI what's the font-size on the html element is.
      htmlFontSize: 10,
    }
  });

  const ODD_OPACITY = 0.2;

  const CustomToolbar = ({ setFilterButtonEl }) => {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar variant="dense" disableGutters sx={{paddingRight: "0.5em"}}>
  
          <Box sx={{ flexGrow: 1 }} />
          <GridToolbarContainer sx={{ p: 0 }}>
            <GridToolbarFilterButton ref={setFilterButtonEl} />
          </GridToolbarContainer>
        </Toolbar>
      </Box>
    );
  };

  function CustomColumnMenu(props) {
    return (
      <GridColumnMenu
        {...props}
        slots={{
          // Hide `columnMenuColumnsItem`
          columnMenuColumnsItem: null,
        }}
      />
    );
  }
  
  CustomToolbar.propTypes = {
    setFilterButtonEl: PropTypes.func.isRequired,
  };

  const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    color:
      theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-columnHeader': {
        backgroundColor: "#1976D2",
        color: "white",
        fontFamily: "Montserrat, sans-serif",
        fontSize: "2rem"
    },
    '&>.MuiDataGrid-main': {
        '&>.MuiDataGrid-columnHeaders': {
          borderBottom: 'none',
        },
      
        '& div div div div >.MuiDataGrid-cell': {
          borderBottom: 'none',
          padding: "1em 1.5em",
          textAlign: "justify",
        }},
    "& .MuiDataGrid-sortIcon": {
        opacity: 1,
        color: "white",
        },
        "& .MuiDataGrid-filterIcon": {
            opacity: 1,
            color: "white",
            },
        "& .MuiDataGrid-virtualScroller": {
            overflow: "overlay"
          },
        "& .MuiDataGrid-menuIconButton": {
        opacity: 1,
        color: "white"
        },
        [`& .${gridClasses.row}`]: {
              backgroundColor: "#f3f3f2",
            '&:hover, &.Mui-hovered': {
                backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
              },
              '&.Mui-selected': {
                backgroundColor: alpha(
                  theme.palette.primary.main,
                  ODD_OPACITY + theme.palette.action.selectedOpacity,
                ),
                '&:hover, &.Mui-hovered': {
                  backgroundColor: alpha(
                    theme.palette.primary.main,
                    ODD_OPACITY +
                      theme.palette.action.selectedOpacity +
                      theme.palette.action.hoverOpacity,
                  ),
                  // Reset on touch devices, it doesn't add specificity
                  '@media (hover: none)': {
                    backgroundColor: alpha(
                      theme.palette.primary.main,
                      ODD_OPACITY + theme.palette.action.selectedOpacity,
                    ),
                  },
                },
              },
        },
        [`& .${gridClasses.row}.even`]: {
            backgroundColor: "#E0E0DE",
            '&:hover, &.Mui-hovered': {
                backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
              },
              '&.Mui-selected': {
                backgroundColor: alpha(
                  theme.palette.primary.main,
                  ODD_OPACITY + theme.palette.action.selectedOpacity,
                ),
                '&:hover, &.Mui-hovered': {
                  backgroundColor: alpha(
                    theme.palette.primary.main,
                    ODD_OPACITY +
                      theme.palette.action.selectedOpacity +
                      theme.palette.action.hoverOpacity,
                  ),
                  // Reset on touch devices, it doesn't add specificity
                  '@media (hover: none)': {
                    backgroundColor: alpha(
                      theme.palette.primary.main,
                      ODD_OPACITY + theme.palette.action.selectedOpacity,
                    ),
                  },
                },
              },
          },
  }));
  
  function NoRowsOverlay() {
    let element = document.querySelector(".css-i9gxme")
    element.style.flexGrow = 0

    return (
      <Stack className="noData" height="100%" alignItems="center" justifyContent="center">
        No rows in DataGrid
        <pre>(rows=&#123;[]&#125;)</pre>
      </Stack>
    );
  }

  

  
  function NoResultsOverlay() {
    let element = document.querySelector(".css-i9gxme")
    element.style.flexGrow = 0
    let element2 = document.querySelector(".MuiDataGrid-virtualScroller")
    element2.style.minHeight = "100%"
    return (
      <Stack className="noData" height="100%" alignItems="center" justifyContent="center">
        Brak danych po zastosowanych filtrach.
      </Stack>
    );
  }

function DataTable({ columns, rows, paddingProp }){
    const [filterButtonEl, setFilterButtonEl] = React.useState(null);
    const [selectionModel, setSelectionModel] = React.useState([]);
    let element = document.querySelector(".css-i9gxme")
        if(element !== null){
            element.style.flexGrow = 0
            
        }
        let element2 = document.querySelector(".MuiDataGrid-virtualScroller")
        if(element2 != null){
          element2.style.minHeight = ""
          element2.style.minWidth = ""
        }
    
        const stringOperators = getGridStringOperators().filter((op => ['contains'].includes(op.value)));
        const dateOperators = getGridDateOperators().filter((op => op.value === 'is' || op.value === 'not' 
        || op.value === "after" || op.value === "onOrAfter" || op.value === "before" || op.value === "onOrBefore" || op.value === "isEmpty"));

        columns.map((item) => {
          if(item.type === "string"){
            item.filterOperators = stringOperators
          }
          else if(item.type === "date"){
            item.filterOperators = dateOperators
          }
        })
    return(
      // <div>
      <div style={{ padding: `0% ${paddingProp}`, width: "100%"}}>
            <ThemeProvider theme={theme}>
                <Typography component={'span'} variant={'body2'}>
                <ClickAwayListener onClickAway={() => setSelectionModel([])}>
                    <StyledDataGrid rows={rows} columns={columns} localeText={LocaleText}
                    
                    components={{
                        Toolbar: CustomToolbar, NoRowsOverlay, NoResultsOverlay
                      }}
                      componentsProps={{
                        panel: {
                          anchorEl: filterButtonEl,
                          placement: "top-end",
                        },
                        toolbar: {
                          setFilterButtonEl
                        },
                        filterPanel: {
                            filterFormProps: {
                                operatorInputProps: {
                                    sx: { width: "fit-content", margin: "0em 0.5em" } // If you want to remove it completely
                                },
                            }
                        }
                      }}
                      slots={{ columnMenu: CustomColumnMenu, toolbar: CustomToolbar, noResultsOverlay: NoResultsOverlay, NoRowsOverlay: NoRowsOverlay }}
                      hideFooter
                      getRowHeight={() => 'auto'}
                      freeSolo
                      sx={{
                        height: "80vh",
                        "& .MuiDataGrid-columnHeaderTitleContainer": {
                          whiteSpace: "normal",
                          lineHeight: "normal",
                          padding: "0.4em 0em"
                        },
                        "& .MuiDataGrid-columnHeader": {
                          // Forced to use important since overriding inline styles
                          height: "unset !important"
                        },
                        "& .MuiDataGrid-columnHeaders": {
                          // Forced to use important since overriding inline styles
                          maxHeight: "168px !important"
                        }
                      }}
                      // sx={{ }}
                      getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                      }
                      onRowSelectionModelChange={(newRowSelectionModel) => {
                        setSelectionModel(newRowSelectionModel);
                      }}
                      rowSelectionModel={selectionModel}
                      />
                      </ClickAwayListener>
                </Typography>
            </ThemeProvider>
        </div>
    )
}

export default DataTable;