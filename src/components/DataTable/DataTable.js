import React from "react";
import { DataGrid, plPL, GridToolbarContainer, GridToolbarFilterButton, gridClasses, GridColumnMenu } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Box, Toolbar } from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
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
    return (
      <Stack className="noData" height="100%" alignItems="center" justifyContent="center">
        Brak danych po zastosowanych filtrach.
      </Stack>
    );
  }

function DataTable({ columns, rows }){
    const [filterButtonEl, setFilterButtonEl] = React.useState(null);
    const [selectionModel, setSelectionModel] = React.useState([]);
    if(rows.length === 0){
        let element = document.querySelector(".css-i9gxme")
        if(element !== null){
            element.style.flexGrow = 0
            
        }
    }
    const getRowSpacing = React.useCallback((params) => {
        return {
          top: params.isFirstVisible ? 0 : 10,
          bottom: params.isLastVisible ? 0 : 10,
        };
      }, []);
    return(
        <div style={{display: "flex", justifyContent: "center"}}>
            <ThemeProvider theme={theme}>
                <Typography component={'span'} variant={'body2'}>
                <ClickAwayListener onClickAway={() => setSelectionModel([])}>
                    <StyledDataGrid rows={rows} columns={columns} localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
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
                        }
                      }}
                      slots={{ columnMenu: CustomColumnMenu, toolbar: CustomToolbar, noResultsOverlay: NoResultsOverlay, NoRowsOverlay: NoRowsOverlay }}
                      hideFooter
                      getRowSpacing={getRowSpacing}
                      getRowHeight={() => 'auto'}
                      freeSolo
                      sx={{ width: "fit-content", height: "80vh"}}
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